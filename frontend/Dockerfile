# Stage 1 — build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --no-optional

# Copy source code
COPY public/ public/
COPY src/ src/

# Inject the backend API URL at build time
ARG REACT_APP_API_URL=http://banking-backend-svc:4000
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV GENERATE_SOURCEMAP=false
ENV INLINE_RUNTIME_CHUNK=false
ENV NODE_OPTIONS=--max-old-space-size=2048

# Debug: Check what we have
RUN echo "=== Directory Structure ===" && \
    ls -la && \
    echo "=== Package.json exists ===" && \
    test -f package.json && echo "YES" || echo "NO" && \
    echo "=== Node modules ===" && \
    ls -la node_modules/.bin/ | head -5 && \
    echo "=== React Scripts ===" && \
    npm list react-scripts

# Build the app with detailed error output
RUN npm run build 2>&1 || ( \
    echo "=== BUILD FAILED ===" && \
    echo "=== Checking for common issues ===" && \
    echo "Package.json:" && cat package.json && \
    echo "Node version:" && node --version && \
    echo "NPM version:" && npm --version && \
    echo "Available scripts:" && npm run && \
    echo "=== End Debug Info ===" && \
    exit 1)

# Stage 2 — serve with nginx
FROM nginx:1.25-alpine

# Install wget for health check
RUN apk add --no-cache wget

# Copy built assets
COPY --from=builder /app/build /usr/share/nginx/html

# nginx config to support React Router (SPA fallback)
RUN printf 'server {\n\
  listen 80;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
  location /health {\n\
    return 200 "ok";\n\
    add_header Content-Type text/plain;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
