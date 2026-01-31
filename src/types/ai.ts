// AI Provider and Model Types

export type AIProvider = 'gemini' | 'openai' | 'openrouter';

export interface AIModel {
    value: string;
    label: string;
    isFree?: boolean;
}

export interface ProviderConfig {
    name: string;
    keyLabel: string;
    info: string;
    models: AIModel[];
    endpoint: string;
}

export const providerConfigs: Record<AIProvider, ProviderConfig> = {
    gemini: {
        name: 'Google Gemini',
        keyLabel: 'Gemini API Key',
        info: 'รับ API Key ได้ที่ <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-blue-600 hover:underline">Google AI Studio</a> (ฟรี!)',
        models: [
            { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (แนะนำ - เร็ว คุ้มค่า)', isFree: true },
            { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (ฉลาดสุด - Thinking)', isFree: true },
            { value: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash-Lite (ประหยัดสุด)', isFree: true },
            { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', isFree: true }
        ],
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/'
    },
    openai: {
        name: 'OpenAI ChatGPT',
        keyLabel: 'OpenAI API Key',
        info: 'รับ API Key ได้ที่ <a href="https://platform.openai.com/api-keys" target="_blank" class="text-blue-600 hover:underline">OpenAI Platform</a>',
        models: [
            { value: 'gpt-5', label: 'GPT-5 (ฉลาดสุด - Aug 2025)', isFree: false },
            { value: 'gpt-5-mini', label: 'GPT-5 Mini (เร็ว ประหยัด)', isFree: false },
            { value: 'gpt-4.1', label: 'GPT-4.1 (1M context)', isFree: false },
            { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini (คุ้มค่า)', isFree: false },
            { value: 'gpt-4o', label: 'GPT-4o (Multimodal)', isFree: false },
            { value: 'gpt-4o-mini', label: 'GPT-4o Mini', isFree: false }
        ],
        endpoint: 'https://api.openai.com/v1/chat/completions'
    },
    openrouter: {
        name: 'OpenRouter',
        keyLabel: 'OpenRouter API Key',
        info: 'รับ API Key ได้ที่ <a href="https://openrouter.ai/keys" target="_blank" class="text-blue-600 hover:underline">OpenRouter</a><br/>✅ รองรับหลาย models รวมถึง Claude, DeepSeek, Qwen, Typhoon และอื่นๆ (ทุกโมเดลรองรับภาษาไทย)',
        models: [
            // === 🆓 FREE MODELS (ฟรี) ===
            // Google Gemini - Free
            { value: 'google/gemini-2.5-flash-preview:free', label: '🔷 Gemini 2.5 Flash Preview (ฟรี - แนะนำ)', isFree: true },
            { value: 'google/gemini-2.5-pro-exp-03-25:free', label: '🔷 Gemini 2.5 Pro Experimental (ฟรี)', isFree: true },
            { value: 'google/gemini-2.0-flash-exp:free', label: '🔷 Gemini 2.0 Flash Exp (ฟรี)', isFree: true },
            { value: 'google/gemma-3-27b-it:free', label: '🔷 Gemma 3 27B (ฟรี)', isFree: true },

            // DeepSeek - China - Free (รองรับไทยดีมาก)
            { value: 'deepseek/deepseek-chat-v3-0324:free', label: '🇨🇳 DeepSeek V3 Chat (ฟรี - ดีมากสำหรับไทย)', isFree: true },
            { value: 'deepseek/deepseek-r1:free', label: '🇨🇳 DeepSeek R1 Reasoning (ฟรี - Thinking)', isFree: true },
            { value: 'deepseek/deepseek-r1-distill-llama-70b:free', label: '🇨🇳 DeepSeek R1 Distill 70B (ฟรี)', isFree: true },

            // Qwen - China - Free (รองรับไทยดี)
            { value: 'qwen/qwen3-235b-a22b:free', label: '🇨🇳 Qwen 3 235B (ฟรี - ใหญ่สุด)', isFree: true },
            { value: 'qwen/qwen3-32b:free', label: '🇨🇳 Qwen 3 32B (ฟรี)', isFree: true },
            { value: 'qwen/qwen-2.5-72b-instruct:free', label: '🇨🇳 Qwen 2.5 72B (ฟรี)', isFree: true },
            { value: 'qwen/qwen-2.5-coder-32b-instruct:free', label: '🇨🇳 Qwen 2.5 Coder 32B (ฟรี)', isFree: true },
            { value: 'qwen/qwq-32b:free', label: '🇨🇳 Qwen QwQ 32B Reasoning (ฟรี)', isFree: true },

            // Meta Llama - Free
            { value: 'meta-llama/llama-4-maverick:free', label: '🦙 Llama 4 Maverick (ฟรี)', isFree: true },
            { value: 'meta-llama/llama-4-scout:free', label: '🦙 Llama 4 Scout (ฟรี)', isFree: true },
            { value: 'meta-llama/llama-3.3-70b-instruct:free', label: '🦙 Llama 3.3 70B (ฟรี)', isFree: true },

            // Microsoft - Free
            { value: 'microsoft/phi-4:free', label: '🟦 Microsoft Phi-4 (ฟรี)', isFree: true },
            { value: 'microsoft/mai-ds-r1:free', label: '🟦 Microsoft MAI DS R1 (ฟรี)', isFree: true },

            // Mistral - Free
            { value: 'mistralai/mistral-small-3.1-24b-instruct:free', label: '🟠 Mistral Small 3.1 (ฟรี)', isFree: true },
            { value: 'mistralai/devstral-small:free', label: '🟠 Devstral Small (ฟรี)', isFree: true },

            // NVIDIA - Free
            { value: 'nvidia/llama-3.1-nemotron-70b-instruct:free', label: '🟩 NVIDIA Nemotron 70B (ฟรี)', isFree: true },

            // Others - Free
            { value: 'nousresearch/hermes-3-llama-3.1-405b:free', label: '⚪ Hermes 3 405B (ฟรี)', isFree: true },
            { value: 'openchat/openchat-7b:free', label: '⚪ OpenChat 7B (ฟรี)', isFree: true },

            // === 💰 BUDGET MODELS (ราคาประหยัด) ===
            // Typhoon - Thai Specialized (ดีที่สุดสำหรับภาษาไทย)
            { value: 'scb10x/llama-3.3-typhoon-70b-instruct', label: '🇹🇭 Typhoon 70B Llama 3.3 (ประหยัด - ดีที่สุดสำหรับไทย)', isFree: false },
            { value: 'scb10x/typhoon2-70b-instruct', label: '🇹🇭 Typhoon 2 70B (ประหยัด)', isFree: false },
            { value: 'scb10x/typhoon2-8b-instruct', label: '🇹🇭 Typhoon 2 8B (ถูกมาก)', isFree: false },

            // DeepSeek - China - Paid (ราคาถูกมาก)
            { value: 'deepseek/deepseek-chat', label: '🇨🇳 DeepSeek Chat (ประหยัด)', isFree: false },
            { value: 'deepseek/deepseek-r1', label: '🇨🇳 DeepSeek R1 (ประหยัด - Reasoning)', isFree: false },

            // Qwen - China - Paid
            { value: 'qwen/qwen-2.5-72b-instruct', label: '🇨🇳 Qwen 2.5 72B (ประหยัด)', isFree: false },
            { value: 'qwen/qwen-turbo', label: '🇨🇳 Qwen Turbo (ถูกมาก)', isFree: false },

            // Moonshot/Kimi - China
            { value: 'moonshotai/kimi-k2', label: '🇨🇳 Kimi K2 (ประหยัด - Moonshot)', isFree: false },

            // MiniMax - China
            { value: 'minimax/minimax-01', label: '🇨🇳 MiniMax 01 (ประหยัด)', isFree: false },

            // Google - Paid Budget
            { value: 'google/gemini-2.5-flash', label: '🔷 Gemini 2.5 Flash (ประหยัด)', isFree: false },
            { value: 'google/gemini-2.0-flash-001', label: '🔷 Gemini 2.0 Flash (ประหยัด)', isFree: false },

            // Claude Haiku - Budget
            { value: 'anthropic/claude-3.5-haiku', label: '🟤 Claude 3.5 Haiku (ประหยัด)', isFree: false },
            { value: 'anthropic/claude-3-haiku', label: '🟤 Claude 3 Haiku (ถูกสุด)', isFree: false },

            // GPT Budget
            { value: 'openai/gpt-4o-mini', label: '🟢 GPT-4o Mini (ประหยัด)', isFree: false },
            { value: 'openai/gpt-4.1-mini', label: '🟢 GPT-4.1 Mini (ประหยัด)', isFree: false },

            // === 💎 PREMIUM MODELS (มีค่าใช้จ่าย - คุณภาพสูง) ===
            // Claude - Premium
            { value: 'anthropic/claude-opus-4', label: '🟤 Claude Opus 4 (พรีเมียม - ฉลาดสุด)', isFree: false },
            { value: 'anthropic/claude-sonnet-4', label: '🟤 Claude Sonnet 4 (พรีเมียม)', isFree: false },
            { value: 'anthropic/claude-3.5-sonnet', label: '🟤 Claude 3.5 Sonnet (พรีเมียม)', isFree: false },

            // GPT - Premium
            { value: 'openai/gpt-5', label: '🟢 GPT-5 (พรีเมียม - ใหม่สุด)', isFree: false },
            { value: 'openai/gpt-4.1', label: '🟢 GPT-4.1 (พรีเมียม - 1M context)', isFree: false },
            { value: 'openai/gpt-4o', label: '🟢 GPT-4o (พรีเมียม - Multimodal)', isFree: false },
            { value: 'openai/o1', label: '🟢 OpenAI o1 (พรีเมียม - Reasoning)', isFree: false },
            { value: 'openai/o3-mini', label: '🟢 OpenAI o3-mini (พรีเมียม - Reasoning)', isFree: false },

            // Google - Premium
            { value: 'google/gemini-2.5-pro', label: '🔷 Gemini 2.5 Pro (พรีเมียม - Thinking)', isFree: false },
            { value: 'google/gemini-2.0-flash-thinking-exp-01-21', label: '🔷 Gemini 2.0 Thinking (พรีเมียม)', isFree: false },

            // xAI Grok - Premium
            { value: 'x-ai/grok-3', label: '⚫ Grok 3 (พรีเมียม - xAI)', isFree: false },
            { value: 'x-ai/grok-3-mini', label: '⚫ Grok 3 Mini (พรีเมียม)', isFree: false },

            // Mistral - Premium
            { value: 'mistralai/mistral-large-2', label: '🟠 Mistral Large 2 (พรีเมียม)', isFree: false }
        ],
        endpoint: 'https://openrouter.ai/api/v1/chat/completions'
    }
};

export interface AICallOptions {
    provider: AIProvider;
    apiKey: string;
    model: string;
    prompt: string;
    temperature?: number;
    maxTokens?: number;
}

export interface AIResponse {
    success: boolean;
    content?: string;
    error?: string;
}
