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

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 8080
EXPOSE 3000