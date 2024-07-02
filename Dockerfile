# Build stage
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
COPY .env ./.env
RUN npm install
COPY . .
RUN npm run build

# Run stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY .env /usr/share/nginx/html/.env
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
