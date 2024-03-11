# Use a Node.js base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production && npm cache clean --force

# Install MongoDB tools (required for MongoDB Atlas connection string)
RUN apk add --no-cache mongodb-tools

# Copy application code
COPY . .

# Expose port (optional, adjust as needed)
EXPOSE 3000

# Define start command
CMD ["node", "app.js"]
