import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from "@/config/index.js";

// Create connection pool for better performance
const pool = new Pool({
  connectionString: config.database.url,
  // Production optimizations
  max: 20, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if unable to get connection
});

// Initialize database connection with pool
export const db = drizzle({client: pool});
