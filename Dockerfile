# Use an official Node runtime as a parent image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install NestJS dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

RUN npx prisma generate
# Expose the port that the NestJS app will run on
EXPOSE 3000

# Define environment variables
ENV NODE_ENV=production
ENV DATABASE_PORT=5432
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=pass123
ENV DATABASE_NAME=mydb

# Start the NestJS application
CMD [ "npm", "run", "start:prod" ]
