/// <reference types="vite/client" />

interface ImportMeta {
  glob(pattern: string): Record<string, () => Promise<any>>;
  env: {
    BASE_URL: string;
    MODE: string;
    DEV: boolean;
    PROD: boolean;
    SSR: boolean;
    [key: string]: any;
  };
}
