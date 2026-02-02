'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function ApiKeyInput() {
    const { state, dispatch, saveConfig } = useApp();
    const [showPassword, setShowPassword] = useState(false);

    if (!state.config.provider) return null;

    const handleApiKeyChange = (value: string) => {
        dispatch({ type: 'SET_API_KEY', payload: value });
        setTimeout(saveConfig, 100);
    };

    const getProviderInfo = () => {
        switch (state.config.provider) {
            case 'gemini':
                return {
                    label: 'Gemini API Key',
                    info: (
                        <>
                            รับ API Key ได้ที่{' '}
                            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                                className="text-blue-600 hover:underline">
                                Google AI Studio
                            </a>{' '}
                            (ฟรี!)
                        </>
                    )
                };
            case 'deepseek':
                return {
                    label: 'DeepSeek API Key',
                    info: (
                        <>
                            รับ API Key ได้ที่{' '}
                            <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer"
                                className="text-blue-600 hover:underline">
                                DeepSeek Platform
                            </a>
                            <br />
                            🇨🇳 รองรับภาษาไทยดีมาก ราคาถูก (ต้องเติมเงิน)
                        </>
                    )
                };
            case 'kimi':
                return {
                    label: 'Kimi API Key',
                    info: (
                        <>
                            รับ API Key ได้ที่{' '}
                            <a href="https://platform.moonshot.cn/console/api-keys" target="_blank" rel="noopener noreferrer"
                                className="text-blue-600 hover:underline">
                                Moonshot Platform
                            </a>
                            <br />
                            🇨🇳 รองรับภาษาไทยดี Context ยาว (ต้องเติมเงิน)
                        </>
                    )
                };
            case 'openrouter':
                return {
                    label: 'OpenRouter API Key',
                    info: (
                        <>
                            รับ API Key ได้ที่{' '}
                            <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer"
                                className="text-blue-600 hover:underline">
                                OpenRouter
                            </a>
                            <br />
                            ✅ รองรับหลาย models รวมถึง Claude, DeepSeek, Qwen, Typhoon และอื่นๆ
                        </>
                    )
                };
            default:
                return { label: 'API Key', info: null };
        }
    };

    const { label, info } = getProviderInfo();

    return (
        <div className="animate-fadeIn">
            <div className="mb-4">
                <label className="block font-medium mb-2">{label}:</label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={state.config.apiKey || ''}
                        onChange={(e) => handleApiKeyChange(e.target.value)}
                        placeholder="กรอก API Key ของคุณ"
                        className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl
              focus:outline-none focus:border-[#1976D2] focus:ring-2 focus:ring-blue-200
              transition-all duration-300"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>
                {info && (
                    <div className="mt-3 p-4 bg-[#FFFDE7] rounded-xl text-sm">
                        {info}
                    </div>
                )}
            </div>
        </div>
    );
}
