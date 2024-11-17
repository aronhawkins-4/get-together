import { SeedPg } from '@snaplet/seed/adapter-pg';
import { defineConfig } from '@snaplet/seed/config';
import { Client } from 'pg';

export default defineConfig({
  adapter: async () => {
    const client = new Client({
      host: 'aws-0-us-west-1.pooler.supabase.com',
      port: 6543,
      user: 'postgres.vbpvbxdotsyuiiijbhrn',
      password: 'fwv8hxk_ene0ADY-kme',
      database: 'postgres',
    });
    await client.connect();
    return new SeedPg(client);
  },
});
