FROM node:12.13.1-alpine as build

WORKDIR /opt
COPY . .
RUN npm i
RUN npm run build


FROM node:12.13.1-alpine

WORKDIR /opt/app
ENV NODE_ENV=production
CMD ["node", "build/app.js"]
LABEL MAINTAINER="Kozlov Viktor <victor@kozlov.io>" VERSION="v1.0.0"

COPY --from=build --chown=node:node /opt/package.json package.json
COPY --from=build --chown=node:node /opt/build build

RUN npm install

USER node
