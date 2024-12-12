FROM node:20-alpine

WORKDIR /usr/src/app

ADD package.json package-lock.json /usr/src/app/

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"] 