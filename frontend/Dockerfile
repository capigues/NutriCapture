# Specify the base image
FROM node:14

# Create a working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the app files to the container
COPY . .

EXPOSE 19000 19006

# Set the environment variable for Expo CLI to run in interactive mode
ENV CI=true

# Start the app with Expo CLI
ENTRYPOINT ["yarn", "web"]

