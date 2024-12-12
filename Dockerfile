FROM node:20-alpine

WORKDIR /usr/src/app

ADD package.json package-lock.json /usr/src/app/

# Install dependencies including class-validator and class-transformer
RUN npm install && \
  npm install class-validator class-transformer @nestjs/swagger swagger-ui-express

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"] 