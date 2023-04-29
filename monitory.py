import os
import requests
import base64
import time

IMAGE_DIR = 'home/james/NutriCapture/Images'
URL = 'http://localhost:3000/predict'

def main():
    while True:
        for filename in os.listdir(IMAGE_DIR):
            if filename.endswith('.jpg') or filename.endswith('.jpeg'):
                filepath = os.path.join(IMAGE_DIR, filename)
                with open(filepath, 'rb') as f:
                    contents = f.read()
                    encoded_contents = base64.b64encode(contents).decode('utf-8')
                    payload = {'file': encoded_contents}
                    headers = {'Content-Type': 'application/json'}
                    response = requests.post(URL, json=payload, headers=headers)
                    print('Sent POST request with file', filename)
        time.sleep(5)

if __name__ == '__main__':
    main()