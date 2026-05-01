# frontend/Dockerfile
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Exponemos el puerto de Vite
EXPOSE 5173

# Magia de Tech Lead: Instala dependencias SIEMPRE antes de arrancar
CMD ["sh", "-c", "npm install && npm run dev"]
