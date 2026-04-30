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
*Systems Engineering Student & Software Developer*  
[Visit my website](ivanruiz.dev)
