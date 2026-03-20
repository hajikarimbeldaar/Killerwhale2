import { createClient } from 'redis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function deepClearCache() {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    console.log('Connecting to Redis:', redisUrl);
    
    const client = createClient({ url: redisUrl });
    client.on('error', (err) => console.log('Redis Client Error', err));
    
    await client.connect();
    
    console.log('--- Scanning for cache keys ---');
    
    let cursor = 0;
    let totalDeleted = 0;
    
    // Pattern to catch all cache versions
    const patterns = ['cache:*', 'cache:*v4-gzip*', 'cache:/api/*'];
    
    for (const pattern of patterns) {
        let cursorValue = '0';
        do {
            const reply = await client.scan(cursorValue, {
                MATCH: pattern,
                COUNT: 100
            });
            cursorValue = reply.cursor;
            const keys = reply.keys;
            
            if (keys.length > 0) {
                console.log(`Deleting ${keys.length} keys matching ${pattern}...`);
                await client.del(keys);
                totalDeleted += keys.length;
            }
        } while (cursorValue !== '0');
    }

    console.log(`\nDONE! Total keys deleted: ${totalDeleted}`);
    
    // Also try a flushdb just to be absolutely sure if it's a dedicated redis
    // await client.flushDb(); 
    // console.log('Performed FLUSHDB');

    await client.disconnect();
}

deepClearCache().catch(console.error);
