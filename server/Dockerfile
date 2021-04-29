FROM node:14

WORKDIR /server
COPY . .

RUN npm install
RUN npm install -g nodemon
CMD ["npm", "start", "0.0.0.0:3000"]
# CMD [ "npm", "start", "0.0.0.0:3000"]
