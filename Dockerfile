from node:alpine3.10

RUN npm install -g serve

WORKDIR /opt
COPY build .
