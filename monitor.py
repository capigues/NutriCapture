import os
import requests
import base64
import time
from PIL import Image
import shutil
import io


CAPTURED_DIR = './imgs/captured'
IMAGE_DIR = './imgs'
URL = 'http://localhost:3000/predict'

def main():
    while True:
        for filename in os.listdir(IMAGE_DIR):
            if filename.endswith('.jpg') or filename.endswith('.jpeg'):
                filepath = os.path.join(IMAGE_DIR, filename)
                with open(filepath, 'rb') as f:
                    with Image.open(f) as img:
                        #transform photo
                        img = img.resize((250, 250), Image.Resampling.LANCZOS)
                        output = io.BytesIO()
                        img.save(output, format='JPEG', quality=50)
                        image_base64 = base64.b64encode(output.getvalue()).decode('utf-8')
                        uri = f"data:image/jpeg;base64,{image_base64}"

                        #http request
                        payload = {'file': uri}
                        headers = {'Content-Type': 'application/json'}
                        print(payload['file'])
                        response = requests.post(URL, json=payload, headers=headers)

                        if response.status_code == 200:
                            print('Sent POST request with file', filename)
                            new_path = os.path.join(CAPTURED_DIR, filename)
                            shutil.move(filepath, new_path)
                            print('Moved file', filename, 'to', CAPTURED_DIR)
                            os.system('python3 ButtonPressFinal.py')
                        else:
                            print(f'Failed to process {filename}')
        time.sleep(5)

if __name__ == '__main__':
    main()