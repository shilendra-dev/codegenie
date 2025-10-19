import { config } from '@/config/index.js';
import { toNodeHandler } from "better-auth/node";
import { db } from '@/db/index.js';
import { createApp } from '@/app.js';
import { auth } from "@/lib/auth.js";


export const startServer = async () => {
  try {
    // Test database connection on startup
    await db.execute('SELECT 1');
    console.log('✅ Database connected successfully');

    const app = createApp();

    app.all("/api/auth/*splat", toNodeHandler(auth));

    app.listen(config.server.port, config.server.host, () => {
      console.log(`🚀 Server running on http://${config.server.host}:${config.server.port}`);
      console.log(`📊 Environment: ${config.server.environment}`);
      console.log(`🔗 Health check: http://${config.server.host}:${config.server.port}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};