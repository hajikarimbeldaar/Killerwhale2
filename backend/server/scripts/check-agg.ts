import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function checkAggregation() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const db = mongoose.connection.db;
        
        console.log('--- Testing getModelsWithPricing Aggregation for XUV 7XO ---');
        
        const pipeline = [
            { $match: { id: 'model-brand-mahindra-xuv700', status: 'active' } },
            {
              $lookup: {
                from: 'variants',
                localField: 'id',
                foreignField: 'modelId',
                pipeline: [
                  { $match: { status: 'active' } },
                  { $project: { price: 1, fuel: 1, fuelType: 1 } }
                ],
                as: 'variants'
              }
            },
            {
              $addFields: {
                prices: {
                  $filter: {
                    input: { $map: { input: "$variants", as: "v", in: "$$v.price" } },
                    as: "p",
                    cond: { $gt: ["$$p", 0] }
                  }
                }
              }
            },
            {
              $addFields: {
                startingPrice: { $min: "$prices" },
              }
            }
        ];

        const results = await db.collection('models').aggregate(pipeline).toArray();
        console.log('Aggregation Results:', JSON.stringify(results, null, 2));

        if (results.length > 0) {
            console.log('Found model!');
            console.log('Variants found in lookup:', results[0].variants?.length);
            console.log('Starting Price calculated:', results[0].startingPrice);
        } else {
            console.log('Model NOT found in models collection with id and status:active');
            const modelOnly = await db.collection('models').findOne({ id: 'model-brand-mahindra-xuv700' });
            console.log('Raw model find result:', modelOnly ? 'Found' : 'Not Found');
            if (modelOnly) console.log('Model Status:', modelOnly.status);
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error('Test failed:', err);
    }
}

checkAggregation();
