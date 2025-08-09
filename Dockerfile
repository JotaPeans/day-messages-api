# Use a imagem oficial do Bun
FROM oven/bun:1.1

WORKDIR /app

# Copie os arquivos de dependências
COPY package.json bun.lockb* ./

# Instale as dependências com Bun
RUN bun install

# Copie o restante do código
COPY . .

# RUN apt install openssl

EXPOSE 8080

RUN bunx prisma generate
RUN bun build --compile --minify-whitespace --minify-syntax --target bun --outfile server ./src/index.ts

# Exponha a porta (ajuste conforme sua aplicação)

# Comando para iniciar a aplicação (ajuste se necessário)
CMD ["bun", "start"]