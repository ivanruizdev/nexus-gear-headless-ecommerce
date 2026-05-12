# aimeos-headless/Dockerfile
# Changed from 8.2 to 8.3 to satisfy Laravel 13 dependencies
FROM php:8.3-fpm-alpine

# Install system dependencies required by Laravel and Aimeos
RUN apk add --no-cache \
    linux-headers \
    postgresql-dev \
    libpng-dev \
    libzip-dev \
    icu-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    zip \
    unzip \
    git \
    curl

# Configure and install PHP extensions
# <-- ¡NUEVO! Añadimos --with-webp a la configuración de GD
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-configure intl \
    && docker-php-ext-install \
    pdo_pgsql \
    pgsql \
    gd \
    intl \
    zip \
    bcmath \
    opcache

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Keep container running and assign permissions if needed
CMD ["php-fpm"]
