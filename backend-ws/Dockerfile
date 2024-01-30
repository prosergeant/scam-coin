FROM node:latest
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8999

CMD [ "npm", "run", "start"]
