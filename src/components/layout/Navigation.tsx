'use client';

import { APP_VERSION, APP_NAME } from '@/types/app';
import { useRubric } from '@/context/RubricContext';

export type TabId = 'home' | 'dashboard' | 'guide' | 'about';

interface NavigationProps {
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
}

const tabs = [
    { id: 'home' as TabId, label: 'ประเมินโครงการ', icon: '📝' },
    { id: 'dashboard' as TabId, label: 'Dashboard', icon: '📊' },
    { id: 'guide' as TabId, label: 'คู่มือการใช้งาน', icon: '📖' },
    { id: 'about' as TabId, label: 'เกี่ยวกับโปรแกรม', icon: 'ℹ️' },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
    const { rubric } = useRubric();

    return (
        <div className="w-full">
            {/* Header */}
            <header className="bg-gradient-to-r from-[#1565C0] to-[#7B1FA2] p-8 md:p-10 rounded-t-2xl text-center shadow-lg">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    🔬 {APP_NAME}
                </h1>
                <p className="text-lg text-white/80">
                    โดยผู้ทรงคุณวุฒิ AI 3 ท่าน
                </p>
                <div className="flex justify-center gap-4 mt-3 text-sm text-white/70">
                    <span>{APP_VERSION}</span>
                    <span>|</span>
                    <span>เกณฑ์: {rubric.metadata.shortName}</span>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="bg-white shadow-md rounded-b-2xl mb-8">
                <div className="flex justify-center flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                                px-6 py-4 text-sm md:text-base font-medium transition-all duration-200
                                ${activeTab === tab.id
                                    ? 'text-[#1565C0] border-b-3 border-[#1565C0] bg-[#E3F2FD]/50'
                                    : 'text-gray-600 hover:text-[#1565C0] hover:bg-gray-50'
                                }
                            `}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
}
