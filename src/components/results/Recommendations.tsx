'use client';

import { useApp } from '@/context/AppContext';
import { useRubric } from '@/context/RubricContext';

interface RecommendationWithSource {
    priority: string;
    title: string;
    detail: string;
    expectedResult: string;
    source: string;
}

export default function Recommendations() {
    const { state } = useApp();
    const { rubric } = useRubric();
    const results = state.evaluationResults;

    if (!results?.experts) return null;

    const critical: RecommendationWithSource[] = [];
    const high: RecommendationWithSource[] = [];
    const enhancement: RecommendationWithSource[] = [];

    Object.entries(results.experts).forEach(([expertId, data]) => {
        if (!data) return;
        const expertProfile = rubric.experts.find(e => e.id === expertId);
        const expertName = expertProfile?.name || expertId;
        data.recommendations.forEach(rec => {
            const recWithSource = { ...rec, source: expertName };
            if (rec.priority === 'critical') critical.push(recWithSource);
            else if (rec.priority === 'high') high.push(recWithSource);
            else enhancement.push(recWithSource);
        });
    });

    const renderGroup = (items: RecommendationWithSource[], bgColor: string, borderColor: string, titleColor: string, title: string, icon: string) => (
        <div className={`${bgColor} p-5 rounded-xl`} style={{ borderLeft: `5px solid ${borderColor}` }}>
            <h3 className="font-semibold text-lg mb-4" style={{ color: titleColor }}>
                {icon} {title}
            </h3>
            {items.length > 0 ? (
                items.map((rec, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg mb-3">
                        <div className="flex items-start gap-2 mb-2">
                            <strong>{rec.title}</strong>
                            <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                                จาก: {rec.source}
                            </span>
                        </div>
                        <p className="text-gray-700 mb-2">{rec.detail}</p>
                        <p className="text-green-700 text-sm">
                            <strong>ผลลัพธ์:</strong> {rec.expectedResult}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">ไม่มีรายการ</p>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            {renderGroup(critical, 'bg-red-50', '#E53935', '#C62828', 'ต้องดำเนินการทันที (Critical)', '🔴')}
            {renderGroup(high, 'bg-orange-50', '#FB8C00', '#E65100', 'ควรดำเนินการในระยะสั้น (High Priority)', '🟡')}
            {renderGroup(enhancement, 'bg-green-50', '#43A047', '#2E7D32', 'ข้อเสนอแนะเพิ่มเติม (Enhancement)', '🟢')}
        </div>
    );
}
