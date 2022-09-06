FROM node:alpine
RUN mkdir /app
RUN mkdir /app/dist
WORKDIR /app
COPY package.json /app
COPY tsconfig.json /app
COPY src /app
RUN npm install
RUN npm run build
COPY . /app
CMD ["npm", "start"]