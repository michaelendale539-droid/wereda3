// prisma.config.ts at the project root

import 'dotenv/config' // Ensure environment variables are loaded
import { defineConfig, env } from 'prisma/config'
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'), // This is the correct way to specify the database URL
  },
})