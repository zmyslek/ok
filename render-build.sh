#!/usr/bin/env bash

# Install Composer
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Build the app
npm run build
