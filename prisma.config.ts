
import { defineConfig, env } from "prisma/config";
import * as dotenv from 'dotenv';

// تشغيل الأداة لقراءة ملف الـ .env المخفي تلقائياً
dotenv.config();
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: "prisma/migrations",
  },
});
