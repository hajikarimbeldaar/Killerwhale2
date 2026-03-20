import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function uploadHero() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const db = mongoose.connection.db;

        const localPath = '/Users/karim/.gemini/antigravity/brain/45c58373-bdfd-4767-bbc3-498432f52cf1/maruti_evitara_hero_1774039620549.png';
        const fileContent = fs.readFileSync(localPath);

        const s3Client = new S3Client({
            region: process.env.R2_REGION || 'auto',
            endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
            },
        });

        const key = `uploads/models/maruti-evitara-hero.png`;
        const bucket = process.env.R2_BUCKET || 'killerwhale';

        await s3Client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent,
            ContentType: 'image/png',
        }));

        const publicUrl = `https://cdn.gadizone.com/${key}`;
        console.log(`Uploaded to: ${publicUrl}`);

        const result = await db.collection('models').updateOne(
            { id: 'model-brand-maruti-suzuki-e-vitara' },
            { $set: { heroImage: publicUrl } }
        );

        console.log(`Updated model: ${result.modifiedCount} document(s) changed.`);
        await mongoose.disconnect();
    } catch (err) {
        console.error('Upload failed:', err);
    }
}

uploadHero();
