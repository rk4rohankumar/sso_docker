# Use node image for building both backend and frontend
FROM node:14 as builder

# Set working directory for backend
WORKDIR /app/backend

# Copy backend package files and install dependencies
COPY ./backend/package*.json ./
RUN npm install

# Copy the rest of backend code
COPY ./backend .

# Build backend
# RUN npm run start

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY ./frontend/package*.json ./
RUN npm install

# Copy the rest of frontend code
COPY ./frontend .

# Build frontend
RUN npm run build

# Use Nginx to serve frontend and backend
FROM nginx:alpine

# Copy built frontend from builder stage to Nginx html directory
COPY --from=builder /app/frontend/build /usr/share/nginx/html

# Copy built backend from builder stage
# COPY --from=builder /app/backend/build /app/backend/build

# Expose ports
EXPOSE 3000
EXPOSE 5000

# Copy Nginx configuration to proxy API requests to backend
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
