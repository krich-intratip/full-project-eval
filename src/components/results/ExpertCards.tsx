'use client';

import { useApp } from '@/context/AppContext';
import { useRubric } from '@/context/RubricContext';
import { ExpertEvaluation } from '@/types/evaluation';
import { getExpertTotalScore } from '@/lib/evaluation';

export default function ExpertCards() {
    const { state } = useApp();
    const { rubric } = useRubric();
    const results = state.evaluationResults;

    if (!results?.experts) return null;

    const renderExpertCard = (expertId: string, expertData?: ExpertEvaluation) => {
        const expert = rubric.experts.find(e => e.id === expertId);
        if (!expert || !expertData) return null;

        const totalScore = getExpertTotalScore(rubric, expertData);

        return (
            <div
                key={expertId}
                className="p-6 rounded-2xl shadow-md"
                style={{
                    borderTop: `5px solid ${expert.borderColor}`,
                    background: `linear-gradient(180deg, ${expert.color} 0%, white 30%)`
                }}
            >
                <div className="text-5xl mb-2">{expert.avatar}</div>
                <h3 className="text-xl font-semibold mb-1">{expert.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{expert.title}</p>
                <p className="text-xs text-gray-500 mb-4">{expert.experience}</p>

                <div className="text-3xl font-bold mb-4" style={{ color: expert.borderColor }}>
                    {totalScore.toFixed(1)}/{rubric.totalMaxScore}
                </div>

                <div className="text-sm italic text-gray-600 p-3 bg-white/50 rounded-lg border-l-4"
                    style={{ borderColor: expert.borderColor }}
                >
                    &ldquo;{expertData.summaryQuote}&rdquo;
                </div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {rubric.experts.map(expert =>
                renderExpertCard(expert.id, results.experts[expert.id as keyof typeof results.experts])
            )}
        </div>
    );
}
