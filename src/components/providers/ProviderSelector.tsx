'use client';

import { useApp } from '@/context/AppContext';
import { AIProvider, providerConfigs } from '@/types/ai';

const providers: { id: AIProvider; icon: string; name: string }[] = [
    { id: 'gemini', icon: '🔷', name: 'Google Gemini (ฟรี)' },
    { id: 'deepseek', icon: '🇨🇳', name: 'DeepSeek' },
    { id: 'kimi', icon: '🌙', name: 'Kimi (Moonshot)' },
    { id: 'openrouter', icon: '🔀', name: 'OpenRouter' }
];

export default function ProviderSelector() {
    const { state, dispatch, saveConfig } = useApp();

    const handleProviderChange = (providerId: AIProvider) => {
        dispatch({ type: 'SET_PROVIDER', payload: providerId });

        // Load saved config for this provider
        const savedApiKey = localStorage.getItem(`academic_sar_apikey_${providerId}`);
        const savedModel = localStorage.getItem(`academic_sar_model_${providerId}`);
        const savedCustomModel = localStorage.getItem(`academic_sar_custom_model_${providerId}`);

        if (savedApiKey) dispatch({ type: 'SET_API_KEY', payload: savedApiKey });
        if (savedModel) dispatch({ type: 'SET_MODEL', payload: savedModel });
        if (savedCustomModel) dispatch({ type: 'SET_CUSTOM_MODEL', payload: savedCustomModel });

        setTimeout(saveConfig, 100);
    };

    return (
        <div className="mb-6">
            <label className="block font-medium mb-3">เลือก AI Provider ที่ต้องการใช้:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {providers.map(provider => (
                    <label
                        key={provider.id}
                        className={`
              relative flex flex-col items-center p-5 border-3 rounded-xl cursor-pointer
              transition-all duration-300 bg-white
              ${state.config.provider === provider.id
                                ? 'border-[#1976D2] bg-[#E3F2FD] shadow-lg shadow-blue-200/50'
                                : 'border-gray-200 hover:border-[#90CAF9] hover:-translate-y-0.5'
                            }
            `}
                    >
                        <input
                            type="radio"
                            name="provider"
                            value={provider.id}
                            checked={state.config.provider === provider.id}
                            onChange={() => handleProviderChange(provider.id)}
                            className="sr-only"
                        />
                        <span className="text-4xl mb-2">{provider.icon}</span>
                        <span className="font-semibold text-lg">{provider.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
