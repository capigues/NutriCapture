#!/bin/bash

if [ "$1" = "--build" ]; then
    sudo docker build -t backend ./backend && sudo docker build -t frontend ./frontend
fi

sudo gnome-terminal -- bash -c 'sudo docker run --rm --name=backend -p 3000:3000 backend:latest' && sudo gnome-terminal -- bash -c 'sudo docker run --rm --name=frontend -p 19000:19000 -p 19006:19006 frontend:latest'

python3 ButtonPressFINAL.py && python3 monitor.py