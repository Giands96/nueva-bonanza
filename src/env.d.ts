interface ImportMetaEnv {
  /** Endpoint de WPGraphQL, p. ej. https://cms.ejemplo.com/graphql */
  readonly WP_GRAPHQL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
