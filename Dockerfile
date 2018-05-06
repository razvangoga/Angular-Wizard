FROM node
WORKDIR /usr/app
VOLUME /usr/app
CMD node server.js
EXPOSE 80