FROM node

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install

RUN npm install nodemon -g

COPY . /app

USER node
EXPOSE 8884
CMD [ "node", "." ]%  
