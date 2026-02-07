'use client';

import { useApp } from '@/context/AppContext';
import { useRubric } from '@/context/RubricContext';
import { getScoreColorByPercentage } from '@/lib/utils';

export default function BarChart() {
    const { state } = useApp();
    const { rubric } = useRubric();
    const summary = state.evaluationResults?.summary;

    if (!summary) return null;

    // Group criteria by category
    const categoryScores = rubric.categories.map(category => {
        const categoryCriteria = summary.criteriaAverages.filter(
            ca => category.criteria.some(c => c.id === ca.criterionId)
        );
        const categoryTotal = categoryCriteria.reduce((sum, ca) => sum + ca.averageScore, 0);

        return {
            category,
            criteria: categoryCriteria,
            total: categoryTotal
        };
    });

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">กราฟแท่งเปรียบเทียบคะแนนเฉลี่ยรายหัวข้อ</h3>

            {categoryScores.map(({ category, criteria }) => (
                <div key={category.id} className="mb-6">
                    <h4 className="font-medium text-blue-800 mb-3">
                        หมวด {category.number}: {category.name} ({category.maxScore} คะแนน)
                    </h4>
                    <div className="space-y-3">
                        {criteria.map(ca => {
                            // Prevent division by zero
                            const percentage = ca.maxScore > 0 ? (ca.averageScore / ca.maxScore) * 100 : 0;

                            return (
                                <div key={ca.criterionId}>
                                    <div className="text-sm font-medium mb-1">
                                        {ca.criterionId} {ca.name}
                                    </div>
                                    <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: getScoreColorByPercentage(ca.averageScore, ca.maxScore)
                                            }}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-semibold">
                                            {ca.averageScore.toFixed(1)}/{ca.maxScore}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
