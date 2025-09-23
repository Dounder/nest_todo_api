FROM node:24-alpine AS development

# Install development tools and dependencies
RUN apk add --no-cache \
    bash \
    curl \
    git \
    python3 \
    make \
    g++

# Install pnpm globally
RUN npm install -g pnpm

# Create app directory with proper permissions
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Copy package files as node user
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node pnpm-workspace.yaml ./
COPY --chown=node:node tsconfig*.json ./
COPY --chown=node:node nest-cli.json ./

# Switch to node user
USER node

# Install all dependencies (including devDependencies)
RUN pnpm install --frozen-lockfile

# Copy application source
COPY --chown=node:node . .

# Expose ports
EXPOSE 3000
EXPOSE 5555

# Development environment
ENV NODE_ENV=development

# Start dev server
CMD ["pnpm", "run", "start:dev"]
