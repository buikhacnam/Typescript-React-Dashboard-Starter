FROM node:latest

RUN mkdir -p /app/src

# set working directory
WORKDIR /app/src

# install app dependencies
COPY package.json .

RUN npm install --silent

# source: . (current directory) destination: .(current directory)
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
