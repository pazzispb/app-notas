# Use the official Node.js image as the base image.
FROM node:latest

# Set the working directory in the container to /app.
WORKDIR /app

# Copy package.json and yarn.lock to the container.
COPY package.json yarn.lock ./

# Install dependencies using Yarn.
RUN yarn install --production

# Copy the rest of the application code to the container.
COPY . .

# Expose the port your application listens on.
EXPOSE 3000

# Set any necessary environment variables.
ENV NODE_ENV production

# The default command to run when the container starts.
CMD [ "node", "main.js" ]
