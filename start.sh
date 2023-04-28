#!/bin/bash

cd backend

npm install

cd ../frontend

npm install

cd ..

if command -v docker-compose &> /dev/null; then
    docker-compose build
    docker-compose up
else
    echo "docker-compose is not installed"
fi


