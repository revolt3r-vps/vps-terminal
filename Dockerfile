# Optional image for demos / self-hosters.
# Primary production path is host install (scripts/install.sh).
FROM node:18-bookworm-slim

RUN apt-get update -qq \
  && apt-get install -y -qq --no-install-recommends tmux python3 make g++ ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY server.js fs-jail.js diagnostics.js preferences-store.js attach-session ./
COPY public ./public
COPY scripts/vendor-assets.sh ./scripts/vendor-assets.sh
RUN bash scripts/vendor-assets.sh \
  && chmod 755 attach-session \
  && chown -R node:node /app

USER node
ENV NODE_ENV=production \
    HOME=/home/node \
    VPS_TERMINAL_HOST=0.0.0.0 \
    VPS_TERMINAL_PORT=3001

# Require VPS_TERMINAL_ORIGIN (or LOCAL_DEV) at runtime.
EXPOSE 3001
CMD ["node", "server.js"]
