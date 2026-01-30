'use client';

import { useEvaluation } from '@/hooks';
import { useRubric } from '@/context/RubricContext';
import { Card } from '@/components/ui';
import { getQualityColor } from '@/lib/utils';
import { getCategoryScores } from '@/lib/evaluation';
import { generateDashboardReport } from '@/lib/reportExport';

export default function Dashboard() {
    const { results } = useEvaluation();
    const { rubric } = useRubric();

    // No results yet
    if (!results || !results.summary) {
        return (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#E3F2FD] to-[#F3E5F5] p-8 rounded-2xl text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1565C0] mb-4">
                        📊 Dashboard
                    </h2>
                    <p className="text-gray-600">
                        ผลการประเมินโครงการล่าสุด
                    </p>
                </div>

                <Card title="ยังไม่มีผลการประเมิน" icon="📋">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            ยังไม่ได้ทำการประเมิน
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            กรุณาไปที่แท็บ &quot;ประเมินโครงการ&quot; เพื่ออัปโหลดเอกสาร PDF และเริ่มการประเมินโครงการวิจัย
                        </p>
                    </div>
                </Card>

                <Card title="เกณฑ์การประเมินปัจจุบัน" icon="📐">
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold text-blue-800">{rubric.metadata.name}</h4>
                                <p className="text-sm text-blue-600">{rubric.metadata.description}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-sm text-blue-600">เวอร์ชัน {rubric.metadata.version}</span>
                                <p className="text-xs text-blue-500">อัพเดท: {rubric.metadata.lastUpdated}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {rubric.categories.map((cat) => (
                            <div key={cat.id} className="bg-gray-50 p-3 rounded-lg text-center">
                                <div className="text-2xl font-bold text-[#1565C0]">{cat.maxScore}</div>
                                <div className="text-xs text-gray-600">{cat.name}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-500">คะแนนเต็มรวม: </span>
                        <span className="font-bold text-[#1565C0]">{rubric.totalMaxScore} คะแนน</span>
                    </div>
                </Card>
            </div>
        );
    }

    // Has results
    const { summary, projectName, organizationName, evaluationDate, experts } = results;
    const qualityColor = getQualityColor(summary.qualityLevel);

    // Calculate category scores from first expert (as example)
    const firstExpert = experts.expert1 || experts.expert2 || experts.expert3;
    const categoryScores = firstExpert ? getCategoryScores(rubric, firstExpert) : [];

    // Collect all recommendations
    const allRecommendations: { priority: string; title: string; source: string }[] = [];
    Object.entries(experts).forEach(([key, expert]) => {
        if (expert?.recommendations) {
            expert.recommendations.forEach((rec) => {
                allRecommendations.push({
                    ...rec,
                    source: key
                });
            });
        }
    });
    const criticalRecs = allRecommendations.filter(r => r.priority === 'critical').slice(0, 3);

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#E3F2FD] to-[#F3E5F5] p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1565C0] mb-4">
                    📊 Dashboard
                </h2>
                <p className="text-gray-600">
                    ผลการประเมินโครงการล่าสุด
                </p>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-r from-[#E8F5E9] to-[#E3F2FD] p-6 rounded-2xl shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                            {projectName || 'โครงการวิจัย'}
                        </h3>
                        <p className="text-gray-600 text-sm">{organizationName || '-'}</p>
                        <p className="text-xs text-gray-500 mt-1">ประเมินเมื่อ: {evaluationDate}</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold" style={{ color: qualityColor }}>
                            {summary.totalScore.toFixed(1)}
                        </div>
                        <div className="text-gray-600">
                            จาก {summary.maxPossibleScore} คะแนน ({summary.percentage.toFixed(1)}%)
                        </div>
                    </div>
                    <div className="text-center">
                        <span
                            className="inline-block px-6 py-3 rounded-full text-white font-semibold text-lg"
                            style={{ backgroundColor: qualityColor }}
                        >
                            {summary.qualityLevel}
                        </span>
                        {summary.decision && (
                            <p className="text-sm text-gray-600 mt-2">{summary.decision}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Category Scores */}
            <Card title="คะแนนตามหมวดหมู่" icon="📈">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {rubric.categories.map((cat) => {
                        const catAvg = summary.criteriaAverages
                            .filter(c => c.categoryName === cat.name)
                            .reduce((sum, c) => sum + c.averageScore, 0);
                        const percentage = (catAvg / cat.maxScore) * 100;
                        const bgColor = percentage >= 80 ? '#81C784' : percentage >= 60 ? '#FFD54F' : percentage >= 40 ? '#FFB74D' : '#E57373';

                        return (
                            <div key={cat.id} className="bg-white border rounded-lg p-4 text-center shadow-sm">
                                <div className="text-xs text-gray-500 mb-1">หมวด {cat.number}</div>
                                <div className="font-semibold text-sm text-gray-700 mb-2 h-10 flex items-center justify-center">
                                    {cat.name}
                                </div>
                                <div
                                    className="text-2xl font-bold mb-1"
                                    style={{ color: bgColor }}
                                >
                                    {catAvg.toFixed(1)}
                                </div>
                                <div className="text-xs text-gray-500">/ {cat.maxScore}</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                        className="h-2 rounded-full transition-all"
                                        style={{ width: `${percentage}%`, backgroundColor: bgColor }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Expert Summary */}
            <Card title="สรุปจากผู้ทรงคุณวุฒิ" icon="👥">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {rubric.experts.map((expert) => {
                        const expertData = experts[expert.id as keyof typeof experts];
                        if (!expertData) return null;

                        const expertTotal = expertData.scores.reduce((sum, s) => sum + s.score, 0);
                        const expertPercent = (expertTotal / rubric.totalMaxScore) * 100;

                        return (
                            <div
                                key={expert.id}
                                className="p-4 rounded-lg text-center"
                                style={{ borderTop: `4px solid ${expert.borderColor}`, background: expert.color }}
                            >
                                <div className="text-3xl mb-2">{expert.avatar}</div>
                                <div className="font-semibold text-sm">{expert.name}</div>
                                <div className="text-2xl font-bold mt-2" style={{ color: expert.borderColor }}>
                                    {expertTotal.toFixed(1)}
                                </div>
                                <div className="text-xs text-gray-500">
                                    ({expertPercent.toFixed(0)}%)
                                </div>
                                <div className="mt-3 text-xs text-gray-600 italic line-clamp-2">
                                    &quot;{expertData.summaryQuote}&quot;
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Critical Recommendations */}
            {criticalRecs.length > 0 && (
                <Card title="คำแนะนำสำคัญ" icon="🚨">
                    <div className="space-y-3">
                        {criticalRecs.map((rec, idx) => (
                            <div
                                key={idx}
                                className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg"
                            >
                                <div className="font-semibold text-red-800">
                                    {rec.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        ดูคำแนะนำทั้งหมดได้ที่แท็บ &quot;ประเมินโครงการ&quot;
                    </p>
                </Card>
            )}

            {/* Quick Actions */}
            <Card title="การดำเนินการ" icon="⚡">
                <div className="flex flex-wrap gap-4 justify-center">
                    <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-[#1565C0] text-white rounded-lg hover:bg-[#1565C0]/90 transition-colors"
                    >
                        🖨️ พิมพ์รายงาน
                    </button>
                    <button
                        onClick={() => {
                            const htmlContent = generateDashboardReport(rubric, results);
                            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `dashboard-${projectName || 'report'}-${new Date().toISOString().split('T')[0]}.html`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                        }}
                        className="px-6 py-3 bg-[#43A047] text-white rounded-lg hover:bg-[#43A047]/90 transition-colors"
                    >
                        📥 Export HTML
                    </button>
                </div>
            </Card>
        </div>
    );
}
