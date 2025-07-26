/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  // variables de entorno aca...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

