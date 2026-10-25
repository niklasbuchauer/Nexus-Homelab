# Stage 1: Build the app
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies safely
COPY package*.json ./
RUN npm install

# Copy source code and build for production
COPY . .
RUN npm run build

# Stage 2: Serve with lightweight Nginx
FROM nginx:alpine
# If your build folder is 'build' or 'out', change 'dist' below to match!
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 inside the container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]