FROM oven/bun:1.1 AS build

WORKDIR /app

# Cache packages installation
COPY package.json package.json
COPY bun.lock bun.lock

RUN bun install

COPY . .

ENV NODE_ENV=production

RUN bunx prisma generate

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/index.ts

FROM debian:bullseye-slim

WORKDIR /app

COPY --from=build /app/server server
COPY --from=build /app/src/generated/prisma /app/src/generated/prisma
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y libgcc-s1 && rm -rf /var/lib/apt/lists/*

CMD ["./server"]

EXPOSE 8080
EXPOSE 3000