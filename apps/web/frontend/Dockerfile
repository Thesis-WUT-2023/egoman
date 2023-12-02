FROM node:18-alpine as webapp

WORKDIR /webapp/apps/web/frontend
COPY package.json /webapp/apps/web/
RUN npm install
COPY . /webapp/apps/web/
CMD ["npm", "start"]