'use client';

import { useApp } from '@/context/AppContext';
import { useRubric } from '@/context/RubricContext';
import { getAllCriteria, getScoreColor } from '@/lib/rubricAdapter';
import { getScoreBgClassByPercentage } from '@/lib/utils';

export default function ScoreTable() {
    const { state } = useApp();
    const { rubric } = useRubric();
    const results = state.evaluationResults;

    if (!results?.experts || !results.summary) return null;

    const { experts: expertsData, summary } = results;
    const rubricExperts = rubric.experts;

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left border border-gray-200">หัวข้อ</th>
                        {rubricExperts.map((expert, idx) => (
                            <th
                                key={expert.id}
                                className="p-3 text-center border border-gray-200"
                                style={{ background: expert.color }}
                            >
                                {expert.avatar} E{idx + 1}
                            </th>
                        ))}
                        <th className="p-3 text-center border border-gray-200">เฉลี่ย</th>
                        <th className="p-3 text-center border border-gray-200">คะแนนเต็ม</th>
                    </tr>
                </thead>
                <tbody>
                    {rubric.categories.map(category => (
                        <>
                            {/* Category Header */}
                            <tr key={`cat-${category.id}`} className="bg-blue-50">
                                <td
                                    colSpan={rubricExperts.length + 3}
                                    className="p-2 font-semibold text-blue-800 border border-gray-200"
                                >
                                    หมวด {category.number}: {category.name} ({category.maxScore} คะแนน)
                                </td>
                            </tr>
                            {/* Criteria Rows */}
                            {category.criteria.map(criterion => {
                                const scores = rubricExperts.map(expert => {
                                    const expertData = expertsData[expert.id as keyof typeof expertsData];
                                    return expertData?.scores.find(s => s.criterionId === criterion.id)?.score || 0;
                                });
                                const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

                                return (
                                    <tr key={criterion.id} className="hover:bg-gray-50">
                                        <td className="p-3 border border-gray-200 text-left pl-6">
                                            {criterion.id} {criterion.name}
                                        </td>
                                        {scores.map((score, idx) => (
                                            <td
                                                key={idx}
                                                className={`p-3 border border-gray-200 text-center font-semibold ${getScoreBgClassByPercentage(score, criterion.maxScore)}`}
                                            >
                                                {score}
                                            </td>
                                        ))}
                                        <td className="p-3 border border-gray-200 text-center font-bold">
                                            {avg.toFixed(1)}
                                        </td>
                                        <td className="p-3 border border-gray-200 text-center">
                                            {criterion.maxScore}
                                        </td>
                                    </tr>
                                );
                            })}
                        </>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-100 font-bold">
                        <td colSpan={rubricExperts.length + 2} className="p-3 border border-gray-200 text-right">
                            คะแนนรวม
                        </td>
                        <td className="p-3 border border-gray-200 text-center text-lg">
                            {summary.totalScore.toFixed(1)}/{rubric.totalMaxScore}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
