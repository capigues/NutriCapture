#!/bin/bash

if [ "$1" = "--build" ]; then
    sudo docker build -t backend ./backend && sudo docker build -t frontend ./frontend
fi

sudo gnome-terminal --tab --title=backend -- bash -c 'sudo docker run --rm --name=backend -p 3000:3000 backend:latest' && sudo gnome-terminal --tab --title=frontend -- bash -c 'sudo docker run --rm --name=frontend -p 19000:19000 -p 19006:19006 frontend:latest'

gnome-terminal --tab --title=btnpress -- bash -c 'python3 ButtonPressFinal.py' && gnome-terminal --tab --title=monitor -- bash -c 'python3 monitor.py'