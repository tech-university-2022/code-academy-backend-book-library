# Installation & Commands

## Installation
```
npm i 
```

## Development

Run dependencies services
```
docker compose --env-file .env up
npm run start:dev # in a different terminal session
```

## Migrate and generate prisma
```
npx run migrate
npx run generate
```