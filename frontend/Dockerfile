# frontend/Dockerfile
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Keep the container running in the background for development
# This allows us to exec into it and run 'npm install' or 'npm run dev'
CMD ["tail", "-f", "/dev/null"]
