# 1. Use an official lightweight Node.js image
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only package.json and package-lock.json first
COPY package*.json ./

# 4. Install your dependencies
RUN npm install

# 5. Copy the rest of your application code into the container
COPY . .

# 6. Expose the port your app uses (Change 3000 if your app uses a different port)
EXPOSE 3000

# 7. The command to start your app
CMD ["node", "index.js"]
