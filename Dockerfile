# Use the official Node.js image as the base image
FROM node:latest

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npx npm install
RUN npx playwright install --with-deps

# Copy the rest of the application code
COPY . .

# Set the entry point for the container
CMD ["npx", "playwright", "test"]
