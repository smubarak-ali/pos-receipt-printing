FROM node:22-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 8000
CMD [ "yarn", "start:express" ]