<?php
// Endpoint del formulario de contacto — Nueva Bonanza Mining.
// Versión estable: texto plano + adjunto, mail() estándar sin -f.
// Recibe multipart/form-data, valida campos + adjunto y responde JSON o redirect.

error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);

if (function_exists('mb_internal_encoding')) {
  mb_internal_encoding('UTF-8');
}

if (!defined('CV_MAX_BYTES')) define('CV_MAX_BYTES', 5 * 1024 * 1024);
if (!defined('EMPLEO_LABEL')) define('EMPLEO_LABEL', 'Empleo y prácticas');

$DESTINOS = array(
  'Propuesta de proyecto'    => 'gerencia01@nbonanzamining.com',
  'Consulta comercial'       => 'hector.acevedo@nbonanzamining.com',
  'Empleo y prácticas'       => 'sally.falconi@nbonanzamining.com',
  'Prensa y comunicaciones'  => 'paola.acevedo@nbonanzamining.com',
  'Logística y transporte'   => 'logistica01@nbonanzamining.com',
  'Otro'                     => 'hector.acevedo@nbonanzamining.com',
);

$FROM = 'no-reply@nbonanzamining.com';

function nb_contains($haystack, $needle) {
  if ($needle === '') return true;
  return strpos($haystack, $needle) !== false;
}

function nb_starts_with($haystack, $needle) {
  return strncmp($haystack, $needle, strlen($needle)) === 0;
}

function wants_json() {
  $accept = isset($_SERVER['HTTP_ACCEPT']) ? $_SERVER['HTTP_ACCEPT'] : '';
  return nb_contains($accept, 'application/json')
    || (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'fetch');
}

function json_out($status, $payload) {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-Control: no-store');
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

function clean_header($v) {
  return trim(preg_replace('/[\r\n]+/', ' ', $v));
}

function nb_strlen($v) {
  if (function_exists('mb_strlen')) return mb_strlen($v, 'UTF-8');
  return strlen($v);
}

function nb_substr($v, $start, $len) {
  if (function_exists('mb_substr')) return mb_substr($v, $start, $len, 'UTF-8');
  return substr($v, $start, $len);
}

function nb_strtolower($v) {
  if (function_exists('mb_strtolower')) return mb_strtolower($v, 'UTF-8');
  return strtolower($v);
}

function clean_text($v, $max = 5000) {
  $v = trim($v);
  if (nb_strlen($v) > $max) $v = nb_substr($v, 0, $max);
  return $v;
}

function nb_mimeheader($v) {
  if (function_exists('mb_encode_mimeheader')) return mb_encode_mimeheader($v, 'UTF-8');
  return $v;
}

function nb_fail($msg, $code = 422) {
  if (wants_json()) json_out($code, array('success' => false, 'error' => $msg));
  header('Location: /contacto?error=1#contact-form', true, 303);
  exit;
}

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
if ($method !== 'POST') {
  if (wants_json()) json_out(405, array('success' => false, 'error' => 'Método no permitido.'));
  header('Location: /contacto', true, 303);
  exit;
}

$honey = isset($_POST['_honey']) ? trim((string)$_POST['_honey']) : '';
if ($honey !== '') {
  if (wants_json()) json_out(200, array('success' => true));
  header('Location: /gracias', true, 303);
  exit;
}

$nombre   = clean_text(isset($_POST['nombre']) ? (string)$_POST['nombre'] : '', 120);
$empresa  = clean_text(isset($_POST['empresa']) ? (string)$_POST['empresa'] : '', 160);
$correo   = trim(isset($_POST['correo']) ? (string)$_POST['correo'] : '');
$telefono = clean_text(isset($_POST['telefono']) ? (string)$_POST['telefono'] : '', 40);
$cargo    = clean_text(isset($_POST['cargo']) ? (string)$_POST['cargo'] : '', 120);
$motivo   = clean_text(isset($_POST['motivo']) ? (string)$_POST['motivo'] : '', 60);
$mensaje  = clean_text(isset($_POST['mensaje']) ? (string)$_POST['mensaje'] : '', 5000);
$consent  = clean_text(isset($_POST['consentimiento']) ? (string)$_POST['consentimiento'] : '', 10);

if ($nombre === '' || $empresa === '' || $correo === '' || $telefono === '' || $motivo === '' || $mensaje === '') {
  nb_fail('Complete todos los campos obligatorios.');
}
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
  nb_fail('El correo corporativo no es válido.');
}
if (!isset($DESTINOS[$motivo])) {
  nb_fail('Motivo de contacto no válido.');
}
if ($consent === '') {
  nb_fail('Debe autorizar el tratamiento de sus datos.');
}

$to = $DESTINOS[$motivo];
$isEmpleo = ($motivo === EMPLEO_LABEL);

$tmpPath = null;
$safeName = null;

if ($isEmpleo) {
  $file = isset($_FILES['cv']) ? $_FILES['cv'] : null;
  $errNoFile = defined('UPLOAD_ERR_NO_FILE') ? UPLOAD_ERR_NO_FILE : 4;
  $errOk = defined('UPLOAD_ERR_OK') ? UPLOAD_ERR_OK : 0;
  if (!$file || (isset($file['error']) ? $file['error'] : $errNoFile) == $errNoFile) {
    nb_fail('Adjunte su CV en PDF o Word para postularse.');
  }
  if ((isset($file['error']) ? $file['error'] : $errOk) != $errOk) {
    nb_fail('No se pudo leer el archivo adjunto. Intente nuevamente.');
  }

  $size = isset($file['size']) ? (int)$file['size'] : 0;
  if ($size <= 0 || $size > CV_MAX_BYTES) {
    nb_fail('El archivo supera los 5 MB. Comprímalo o use un PDF más liviano.');
  }

  $origName = isset($file['name']) ? (string)$file['name'] : 'cv';
  $origName = str_replace(chr(0), '', basename($origName));
  $tmp = @preg_replace('/[^a-zA-Z0-9._\-áéíóúÁÉÍÓÚñÑ ]/u', '_', $origName);
  $origName = ($tmp === null || $tmp === '') ? 'cv' : $tmp;
  $origName = nb_substr($origName, 0, 120);
  $lower = nb_strtolower($origName);
  $ext = strtolower(pathinfo($lower, PATHINFO_EXTENSION));

  if (!in_array($ext, array('pdf', 'doc', 'docx'), true)) {
    nb_fail('Formato no válido. Solo se admite PDF (.pdf) o Word (.doc, .docx).');
  }

  $tmp = isset($file['tmp_name']) ? (string)$file['tmp_name'] : '';
  if (!is_uploaded_file($tmp)) {
    nb_fail('Archivo adjunto no válido.');
  }

  $mime = 'application/octet-stream';
  if (class_exists('finfo')) {
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $detected = $finfo->file($tmp);
    if (is_string($detected) && $detected !== '') $mime = $detected;
  }

  $valid = false;
  if ($ext === 'pdf') {
    $valid = ($mime === 'application/pdf');
  } elseif ($ext === 'docx') {
    $valid = in_array($mime, array(
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/zip',
      'application/x-zip-compressed',
      'application/octet-stream',
    ), true);
  } elseif ($ext === 'doc') {
    $valid = in_array($mime, array(
      'application/msword',
      'application/x-ole-storage',
      'application/octet-stream',
    ), true);
  }
  if (!$valid) {
    nb_fail('El archivo no coincide con su extensión. Suba un PDF o Word válido.');
  }

  $fh = @fopen($tmp, 'rb');
  if (!$fh) nb_fail('No se pudo inspeccionar el archivo adjunto.');
  $head = fread($fh, 8);
  if (!is_string($head)) $head = '';
  fclose($fh);

  if ($ext === 'pdf') {
    if (!nb_starts_with($head, '%PDF-')) {
      nb_fail('El PDF está corrupto o no es un PDF real.');
    }
    $tail = @file_get_contents($tmp, false, null, max(0, $size - 2048), 2048);
    if (!is_string($tail)) $tail = '';
    if (!nb_contains($tail, '%%EOF')) {
      $full = @file_get_contents($tmp);
      if (!is_string($full)) $full = '';
      if (!nb_contains($full, '%%EOF')) {
        nb_fail('El PDF está incompleto o fue manipulado.');
      }
    }
    $peek = @file_get_contents($tmp, false, null, 0, min($size, 200000));
    if (!is_string($peek)) $peek = '';
    if (preg_match('#/Launch\b|/Win\b|/OpenAction\b.*/(JS|JavaScript)\b#s', $peek)) {
      nb_fail('El PDF contiene acciones ejecutables no permitidas.');
    }
  }

  if ($ext === 'docx') {
    if (!class_exists('ZipArchive')) {
      nb_fail('No se pudo verificar el Word en el servidor. Exporte su CV a PDF e intente nuevamente.', 500);
    }
    $zip = new ZipArchive();
    if ($zip->open($tmp) !== true) {
      nb_fail('El Word está corrupto o no es un DOCX válido.');
    }
    $hasTypes = $zip->locateName('[Content_Types].xml') !== false;
    $hasDoc = $zip->locateName('word/document.xml') !== false;
    if (!$hasTypes || !$hasDoc) {
      $zip->close();
      nb_fail('El Word no tiene estructura de documento válida.');
    }
    $bad = false;
    $num = $zip->numFiles;
    for ($i = 0; $i < $num; $i++) {
      $zname = $zip->getNameIndex($i);
      if (!is_string($zname)) continue;
      $zname = strtolower($zname);
      if ($zname === 'word/vbaproject.bin') { $bad = true; break; }
      if (preg_match('/\.(exe|dll|bat|cmd|com|scr|msi|jar|ps1|vbs|js|jse|wsf|hta|lnk|reg)$/', $zname)) { $bad = true; break; }
    }
    $zip->close();
    if ($bad) {
      nb_fail('El Word contiene macros o ejecutables no permitidos. Exporte a DOCX sin macros.');
    }
  }

  if ($ext === 'doc') {
    if ($head !== "\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1") {
      nb_fail('El .doc no tiene formato Word válido. Prefiera PDF o DOCX.');
    }
  }

  $safeName = $origName;
  $tmpPath = tempnam(sys_get_temp_dir(), 'nb_cv_');
  if ($tmpPath === false || !move_uploaded_file($tmp, $tmpPath)) {
    nb_fail('No se pudo procesar el adjunto. Intente nuevamente.', 500);
  }
}

// --- Arma y envía el correo (texto plano, como la v1 que funcionaba) ---
$subject = clean_header($motivo . ' - ' . $empresa);
$boundary = 'nb_' . md5(uniqid((string)mt_rand(), true));

$bodyText = "Nueva consulta desde la web\n"
  . "-------------------------------\n"
  . "Motivo: {$motivo}\n"
  . "Nombre: {$nombre}\n"
  . "Empresa: {$empresa}\n"
  . "Correo: {$correo}\n"
  . "Teléfono: {$telefono}\n"
  . "Cargo: " . ($cargo !== '' ? $cargo : '-') . "\n"
  . "Consentimiento: " . ($consent !== '' ? $consent : 'Sí') . "\n\n"
  . "Mensaje:\n{$mensaje}\n";

$headers = array();
$headers[] = 'From: Nueva Bonanza <' . $FROM . '>';
$headers[] = 'Reply-To: ' . clean_header($correo);
$headers[] = 'X-Mailer: NB-Contact/1.0';
$headers[] = 'MIME-Version: 1.0';

if ($tmpPath !== null) {
  $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
  $data = @file_get_contents($tmpPath);
  if ($data === false) {
    @unlink($tmpPath);
    nb_fail('No se pudo adjuntar el CV. Intente nuevamente.', 500);
  }
  $b64 = chunk_split(base64_encode($data));
  $attachName = nb_mimeheader($safeName !== null ? $safeName : 'cv');
  $message = "--{$boundary}\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . $bodyText . "\r\n"
    . "--{$boundary}\r\n"
    . 'Content-Type: application/octet-stream; name="' . $attachName . "\"\r\n"
    . "Content-Transfer-Encoding: base64\r\n"
    . 'Content-Disposition: attachment; filename="' . $attachName . "\"\r\n\r\n"
    . $b64 . "\r\n"
    . "--{$boundary}--";
} else {
  $headers[] = 'Content-Type: text/plain; charset=UTF-8';
  $headers[] = 'Content-Transfer-Encoding: 8bit';
  $message = $bodyText;
}

$sent = @mail($to, nb_mimeheader($subject), $message, implode("\r\n", $headers));

if ($tmpPath !== null) @unlink($tmpPath);

if (!$sent) {
  if (wants_json()) json_out(502, array('success' => false, 'error' => 'No pudimos enviar su consulta. Inténtelo nuevamente en unos minutos.'));
  header('Location: /contacto?error=1#contact-form', true, 303);
  exit;
}

if (wants_json()) {
  json_out(200, array('success' => true));
}
header('Location: /gracias', true, 303);
exit;
