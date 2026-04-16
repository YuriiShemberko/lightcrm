FROM php:8.0-fpm

RUN apt-get update && apt-get install -y \
    libmariadb-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install mysqli \
    && docker-php-ext-enable mysqli

RUN docker-php-ext-install pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html