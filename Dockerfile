FROM node:slim

RUN MKDIR /kafka-nodejs-project

# Create app directory
WORKDIR /kafka-nodejs-project

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN npm install
RUN npm init -y
RUN npm install kafkajs

# Bundle app source
COPY . /kafka-nodejs-project

EXPOSE 8080
EXPOSE 9092
EXPOSE 2181

# If you are building your code for production
# RUN npm ci --only=production
CMD [ "node", ["topic.js", "consumer.js", "producer.js"]]
