// prisma.config.ts at the project root

import 'dotenv/config' // Ensure environment variables are loaded
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // The CLI uses this URL for commands like `prisma migrate` and `prisma generate`
    // You should put your connection string in a .env file as DATABASE_URL
    url: env('DATABASE_URL'),
  },
})
