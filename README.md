# Nexus Gear ⚙️ - Headless E-commerce (Web 4.0)

> A modern, decoupled e-commerce platform designed for tech professionals, creators, and gamers, demonstrating advanced headless architecture and proactive UI integrations.

## 🚀 About the Project
Nexus Gear is a high-end e-commerce MVP built to explore the "Web 4.0" paradigm. It shifts the traditional shopping experience from reactive browsing to proactive, context-aware interactions. 

This repository serves as a **Demonstration of Capabilities** showcasing modern system design, RESTful API consumption, and decoupled frontend development. The transactional heavy lifting is securely handled by a separate server, allowing this frontend to remain lightweight and highly interactive.

## 🏗️ Architecture (Headless Pattern)
This project implements a strict separation of concerns between the presentation layer and the business logic:
*   **Frontend (This Repository):** A high-conversion, light-themed Single Page Application (SPA) built with Vanilla JS (ES6+) and Vue.js 3 (Composition API).
*   **Backend Engine:** Powered by the Aimeos E-commerce Framework on Laravel 12, serving data via a standardized JSON:API.
*   **Infrastructure:** Deployed on a shared Linux environment.

## ✨ Core Features
*   **Web 4.0 Voice Navigation:** Integration with the Web Speech API allowing users to search and filter hardware using natural voice commands.
*   **Tiered Business Logic:** UI state management supporting custom membership levels (Starter, Pro, Elite) with dynamic rendering of pricing and benefits.
*   **Performance-Driven UI:** Built without heavy CSS frameworks. Utilizes native CSS Grid/Flexbox and CSS Custom Properties to ensure interface response times under 100ms.
*   **Secure Authentication:** Handles JWT tokens for secure API communication and persistent user sessions across the headless divide.

## 💻 Tech Stack
*   **Language:** JavaScript (ES6+)
*   **Framework:** Vue.js
*   **Styling:** Native CSS3 (High-Conversion Light Theme)
*   **API Engine:** Aimeos / Laravel

## 👨‍💻 Authors
**Brian Ivan Ruiz Angeles**  
*Computer Systems Engineering Student & Software Developer*  
[Visit my website](https://ivanruiz.dev/)

**Erick Rodrigo Moreno Santibáñez**  
*Computer Systems Engineering Student*
<!-- [Visit my website](Put your linkeding, or github profile link, or website url here) -->

## 🛠 Development and Deployment

This project is fully dockerized to ensure environment consistency. Follow these steps to get the Headless environment running locally.

### Prerequisites

Install the following into your computer:

*  **An Ubuntu (Linux) based distribution or Windows Subsytem for Linux 2 (WSL2) installed in case you are using windows.**
*  **Git**
*  **Docker & Docker Compose.**

Important: If you have a local installation of PostgreSQL running natively on your machine, please stop the service to avoid port conflicts with the Docker network.

### 1. Clone the Repository

```bash
git clone https://github.com/ivanruizdev/nexus-gear-headless-ecommerce.git
cd nexus-gear-headless-ecommerce
```

### 2. Environment Setup

Configure the backend environment variables before building the containers.

```bash
# Copy the example environment file
cp aimeos-headless/.env.example aimeos-headless/.env
```
Note: Ensure your DB_CONNECTION is set to pgsql, DB_HOST is db, and DB_PORT is 5432 within the .env file, and customize as you need.

### 3. Build and Initialize

The root docker-compose.yml orchestrates the PHP 8.3 backend container, the PostgreSQL 15 database, the Nginx web server, and the Vue 3 frontend container.

```bash
# Start all containers in the background and build images
docker-compose up -d --build

# Install PHP dependencies
docker-compose exec backend composer install

# Fix storage permissions for Laravel logs and cache
docker-compose exec backend chmod -R 777 storage bootstrap/cache

# Generate Laravel application key and JWT secret for API Auth
docker-compose exec backend php artisan key:generate
docker-compose exec backend php artisan jwt:secret

# Clear config cache to ensure .env is read properly
docker-compose exec backend php artisan config:clear

# Run database migrations
docker-compose exec backend php artisan migrate

# Setup Aimeos and inject demo data for testing
docker-compose exec backend php artisan aimeos:setup --option=setup/default/demo:1

# Install Node modules for the Vue application
docker-compose exec frontend npm install

# Run frontend dev server
docker-compose exec -d frontend npm run dev

```

### 4. Accessing the Application

Frontend (Vue.js 3): Open http://localhost:5173 to view and develop the High-Conversion Light Theme UI.

Backend API: Access the Aimeos JSON:API gateway at http://localhost:8000/jsonapi.

## 🚨 Troubleshooting & Known Issues

Due to the aggressive caching in Docker volumes and our upgrade to Tailwind CSS v4, the Vite executable links might occasionally break during dependency resolution. If the frontend container fails to load the dev server, run the following commands to rebuild the binaries:

``` bash
# Force reinstall dependencies and rebuild binary links
docker-compose exec frontend npm install --force

# Restart the frontend container to clear Vite cache and boot the server automatically
docker-compose restart frontend
```

## Frontend Architecture Note (For UI Developers)

We are using Tailwind CSS v4 directly integrated with Vite.

No PostCSS: We do not use postcss.config.js. Tailwind is integrated directly via the @tailwindcss/vite plugin in vite.config.ts.

CSS Import: Do not use @tailwind base;. Use the modern @import "tailwindcss"; in your src/assets/css/style.css file.
