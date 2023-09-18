FROM node:18

# Create app directory this is in our container
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main" ]

### COMMANDS
# docker build . -t chamil/nest-blog-app
# docker run -p 8080:3000 chamil/nest-blog-app

