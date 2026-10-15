import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import postgres from "postgres";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL_POSTGRES;
if (!connectionString) {
  throw new Error(
    "No database connection string found. Set DATABASE_URL_POSTGRES or DATABASE_URL in your environment.",
  );
}
const client = neon(connectionString);
export const db = drizzle(client);
