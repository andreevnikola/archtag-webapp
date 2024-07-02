# Use the official Node.js image to build the application
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Use the official Nginx image to serve the application
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
