FROM node:20

WORKDIR /react-vite-app

EXPOSE 8081

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
