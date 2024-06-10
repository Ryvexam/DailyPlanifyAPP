# Use the base image
FROM shinsenter/symfony:php8.3-alpine

# Set working directory
WORKDIR /var/www/html

# Copy the application code
COPY . .

# Install dependencies
RUN apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        git \
        unzip \
        libzip-dev \
    && apk add --no-cache \
        zip \
        libzip \
        icu-dev \
    && docker-php-ext-install \
        intl \
        zip \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony \
    && apk del .build-deps

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose the port
EXPOSE 8000

# Start Symfony server
CMD ["symfony", "serve", "--port=8000"]
