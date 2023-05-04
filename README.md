# NutriCapture Documentations
## Background
The purpose of NutriCapture is to purpose an AI algorithm to classify food items from a photo. Initially this project was designed to interface with a Jetson Nano developer kit, however, the source code can run using uploaded photos as well, once some commented code is uncommented.

## Frontend
The frontend of the application is built using React Native and various libraries to manage selecting an image, configuring the image and converting the image to a format suitable for http requests. The frontend displays nutritional value whenever the backend makes a prediction. Communication between the frontend and backend is through both http requests and websockets.

## Backend
The backend of the application is built using express.js and handles serving routes to get predictions, sending this data, and calling scripts to get the necessary information for the frontend. The /predict endpoint calls a python script that loads ML models that are stored in the backend, and uses them to make the prediction of the food. Once a prediction is made the prediction data, ingredients for the prediction and macronutritional information is all sent via websocket to the frontend.

## ML Models
Within the backend folder for the application, there is a folder that holds the models. These models are developed outside of this project and are reuploaded when the model is updated. The models were created following a project that can be found [here](https://github.com/ifueko/sklearn-basics/blob/main/Sci_Kit_Learn_for_Image_Classification.ipynb), and they were saved and loaded using the pickle library.


## Running the Project
To run this project you must have [docker](https://www.docker.com/) installed. This allows the project to be build in a virtual environment to avoid dependency conflicts between hardware and software.
To run the project first, navigate to the root directory and in the terminal type:
```
chmod +x start.sh
```
If this is your first time running the application, or you have made changes to the source code, run the program like so:
```
./start.sh --build
```
Otherwise, run it by typing:
```
./start.sh
```

Running this command should start the frontend server on localhost:19006 and the backend on localhost:3000 and expose these ports to your local machine.

In addition to the servers starting, two python scripts will also be activated. One script waits for GPIO input on port 15 of the Jetson Nano, if it is running on that device, the other script waits for an image to be added to the imgs folder, which will trigger an automamtic upload to the backend server for predicting.

These scritps are not necessary on devices besides the Jetson Nano. To close these scripts simply use the escape command ^C (Control + C).

## Stoppping the Servers
The servers are running through docker so to stop them you must use the docker cli tool. First to see the ID of the containers that the frontend and backend are running in type:
```
docker ps
```
If you get a permission error add `sudo` before the command.
Next, find the container ID of the containers running the images `backend:latest` and `frontend:latest`. To stop these containers from running type:
```
docker stop <container_ID>
```
Once again, if you get permission errors, add `sudo` before the command.