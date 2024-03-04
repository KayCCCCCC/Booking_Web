# Use the official Node.js image as base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /server

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
