<<<<<<< HEAD
# Use a Node.js base image (Debian-based)
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

<<<<<<< HEAD
# Install dependencies and build from source
RUN npm install --build-from-source


# Copy application code
COPY . .

<<<<<<< HEAD
# Environment variables to handle SSL verification (optional)
ENV CURLOPT_SSL_VERIFYHOST=0
ENV CURLOPT_SSL_VERIFYPEER=0

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]

