import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString =
  process.env.DATABASE_URL_POSTGRES
if (!connectionString) {
  throw new Error(
    "No database connection string found. Set DATABASE_URL_POSTGRES or DATABASE_URL in your environment.",
  );
}
const client = postgres(connectionString);
export const db = drizzle(client);
