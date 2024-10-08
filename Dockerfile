# Use the official Node.js image as the base image
FROM node:18.17.1

# Set the working directory inside the container
WORKDIR /front-end

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Set environment variable for port
ENV PORT=5173

# Expose the port the app runs on
EXPOSE 5173

# Start the app in development mode with the specified port
CMD ["npm", "run", "dev"]
