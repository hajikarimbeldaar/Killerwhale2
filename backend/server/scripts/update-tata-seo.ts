import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Groq from 'groq-sdk';
import { Model } from '../db/schemas.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const groqApiKey = process.env.GROQ_API_KEY || '';
if (!groqApiKey) {
    console.error('❌ GROQ_API_KEY not found');
    process.exit(1);
}
const groq = new Groq({ apiKey: groqApiKey });

/**
 * Generate SEO and content text from scratch using Groq
 */
async function generateSeoText(carName: string, fieldType: string): Promise<string> {
    const prompts: Record<string, string> = {
        headerSeo: `Write a compelling meta description for the ${carName}. Make it sound human, conversational, and highly engaging, max 160-200 characters. No salesy fluff. Mention key appealing specs (like 5-star safety, or EV range if applicable).`,
        summary: `Act as a car enthusiast explaining the ${carName} to a friend. Write a concise, 2-3 sentence summary covering what makes this car special. Keep facts, remove marketing fluff.`,
        description: `Write a casual but detailed description for the ${carName}. Speak like a premium car reviewer (e.g. Autocar India or TopGear). Discuss its segment, platform, and who it's for. Keep it natural.`,
        pros: `List 4 honest pros for the ${carName} in bullet points. Sound real and objective, not like marketing. Keep them as natural language bullets.`,
        cons: `List 4 honest cons for the ${carName} in bullet points. Sound balanced and fair, like honest feedback from a reviewer.`,
        exteriorDesign: `Describe the exterior design of the ${carName} conversationally. Like describing the car to someone who hasn't seen it, mentioning its road presence and key styling cues.`,
        comfortConvenience: `Describe the interior and comfort features of the ${carName} naturally. Focus on what actually matters to buyers (screen size, seat comfort, space, tech).`
    };

    const basePrompt = prompts[fieldType] || `Write natural content about ${carName}`;

    const fullPrompt = `${basePrompt}

CRITICAL RULES:
1. You are the world's best automotive content writer and Google SEO expert.
2. Base all your technical facts, specifications, and features on the OFFICIAL Tata Motors website and real-world Indian auto journalism. Do not hallucinate specs.
3. Sound human and conversational. Use contractions (it's, you'll, they're).
4. Vary sentence structure.
5. NO emojis.
6. Make it sound like it's written for the Indian market but with world-class writing quality.
7. Only return the requested text. No introductory or concluding remarks (e.g., do not say "Here are the pros...").
8. Do NOT use markdown bold/italic formatting unless it's a bulleted list for pros/cons (- Bullet).

CAR TO WRITE ABOUT:
${carName}`;

    try {
        // Using Llama 3 70B for highly accurate facts and superior writing quality
        const completion = await groq.chat.completions.create({
            model: 'llama3-70b-8192', // or equivalent
            messages: [{ role: 'user', content: fullPrompt }],
            max_tokens: 800,
            temperature: 0.70
        });

        let result = completion.choices[0]?.message?.content?.trim() || "";
        result = result.replace(/^Here is the.*?:\s*/i, ""); // Remove AI prefix if present
        
        if (result && result.length > 20) {
            return result;
        }
        return "";
    } catch (error: any) {
        console.error(`  Groq error: ${error.message}`);
        // fallback model if 70b fails
        try {
            const fb = await groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: fullPrompt }],
                max_tokens: 800,
                temperature: 0.70
            });
            return fb.choices[0]?.message?.content?.trim() || "";
        } catch(e) {
             return "";
        }
    }
}

async function run() {
    const uri = process.env.MONGODB_URI;
    if (!uri) process.exit(1);

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB\n');

    // Fetch active Tata models
    const models = await Model.find({ id: { $regex: /tata/i }, status: 'active' })
        .select('id name brand headerSeo summary description pros cons exteriorDesign comfortConvenience')
        .lean();

    console.log(`📊 Found ${models.length} active Tata models\n`);
    console.log('='.repeat(60));

    const fields = ['headerSeo', 'summary', 'description', 'pros', 'cons', 'exteriorDesign', 'comfortConvenience'];
    let totalUpdates = 0;

    for (const model of models) {
        // Form a comprehensive name to help the AI (e.g. "Tata Nexon")
        const fullName = `Tata ${model.name}`;
        console.log(`\n🚗 ${fullName}`);
        console.log('-'.repeat(40));

        const updates: Record<string, string> = {};

        for (const field of fields) {
            console.log(`  📝 Generating ${field}...`);

            // Rate limiting - 2s between API calls to avoid Groq rate limits for larger models
            await new Promise(r => setTimeout(r, 2000));

            const generated = await generateSeoText(fullName, field);

            if (generated && generated.length > 0) {
                updates[field] = generated;
                console.log(`    ✨ Generated (${generated.length} chars)`);
            } else {
                console.log(`    ❌ Failed to generate`);
            }
        }

        if (Object.keys(updates).length > 0) {
            await Model.updateOne({ _id: model._id }, { $set: updates });
            console.log(`  💾 Saved ${Object.keys(updates).length} field(s) for ${fullName}`);
            totalUpdates++;
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`\n🎉 Done! Updated ${totalUpdates} Tata models`);

    await mongoose.disconnect();
    process.exit(0);
}

run().catch(console.error);
