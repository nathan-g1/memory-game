FROM node:14-alpine

# Set Port as Env Variable
ENV PORT 4200

# Create app directory
WORKDIR /app

# Copy over configurations 
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install --production
# RUN npm ci --only=production for production

# Copy over app source code
COPY src /app/src

# Copy over certificates
# COPY certs /app/certs

# Convert typescript
RUN cd src
RUN npm run build

EXPOSE ${PORT}
ENTRYPOINT ["npm", "run",  "start"]