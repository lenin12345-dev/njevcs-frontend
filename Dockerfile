# Use Node.js 20 LTS as base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js project
RUN npm run build

# Install only production dependencies
RUN npm prune --production

# Use a smaller runtime image for serving the app
FROM node:20-alpine AS runner

# Set environment to production
ENV NODE_ENV production

# Set the working directory
WORKDIR /app

# Copy built app and dependencies from the builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

# Expose the port
EXPOSE 80

# Start the app
CMD ["npm", "run", "dev", "--", "-p", "80"]
