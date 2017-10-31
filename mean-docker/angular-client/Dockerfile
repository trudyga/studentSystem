FROM node:latest

COPY ./package.json /usr/app/

WORKDIR /usr/app

RUN npm install

COPY . .

EXPOSE 4200 49153

CMD ["npm", "start"]
