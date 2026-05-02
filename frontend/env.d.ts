/// <reference types="vite/client" />

// Explicit fallback for CSS modules
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Explicit ambient type declaration for Tailwind CSS v4 Vite plugin.
// Using 'any' avoids converting this file into a module and bypasses missing local IDE types.
declare module '@tailwindcss/vite' {
  const tailwindcss: () => any;
  export default tailwindcss;
}
