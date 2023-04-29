#!/bin/bash

inotifywait -m Images -e create |
    while read path action file; do
        if [[ "$file" =~ .*\.jpg$ ]]; then
            echo "New JPG file detected: $file"
            encoded_file=$(base64 < "$path$file")
            curl -X POST \
                -H "Content-Type: application/json" \
                -d '{"file": "'"$encoded_file"'"}' \
                http://localhost:3000/predict
        fi
    done
