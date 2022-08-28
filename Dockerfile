FROM node:14-alpine

WORKDIR '/app'

# Copy and install dependencies first
COPY ./package.json .
RUN npm install

# Then copy the rest and run 
COPY . .
CMD ["npm", "start"]