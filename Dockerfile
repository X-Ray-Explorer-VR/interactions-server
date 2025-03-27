FROM oven/bun:1-alpine AS base
WORKDIR /app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod
RUN cd /temp/prod && bun install --frozen-lockfile --production


FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .


FROM base AS release
ENV NODE_ENV=production
ENV IP="0.0.0.0"
ENV PORT=8080
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/index.js .
COPY --from=prerelease /app/package.json .

EXPOSE 8080/tcp

CMD ["bun", "run", "index.js"]