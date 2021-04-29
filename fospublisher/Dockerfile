FROM node:14
WORKDIR /fospublisher
COPY . .

RUN npm install -g yarn
RUN yarn install --force
COPY ./ ./
RUN npm run build
