// db/index.ts

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

// Create a client instance
const sql = neon(process.env.DATABASE_URL!);

// Pass both the client and the schema to drizzle
export const db = drizzle(sql, { schema });