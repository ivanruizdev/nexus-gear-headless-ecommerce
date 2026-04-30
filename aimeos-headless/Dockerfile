# aimeos-headless/Dockerfile
FROM php:8.2-fpm-alpine

# Install system dependencies required by Laravel and Aimeos
RUN apk add --no-cache \
    linux-headers \
    postgresql-dev \
    libpng-dev \
    libzip-dev \
    icu-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    zip \
    unzip \
    git \
    curl

# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
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
