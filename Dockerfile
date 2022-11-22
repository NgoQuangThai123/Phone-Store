# syntax=docker/dockerfile:1
FROM node:16-alpine
RUN apk add --no-cache python2 g++ make

COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
