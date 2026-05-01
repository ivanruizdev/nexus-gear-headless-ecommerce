# frontend/Dockerfile
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Exponemos el puerto de Vite para que Docker sepa que hay tráfico ahí
EXPOSE 5173

# En lugar de quedarse "durmiendo", ahora arrancará el servidor automáticamente
CMD ["npm", "run", "dev"]
