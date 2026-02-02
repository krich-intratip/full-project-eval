// AI Service Layer
// Updated: 2026-01-31 - Added DeepSeek and Kimi providers per ai-providers skill

import { AIProvider, providerConfigs } from '@/types/ai';

/**
 * Safely parse error response from API
 */
async function parseErrorResponse(response: Response, fallbackMessage: string): Promise<string> {
    try {
        const error = await response.json();
        return error.error?.message || error.message || fallbackMessage;
    } catch {
        // If response isn't valid JSON, try to get text
        try {
            const text = await response.text();
            return text || fallbackMessage;
        } catch {
            return fallbackMessage;
        }
    }
}

export async function callGemini(
    prompt: string,
    apiKey: string,
    model: string
): Promise<string> {
    const url = `${providerConfigs.gemini.endpoint}${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
        })
    });

    if (!response.ok) {
        const errorMessage = await parseErrorResponse(response, 'Gemini API Error');
        throw new Error(errorMessage);
    }

    const data = await response.json();

    // Safe access with validation
    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error('Unexpected Gemini response structure:', data);
        throw new Error('Gemini API ส่งข้อมูลในรูปแบบที่ไม่คาดคิด');
    }

    return data.candidates[0].content.parts[0].text;
}

export async function callDeepSeek(
    prompt: string,
    apiKey: string,
    model: string
): Promise<string> {
    const response = await fetch(providerConfigs.deepseek.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 8192
        })
    });

    if (!response.ok) {
        const errorMessage = await parseErrorResponse(response, 'DeepSeek API Error');
        throw new Error(errorMessage);
    }

    const data = await response.json();

    // Safe access with validation
    if (!data?.choices?.[0]?.message?.content) {
        console.error('Unexpected DeepSeek response structure:', data);
        throw new Error('DeepSeek API ส่งข้อมูลในรูปแบบที่ไม่คาดคิด');
    }

    return data.choices[0].message.content;
}

export async function callKimi(
    prompt: string,
    apiKey: string,
    model: string
): Promise<string> {
    const response = await fetch(providerConfigs.kimi.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 8192
        })
    });

    if (!response.ok) {
        const errorMessage = await parseErrorResponse(response, 'Kimi API Error');
        throw new Error(errorMessage);
    }

    const data = await response.json();

    // Safe access with validation
    if (!data?.choices?.[0]?.message?.content) {
        console.error('Unexpected Kimi response structure:', data);
        throw new Error('Kimi API ส่งข้อมูลในรูปแบบที่ไม่คาดคิด');
    }

    return data.choices[0].message.content;
}

export async function callOpenRouter(
    prompt: string,
    apiKey: string,
    model: string
): Promise<string> {
    const response = await fetch(providerConfigs.openrouter.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': typeof window !== 'undefined' ? window.location.href : '',
            'X-Title': 'Military Closeout Evaluation System'
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 8192
        })
    });

    if (!response.ok) {
        const errorMessage = await parseErrorResponse(response, 'OpenRouter API Error');
        throw new Error(errorMessage);
    }

    const data = await response.json();

    // Safe access with validation
    if (!data?.choices?.[0]?.message?.content) {
        console.error('Unexpected OpenRouter response structure:', data);
        throw new Error('OpenRouter API ส่งข้อมูลในรูปแบบที่ไม่คาดคิด');
    }

    return data.choices[0].message.content;
}

export async function callAI(
    provider: AIProvider,
    prompt: string,
    apiKey: string,
    model: string
): Promise<string> {
    switch (provider) {
        case 'gemini':
            return callGemini(prompt, apiKey, model);
        case 'deepseek':
            return callDeepSeek(prompt, apiKey, model);
        case 'kimi':
            return callKimi(prompt, apiKey, model);
        case 'openrouter':
            return callOpenRouter(prompt, apiKey, model);
        default:
            throw new Error(`Unknown provider: ${provider}`);
    }
}

/**
 * Parse and validate AI response as JSON
 * @param responseText Raw response text from AI
 * @returns Parsed JSON object
 * @throws Error if parsing fails
 */
export function parseAIResponse<T>(responseText: string): T {
    if (!responseText || typeof responseText !== 'string') {
        throw new Error('ไม่ได้รับข้อมูลตอบกลับจาก AI');
    }

    let cleanedText = responseText.trim();
    cleanedText = cleanedText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '');

    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        cleanedText = jsonMatch[0];
    }

    try {
        const parsed = JSON.parse(cleanedText);
        if (typeof parsed !== 'object' || parsed === null) {
            throw new Error('ผลลัพธ์ไม่ใช่ object ที่ถูกต้อง');
        }
        return parsed as T;
    } catch (error) {
        console.error('JSON Parse Error:', error, 'Raw text (first 500 chars):', responseText.substring(0, 500));
        throw new Error('ไม่สามารถแปลงผลลัพธ์เป็น JSON ได้ กรุณาลองใหม่อีกครั้ง');
    }
}
