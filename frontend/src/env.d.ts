// File: src/env.d.ts
/// <reference types="vite/client" />

// Optional: Explicit fallback for CSS modules if needed in older TS versions
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}