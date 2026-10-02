# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Comunidades y autoridades:** comunidades del entorno, reguladores y prensa que revisan cómo opera la empresa en seguridad, medio ambiente y relación con su entorno.
- **Inversionistas y socios:** posibles socios o financistas que evalúan la solidez y la trayectoria de la empresa.
- **Clientes del sector minero:** empresas que evalúan a NBM como contraparte comercial.

Los tres grupos llegan a validar a la empresa, no a comprar en línea: leen, comparan y buscan pruebas de seriedad.

## Product Purpose

Sitio web corporativo de **Nueva Bonanza Mining (NBM)**, empresa minera que opera la mina Bonanza en Arequipa, Perú. El sitio existe para dar **credibilidad**: respaldar a la empresa ante comunidades, autoridades, inversionistas y clientes, mostrando quién es, su trayectoria, sus políticas y su forma de operar.

Éxito = que un visitante que evalúa a NBM salga convencido de que es una operación responsable, segura y seria.

## Positioning

Empresa minera arequipeña que opera su propia mina de oro (Bonanza) con un discurso centrado en minería responsable, seguridad de su gente e innovación. Tagline: "Minería responsable con visión de futuro".

## Operating Context

- Sitio en español (Perú), registro formal: *usted* en formularios, *nosotros* para la voz de la empresa.
- Páginas: Inicio, Quiénes somos, Proyectos (estáticas); Noticias y detalle de noticia (WordPress headless); Contacto (formulario con estado "gracias").
- Construido en Astro; diseño de origen en Figma / Claude Design, con referencias en `design-ref/*.dc.html` y guía en `Design.md`.

## Capabilities and Constraints

- Implementado: Inicio, Quiénes somos, Proyectos, Contacto; Noticias en construcción.
- Decisiones abiertas (ver `PLAN.md`): SSG o SSR para Noticias y hosting; backend del formulario; datos de contacto y URLs de redes reales; política de privacidad; logo en SVG.
- **Los proyectos mostrados (Antamina, Cerro Verde, Las Bambas, Toquepala, Quellaveco) son contenido provisional** del diseño; los proyectos reales están por definir con el cliente.

## Brand Commitments

- **El diseño de Figma / Claude Design no se modifica sin autorización explícita** (colores, tipografías, tamaños, espaciados, textos, estructura, animaciones). Las mejoras se proponen primero y se aplican solo con aprobación, sección por sección.
- Nombre: Nueva Bonanza Mining. Logo: `src/assets/logo-nueva-bonanza.png` (PNG recortado; SVG pendiente).
- Voz: formal, institucional; mayúsculas en títulos, navegación, eyebrows y botones; sin emojis ni signos de exclamación.
- Vocabulario: minería responsable, seguridad, sostenible, compromiso, altos estándares, valor, el Perú.

## Evidence on Hand

- Fotografías de operación y equipo en `src/assets/img/` (algunas de baja resolución: `qs-hero-team.png` 655×436, `principios-worker.png` 351×592). `empresa-surveyors.png` muestra un casco con el logo de otra empresa (INCOPESA).
- Textos institucionales (políticas, hitos, misión, visión, valores) en `src/data/about.ts`, copiados del diseño.
- **No confirmado:** cifras (15+ proyectos, 2,000 colaboradores, 16 años), datos de contacto, URLs de redes, lista de proyectos e hitos concretos. No inventar proyectos, clientes, certificaciones ni cifras adicionales.

## Product Principles

1. **Credibilidad antes que persuasión:** cada sección debe aportar una prueba (trayectoria, políticas, operación real), no solo eslóganes.
2. **Fidelidad al diseño aprobado:** el diseño original es la autoridad; cualquier mejora se propone, se aprueba y se aplica por partes.
3. **Responsabilidad visible:** seguridad, medio ambiente y relación con comunidades tienen que ser fáciles de encontrar para quien audita a la empresa.
4. **Datos reales o marcados como pendientes:** nada provisional debe presentarse como hecho confirmado.
