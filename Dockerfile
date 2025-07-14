# Use a Node.js base image for building
FROM node:lts-alpine AS builder

WORKDIR /app

# --- Frontend Build Stage ---
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# --- BFF Build Stage ---
COPY bff/package*.json ./bff/
RUN cd bff && npm ci
COPY bff/ ./bff/
RUN cd bff && npm run build

# --- Production Image Stage ---
FROM node:lts-alpine

WORKDIR /app/bff

# Copy built BFF and frontend dist from builder
COPY --from=builder /app/bff/dist ./dist
COPY --from=builder /app/frontend/dist ./dist/public

# Install production dependencies for BFF
COPY bff/package*.json ./
RUN npm ci --only=production

ENV NOTI_BO_BASE_URL=https://admin.noti42.com

EXPOSE 3000

CMD ["node", "dist/main"]