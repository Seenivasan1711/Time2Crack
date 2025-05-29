import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AI_PROVIDER = process.env.AI_PROVIDER || 'openai';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const openai = OPENAI_API_KEY
  ? new OpenAI({ apiKey: OPENAI_API_KEY })
  : null;

const gemini = GEMINI_API_KEY
  ? new GoogleGenerativeAI(GEMINI_API_KEY)
  : null;

const SYSTEM_PROMPT =
  'You are a helpful e-commerce assistant. You help customers with their shopping questions, product inquiries, and provide helpful information about orders and policies.';

export async function getAIResponse({ message, image }) {
  if (AI_PROVIDER === 'gemini') {
    if (!gemini) throw new Error('Gemini API key not set');
    // Use Gemini Flash 2.5
    const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    let result;
    if (image) {
      // Multimodal: text + image
      result = await model.generateContent([
        { role: 'user', parts: [
          { text: SYSTEM_PROMPT + '\n' + message },
          { inlineData: { mimeType: 'image/png', data: image } }
        ] }
      ]);
    } else {
      // Text only
      result = await model.generateContent([
        { role: 'user', parts: [ { text: SYSTEM_PROMPT + '\n' + message } ] }
      ]);
    }
    const reply = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return reply;
  } else {
    if (!openai) throw new Error('OpenAI API key not set');
    // Use OpenAI GPT-3.5
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      model: 'gpt-3.5-turbo',
    });
    return completion.choices[0].message.content;
  }
} 