#Simple reverse proxy to serve static files

FROM nginx:alpine

COPY dist /usr/share/nginx/html





