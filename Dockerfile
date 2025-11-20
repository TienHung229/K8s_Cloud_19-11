# Base
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy source
COPY . .

# Expose port
EXPOSE 3000

CMD ["node", "app.js"]
