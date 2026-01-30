'use client';

import { useApp } from '@/context/AppContext';
import { useRubric } from '@/context/RubricContext';
import { generateOverallSummary } from '@/lib/evaluation';
import { getQualityColor, getQualityColorHex } from '@/lib/utils';
import { getDecisionLevel } from '@/lib/rubricAdapter';

export default function SummaryScore() {
    const { state } = useApp();
    const { rubric } = useRubric();
    const results = state.evaluationResults;

    if (!results?.summary) return null;

    const { summary, projectName, organizationName, evaluationDate } = results;
    const decisionLevel = getDecisionLevel(rubric, summary.totalScore);

    // Context-specific labels
    const isMilitary = rubric.metadata.context === 'military';
    const projectLabel = isMilitary ? 'โครงการ' : 'งานวิจัย';
    const authorLabel = isMilitary ? 'หน่วยเจ้าของโครงการ' : 'ผู้แต่ง';

    return (
        <div className="bg-gradient-to-r from-[#E8F5E9] to-[#E3F2FD] p-8 md:p-10 rounded-2xl text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">📊 สรุปผลการประเมิน</h2>

            <div className="mb-4">
                <p className="text-lg"><strong>{projectLabel}:</strong> {projectName}</p>
                <p><strong>{authorLabel}:</strong> {organizationName} | <strong>วันที่ประเมิน:</strong> {evaluationDate}</p>
            </div>

            <div className="text-6xl md:text-7xl font-bold my-4"
                style={{ color: getQualityColorHex(summary.qualityLevel) }}>
                {summary.totalScore.toFixed(1)}/{summary.maxPossibleScore}
            </div>

            <div className="text-2xl text-gray-600 mb-6">
                {summary.percentage.toFixed(1)}%
            </div>

            <div className="max-w-2xl mx-auto mb-6">
                <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                            width: `${summary.percentage}%`,
                            backgroundColor: getQualityColorHex(summary.qualityLevel)
                        }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-4xl">{decisionLevel.icon}</span>
                <span className={`inline-block px-8 py-4 text-white text-xl font-semibold rounded-full shadow-lg ${getQualityColor(summary.qualityLevel)}`}>
                    {summary.qualityLevel}
                </span>
            </div>

            {decisionLevel.description && (
                <p className="text-sm text-gray-500 mb-4">
                    {decisionLevel.description}
                </p>
            )}

            <p className="mt-4 max-w-3xl mx-auto text-gray-600">
                {generateOverallSummary(rubric, summary)}
            </p>
        </div>
    );
}
