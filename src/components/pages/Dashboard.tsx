'use client';

import { useState } from 'react';
import { useEvaluation } from '@/hooks';
import { useRubric } from '@/context/RubricContext';
import { getQualityColor } from '@/lib/utils';
import { generateDashboardReport } from '@/lib/reportExport';
import { EVIDENCE_CHECKLIST } from '@/config/rubrics/closeout';

type TabId = 'expert1' | 'expert2' | 'expert3';

export default function Dashboard() {
    const { results } = useEvaluation();
    const { rubric } = useRubric();
    const [activeExpertTab, setActiveExpertTab] = useState<TabId>('expert1');

    // CSS Variables for dark theme
    const cssVars = {
        bg: '#0b1220',
        card: '#0f1b33',
        muted: '#9fb2d6',
        text: '#eaf0ff',
        line: 'rgba(255,255,255,.10)',
        accent: '#3b82f6',
        good: '#22c55e',
        warn: '#f59e0b',
        bad: '#ef4444',
        radius: '18px',
    };

    // No results yet - show empty state
    if (!results || !results.summary) {
        return (
            <div style={{
                background: `radial-gradient(1200px 600px at 20% 0%, rgba(59,130,246,.25), transparent 55%),
                    radial-gradient(900px 500px at 80% 10%, rgba(34,197,94,.18), transparent 60%),
                    ${cssVars.bg}`,
                minHeight: '100vh',
                padding: '22px',
                color: cssVars.text,
                fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans Thai", "Noto Sans", Arial'
            }}>
                <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' as const }}>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '20px', lineHeight: 1.25 }}>
                                AI-REC — รายงานผลประเมินขั้นปิดโครงการ (Dashboard)
                            </h1>
                            <p style={{ margin: '6px 0 0', color: cssVars.muted, fontSize: '13px', lineHeight: 1.45 }}>
                                <b>เกณฑ์:</b> {rubric.metadata.name}<br />
                                <b>เวอร์ชัน:</b> {rubric.metadata.version} | <b>อัพเดท:</b> {rubric.metadata.lastUpdated}
                            </p>
                        </div>
                    </div>

                    {/* Empty State Card */}
                    <div style={{
                        marginTop: '16px',
                        background: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
                        border: `1px solid ${cssVars.line}`,
                        borderRadius: cssVars.radius,
                        boxShadow: '0 12px 30px rgba(0,0,0,.35)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            padding: '14px 16px',
                            borderBottom: `1px solid ${cssVars.line}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <h2 style={{ margin: 0, fontSize: '14px', letterSpacing: '.2px' }}>
                                📊 ยังไม่มีผลการประเมิน
                            </h2>
                        </div>
                        <div style={{ padding: '40px 16px', textAlign: 'center' as const }}>
                            <div style={{ fontSize: '60px', marginBottom: '16px' }}>📝</div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                                ยังไม่ได้ทำการประเมิน
                            </h3>
                            <p style={{ color: cssVars.muted, fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                                กรุณาไปที่แท็บ &quot;ประเมินโครงการ&quot; เพื่ออัปโหลดเอกสาร PDF และเริ่มการประเมินโครงการวิจัย
                            </p>
                        </div>
                    </div>

                    {/* Evidence Checklist Card */}
                    <div style={{
                        marginTop: '14px',
                        background: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
                        border: `1px solid ${cssVars.line}`,
                        borderRadius: cssVars.radius,
                        boxShadow: '0 12px 30px rgba(0,0,0,.35)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            padding: '14px 16px',
                            borderBottom: `1px solid ${cssVars.line}`,
                        }}>
                            <h2 style={{ margin: 0, fontSize: '14px', letterSpacing: '.2px' }}>
                                📋 Checklist ชุดหลักฐานที่ต้องเตรียม (ตาม กวป.)
                            </h2>
                        </div>
                        <div style={{ padding: '16px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '10px', textAlign: 'left' as const, color: cssVars.muted, fontWeight: 800, background: 'rgba(0,0,0,.18)', borderBottom: `1px solid ${cssVars.line}` }}>รหัส</th>
                                        <th style={{ padding: '10px', textAlign: 'left' as const, color: cssVars.muted, fontWeight: 800, background: 'rgba(0,0,0,.18)', borderBottom: `1px solid ${cssVars.line}` }}>ชุดหลักฐาน</th>
                                        <th style={{ padding: '10px', textAlign: 'left' as const, color: cssVars.muted, fontWeight: 800, background: 'rgba(0,0,0,.18)', borderBottom: `1px solid ${cssVars.line}` }}>สถานะ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(EVIDENCE_CHECKLIST).map((evd) => (
                                        <tr key={evd.id}>
                                            <td style={{ padding: '10px', borderBottom: `1px solid ${cssVars.line}` }}>
                                                <code style={{ background: 'rgba(0,0,0,.25)', padding: '2px 6px', borderRadius: '10px', border: `1px solid ${cssVars.line}` }}>{evd.id}</code>
                                            </td>
                                            <td style={{ padding: '10px', borderBottom: `1px solid ${cssVars.line}` }}>
                                                <b>{evd.name}</b>
                                                <div style={{ fontSize: '11px', color: cssVars.muted, marginTop: '4px' }}>{evd.description}</div>
                                            </td>
                                            <td style={{ padding: '10px', borderBottom: `1px solid ${cssVars.line}` }}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '6px 10px',
                                                    borderRadius: '999px',
                                                    border: `1px solid ${evd.required ? 'rgba(245,158,11,.35)' : cssVars.line}`,
                                                    background: evd.required ? 'rgba(245,158,11,.10)' : 'rgba(255,255,255,.05)',
                                                    fontSize: '12px'
                                                }}>
                                                    {evd.required ? '⚠️ จำเป็น' : '📌 แนะนำ'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Has results - show full dashboard
    const { summary, projectName, organizationName, evaluationDate, experts } = results;
    const qualityColor = getQualityColor(summary.qualityLevel);

    // Get status dot color based on score
    const getStatusDotColor = (score: number) => {
        if (score >= 81) return cssVars.good;
        if (score >= 71) return cssVars.warn;
        if (score >= 50) return cssVars.accent;
        return cssVars.bad;
    };

    // Get status label
    const getStatusLabel = (score: number) => {
        if (score >= 81) return 'Pass — ปิดโครงการ (ดีเยี่ยม)';
        if (score >= 71) return 'Modify — ปิดโครงการแบบมีเงื่อนไข';
        if (score >= 50) return 'Conditional — ปิดเพื่อรับทราบ/มีเงื่อนไข';
        return 'Fail — ไม่เห็นชอบให้ปิดโครงการ';
    };

    // Calculate expert scores
    const expertScores = rubric.experts.map(expert => {
        const expertData = experts[expert.id as keyof typeof experts];
        if (!expertData) return { expert, total: 0, data: null };
        const total = expertData.scores.reduce((sum, s) => sum + s.score, 0);
        return { expert, total, data: expertData };
    }).filter(e => e.data);

    const avgScore = expertScores.length > 0
        ? expertScores.reduce((sum, e) => sum + e.total, 0) / expertScores.length
        : 0;

    // Collect all recommendations
    const allRecommendations: { priority: string; title: string; detail?: string; expectedResult?: string; source: string }[] = [];
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
    const criticalRecs = allRecommendations.filter(r => r.priority === 'critical');
    const highRecs = allRecommendations.filter(r => r.priority === 'high');

    // Evidence status mapping (simulated based on score)
    const getEvidenceStatus = (criterionId: string) => {
        // Prevent division by zero
        if (expertScores.length === 0) {
            return { status: 'unknown', label: 'ไม่ทราบ', color: 'rgba(156,163,175,.35)', bg: 'rgba(156,163,175,.10)' };
        }

        const avgCriterionScore = expertScores.reduce((sum, e) => {
            const score = e.data?.scores?.find(s => s.criterionId === criterionId)?.score || 0;
            return sum + score;
        }, 0) / expertScores.length;

        const criterion = rubric.categories
            .flatMap(c => c.criteria)
            .find(c => c.id === criterionId);

        if (!criterion) return { status: 'unknown', label: 'ไม่ทราบ', color: 'rgba(156,163,175,.35)', bg: 'rgba(156,163,175,.10)' };

        // Prevent division by zero
        const percentage = criterion.maxScore > 0 ? (avgCriterionScore / criterion.maxScore) * 100 : 0;
        if (percentage >= 80) return { status: 'found', label: 'Found', color: 'rgba(34,197,94,.35)', bg: 'rgba(34,197,94,.10)' };
        if (percentage >= 50) return { status: 'partial', label: 'Found (in-report)', color: 'rgba(59,130,246,.35)', bg: 'rgba(59,130,246,.10)' };
        return { status: 'not-found', label: 'Not Provided', color: 'rgba(245,158,11,.35)', bg: 'rgba(245,158,11,.10)' };
    };

    return (
        <div style={{
            background: `radial-gradient(1200px 600px at 20% 0%, rgba(59,130,246,.25), transparent 55%),
                radial-gradient(900px 500px at 80% 10%, rgba(34,197,94,.18), transparent 60%),
                ${cssVars.bg}`,
            minHeight: '100vh',
            padding: '22px',
            color: cssVars.text,
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans Thai", "Noto Sans", Arial'
        }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' as const }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '20px', lineHeight: 1.25 }}>
                            AI-REC — รายงานผลประเมินขั้นปิดโครงการ (Dashboard)
                        </h1>
                        <p style={{ margin: '6px 0 0', color: cssVars.muted, fontSize: '13px', lineHeight: 1.45 }}>
                            <b>โครงการ:</b> {projectName || 'ไม่ระบุชื่อโครงการ'}<br />
                            <b>เอกสารนำเข้า:</b> ไฟล์คำขอโครงการ, ไฟล์โครงการฉบับสมบูรณ์ (พร้อมคู่มือเกณฑ์ฯ และรายการชุดหลักฐานของระบบ)<br />
                            <b>วันที่ออกรายงาน:</b> {evaluationDate}
                        </p>
                    </div>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,.06)',
                        border: `1px solid ${cssVars.line}`
                    }} title="เกณฑ์สถานะ: Pass 81–100, Modify 71–80, Conditional 50–70, Fail <50">
                        <span style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: getStatusDotColor(summary.totalScore),
                            boxShadow: '0 0 0 6px rgba(255,255,255,.03)'
                        }}></span>
                        <div>
                            <div style={{ fontSize: '12px', color: cssVars.muted }}>สถานะโครงการ (ตามคะแนนรวม)</div>
                            <b style={{ fontSize: '13px' }}>{getStatusLabel(summary.totalScore)}</b>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div style={{
                    display: 'grid',
                    gap: '14px',
                    marginTop: '16px',
                    gridTemplateColumns: window.innerWidth >= 940 ? '1.2fr .8fr' : '1fr'
                }}>
                    {/* Left Card - Dashboard KPIs */}
                    <div style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
                        border: `1px solid ${cssVars.line}`,
                        borderRadius: cssVars.radius,
                        boxShadow: '0 12px 30px rgba(0,0,0,.35)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            padding: '14px 16px',
                            borderBottom: `1px solid ${cssVars.line}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            flexWrap: 'wrap' as const
                        }}>
                            <h2 style={{ margin: 0, fontSize: '14px', letterSpacing: '.2px' }}>Dashboard คะแนนรวมและภาพรวมหลักฐาน</h2>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 10px',
                                borderRadius: '999px',
                                border: '1px solid rgba(59,130,246,.35)',
                                background: 'rgba(59,130,246,.10)',
                                fontSize: '12px'
                            }}>คะแนนเต็ม {rubric.totalMaxScore}</span>
                        </div>
                        <div style={{ padding: '16px' }}>
                            {/* KPI Tiles */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {/* Score Tile */}
                                <div style={{
                                    background: 'rgba(0,0,0,.18)',
                                    border: `1px solid ${cssVars.line}`,
                                    borderRadius: '16px',
                                    padding: '14px'
                                }}>
                                    <div style={{ color: cssVars.muted, fontSize: '12px' }}>
                                        คะแนนรวมเฉลี่ย (คณะกรรมการจำลอง {expertScores.length} ท่าน)
                                    </div>
                                    <div style={{ fontSize: '28px', marginTop: '4px', fontWeight: 900, color: qualityColor }}>
                                        {summary.totalScore.toFixed(1)}
                                    </div>
                                    <div style={{ color: cssVars.muted, fontSize: '12px', marginTop: '6px', lineHeight: 1.45 }}>
                                        คำนวณ = ({expertScores.map(e => e.total.toFixed(0)).join(' + ')}) ÷ {expertScores.length}
                                    </div>
                                    <div style={{
                                        height: '10px',
                                        borderRadius: '999px',
                                        background: 'rgba(255,255,255,.10)',
                                        overflow: 'hidden',
                                        marginTop: '10px'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${summary.percentage}%`,
                                            background: `linear-gradient(90deg,${qualityColor},rgba(255,255,255,.12))`
                                        }}></div>
                                    </div>
                                    <div style={{ color: cssVars.muted, fontSize: '12px', marginTop: '6px', lineHeight: 1.45 }}>
                                        {summary.percentage >= 81 ? 'ผ่านเกณฑ์ปิดโครงการ (ดีเยี่ยม)' :
                                            summary.percentage >= 71 ? 'ผ่านแบบมีเงื่อนไข - ต้องแก้ไขบางส่วน' :
                                                summary.percentage >= 50 ? 'รับทราบ แต่ยังไม่พร้อมรับรอง/ขยายผล' :
                                                    'ยังไม่ผ่านเกณฑ์ - งานยังไม่เสร็จสิ้น'}
                                    </div>
                                </div>

                                {/* Executive Summary Tile */}
                                <div style={{
                                    background: 'rgba(0,0,0,.18)',
                                    border: `1px solid ${cssVars.line}`,
                                    borderRadius: '16px',
                                    padding: '14px'
                                }}>
                                    <div style={{ color: cssVars.muted, fontSize: '12px' }}>สรุปผู้บริหาร (Executive Summary)</div>
                                    <div style={{ color: cssVars.muted, fontSize: '12px', marginTop: '8px', lineHeight: 1.55 }}>
                                        {summary.percentage >= 81 ?
                                            'โครงการบรรลุวัตถุประสงค์ครบถ้วน มีหลักฐานประกอบครบถ้วน พร้อมนำเข้าสู่กระบวนการรับรองผลงาน' :
                                            summary.percentage >= 71 ?
                                                'โครงการมีความก้าวหน้าดี แต่ยังขาดหลักฐานบางส่วน ต้องแก้ไข/เพิ่มเติมก่อนรับรองผลงาน' :
                                                summary.percentage >= 50 ?
                                                    'โครงการมีความก้าวหน้าบางส่วน แต่ยังขาดหลักฐานสำคัญหลายรายการ รับทราบผลงานแต่ยังไม่พร้อมรับรอง' :
                                                    'โครงการยังไม่บรรลุวัตถุประสงค์หลัก ขาดหลักฐานสำคัญจำนวนมาก ไม่เห็นชอบให้ปิดโครงการ'}
                                    </div>
                                    <hr style={{ border: 'none', borderTop: `1px solid ${cssVars.line}`, margin: '14px 0' }} />
                                    <div style={{ fontSize: '12px', color: cssVars.muted, lineHeight: 1.55 }}>
                                        <b>ข้อสรุปเบื้องต้น:</b> เห็นควร &quot;{getStatusLabel(summary.totalScore).split(' — ')[1]}&quot;
                                        {summary.percentage < 81 && ' โดยกำหนดรายการตรวจรับ (Acceptance Checklist) เพิ่มเติม'}
                                    </div>
                                </div>
                            </div>

                            <hr style={{ border: 'none', borderTop: `1px solid ${cssVars.line}`, margin: '14px 0' }} />

                            {/* Expert Score Table */}
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', overflow: 'hidden', borderRadius: '14px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '32%', padding: '10px', textAlign: 'left' as const, color: cssVars.muted, fontWeight: 800, background: 'rgba(0,0,0,.18)', borderBottom: `1px solid ${cssVars.line}` }}>กรรมการผู้ทรงคุณวุฒิ (จำลอง)</th>
                                        <th style={{ width: '14%', padding: '10px', textAlign: 'left' as const, color: cssVars.muted, fontWeight: 800, background: 'rgba(0,0,0,.18)', borderBottom: `1px solid ${cssVars.line}` }}>คะแนน</th>
                                        <th style={{ padding: '10px', textAlign: 'left' as const, color: cssVars.muted, fontWeight: 800, background: 'rgba(0,0,0,.18)', borderBottom: `1px solid ${cssVars.line}` }}>เหตุผลย่อ (Evidence-based)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expertScores.map(({ expert, total, data }) => (
                                        <tr key={expert.id}>
                                            <td style={{ padding: '10px', borderBottom: `1px solid ${cssVars.line}`, verticalAlign: 'top' }}>
                                                <b>{expert.name}</b>
                                                <div style={{ fontSize: '12px', color: cssVars.muted }}>({expert.focus.split(',')[0]})</div>
                                            </td>
                                            <td style={{ padding: '10px', borderBottom: `1px solid ${cssVars.line}`, verticalAlign: 'top' }}>
                                                <b style={{ color: total >= 80 ? cssVars.good : total >= 60 ? cssVars.warn : cssVars.bad }}>{total.toFixed(0)}</b>
                                            </td>
                                            <td style={{ padding: '10px', borderBottom: `1px solid ${cssVars.line}`, verticalAlign: 'top', fontSize: '12px', color: cssVars.muted }}>
                                                {data?.summaryQuote || 'ไม่มีความเห็น'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <hr style={{ border: 'none', borderTop: `1px solid ${cssVars.line}`, margin: '14px 0' }} />

                            {/* Scoring Principles */}
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const }}>
                                <div style={{
                                    flex: 1,
                                    minWidth: '220px',
                                    background: 'rgba(0,0,0,.18)',
                                    border: `1px solid ${cssVars.line}`,
                                    borderRadius: '16px',
                                    padding: '12px'
                                }}>
                                    <div style={{ fontWeight: 900 }}>Anchor: หลักการให้คะแนน</div>
                                    <div style={{ color: cssVars.muted, fontSize: '12px', marginTop: '4px', lineHeight: 1.45 }}>
                                        ยึดผลจริงเทียบแผนที่อนุมัติ และให้คะแนนจากหลักฐานที่ตรวจสอบได้ (Evidence-first) พร้อมแยก &quot;ข้อเท็จจริง&quot; ออกจาก &quot;ข้อคิดเห็น&quot;
                                    </div>
                                </div>
                                <div style={{
                                    flex: 1,
                                    minWidth: '220px',
                                    background: 'rgba(0,0,0,.18)',
                                    border: `1px solid ${cssVars.line}`,
                                    borderRadius: '16px',
                                    padding: '12px'
                                }}>
                                    <div style={{ fontWeight: 900 }}>เกณฑ์สถานะ (คะแนนรวม)</div>
                                    <div style={{ color: cssVars.muted, fontSize: '12px', marginTop: '4px', lineHeight: 1.45 }}>
                                        81–100 ผ่าน, 71–80 แก้ไขก่อนปิด, 50–70 ปิดเพื่อรับทราบ/มีเงื่อนไข, &lt;50 ไม่เห็นชอบให้ปิด
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Card - Checklist */}
                    <div style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
                        border: `1px solid ${cssVars.line}`,
                        borderRadius: cssVars.radius,
                        boxShadow: '0 12px 30px rgba(0,0,0,.35)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            padding: '14px 16px',
                            borderBottom: `1px solid ${cssVars.line}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            flexWrap: 'wrap' as const
                        }}>
                            <h2 style={{ margin: 0, fontSize: '14px', letterSpacing: '.2px' }}>Checklist เอกสาร (Slot Mapping)</h2>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 10px',
                                borderRadius: '999px',
                                border: `1px solid ${cssVars.line}`,
                                background: 'rgba(255,255,255,.05)',
                                fontSize: '12px'
                            }}>Found / Not Provided</span>
                        </div>
                        <div style={{ padding: '16px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', overflow: 'hidden', borderRadius: '14px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '22%', padding: '10px', textAlign: 'left' as const, color: cssVars.muted, fontWeight: 800, background: 'rgba(0,0,0,.18)', borderBottom: `1px solid ${cssVars.line}` }}>Slot</th>
                                        <th style={{ padding: '10px', textAlign: 'left' as const, color: cssVars.muted, fontWeight: 800, background: 'rgba(0,0,0,.18)', borderBottom: `1px solid ${cssVars.line}` }}>รายการ</th>
                                        <th style={{ width: '22%', padding: '10px', textAlign: 'left' as const, color: cssVars.muted, fontWeight: 800, background: 'rgba(0,0,0,.18)', borderBottom: `1px solid ${cssVars.line}` }}>สถานะ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { slot: '1', code: 'PROPOSAL', name: 'ไฟล์คำขอโครงการ (Proposal)', criterion: '1.1' },
                                        { slot: '2', code: 'FULL_PROJECT', name: 'ไฟล์โครงการฉบับสมบูรณ์', criterion: '3.1' },
                                        { slot: '3', code: 'OUTPUTS', name: 'ชุดเอกสารผลผลิต/สิ่งส่งมอบ (Deliverables Mapping)', criterion: '1.1' },
                                        { slot: '4', code: 'TESTING', name: 'ชุดรายงานการทดสอบมาตรฐาน (Test Evidence)', criterion: '1.2' },
                                        { slot: '5', code: 'USER_ACCEPT', name: 'หลักฐานการยอมรับจากหน่วยใช้ (User Validation)', criterion: '1.3' },
                                        { slot: '6', code: 'OUTCOME', name: 'หลักฐานผลลัพธ์/องค์ความรู้ (Impact/IP)', criterion: '2.1' },
                                        { slot: '7', code: 'FINANCE', name: 'สรุปงบ Plan vs Actual + หลักฐานค่าใช้จ่าย', criterion: '4.1' },
                                        { slot: '8', code: 'RISK', name: 'สรุปความเสี่ยงคงค้าง + แผนลดความเสี่ยง', criterion: '2.3' },
                                        { slot: '9', code: 'CRITERIA', name: 'คู่มือเกณฑ์ประเมินขั้นปิดโครงการ (สวพ.ทบ.)', criterion: null },
                                        { slot: '10', code: 'EVIDENCE_CATALOG', name: 'รายการชุดหลักฐานเพื่อให้กรรมการให้คะแนนได้ครบ', criterion: null },
                                    ].map((item) => {
                                        const status = item.criterion ? getEvidenceStatus(item.criterion) : { status: 'system', label: 'Found (system)', color: 'rgba(34,197,94,.35)', bg: 'rgba(34,197,94,.10)' };
                                        return (
                                            <tr key={item.slot}>
                                                <td style={{ padding: '10px', borderBottom: `1px solid ${cssVars.line}` }}>
                                                    <code style={{ background: 'rgba(0,0,0,.25)', padding: '2px 6px', borderRadius: '10px', border: `1px solid ${cssVars.line}` }}>{item.slot}</code> {item.code}
                                                </td>
                                                <td style={{ padding: '10px', borderBottom: `1px solid ${cssVars.line}`, fontSize: '12px' }}>{item.name}</td>
                                                <td style={{ padding: '10px', borderBottom: `1px solid ${cssVars.line}` }}>
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        padding: '6px 10px',
                                                        borderRadius: '999px',
                                                        border: `1px solid ${status.color}`,
                                                        background: status.bg,
                                                        fontSize: '12px'
                                                    }}>{status.label}</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div style={{ marginTop: '12px', fontSize: '12px', color: cssVars.muted, lineHeight: 1.5 }}>
                                หมายเหตุ: การมี &quot;Found (in-report)&quot; ช่วยให้ประเมินเชิงเทคนิคได้ แต่ยังไม่เทียบเท่า &quot;ชุดหลักฐานแยกหมวด&quot; สำหรับการตรวจรับและการรับรองผลงานอย่างรวดเร็ว
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expert Reviews Card */}
                <div style={{
                    marginTop: '14px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
                    border: `1px solid ${cssVars.line}`,
                    borderRadius: cssVars.radius,
                    boxShadow: '0 12px 30px rgba(0,0,0,.35)',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        padding: '14px 16px',
                        borderBottom: `1px solid ${cssVars.line}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        flexWrap: 'wrap' as const
                    }}>
                        <h2 style={{ margin: 0, fontSize: '14px', letterSpacing: '.2px' }}>Expert Reviews (ความคิดเห็นรายกรรมการ)</h2>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const }}>
                            {rubric.experts.map((expert) => (
                                <button
                                    key={expert.id}
                                    onClick={() => setActiveExpertTab(expert.id as TabId)}
                                    style={{
                                        cursor: 'pointer',
                                        border: `1px solid ${activeExpertTab === expert.id ? 'rgba(59,130,246,.55)' : cssVars.line}`,
                                        background: activeExpertTab === expert.id ? 'rgba(59,130,246,.12)' : 'rgba(0,0,0,.16)',
                                        color: cssVars.text,
                                        padding: '10px 12px',
                                        borderRadius: '999px',
                                        fontSize: '13px'
                                    }}
                                >
                                    {expert.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ padding: '16px' }}>
                        {rubric.experts.map((expert) => {
                            const expertData = experts[expert.id as keyof typeof experts];
                            if (!expertData || activeExpertTab !== expert.id) return null;

                            return (
                                <div key={expert.id}>
                                    {/* Evidence Box */}
                                    <div style={{
                                        border: `1px solid ${cssVars.line}`,
                                        background: 'rgba(0,0,0,.20)',
                                        borderRadius: '16px',
                                        padding: '12px'
                                    }}>
                                        <b style={{ display: 'block', marginBottom: '6px' }}>ข้อเท็จจริง (Evidence)</b>
                                        <ul style={{ margin: 0, paddingLeft: '18px' }}>
                                            {expertData.strengths?.slice(0, 3).map((s, i) => (
                                                <li key={i} style={{ margin: '6px 0', fontSize: '13px' }}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <hr style={{ border: 'none', borderTop: `1px solid ${cssVars.line}`, margin: '14px 0' }} />
                                    <b>ข้อคิดเห็น (Judgement)</b>
                                    <ul style={{ margin: '8px 0 0', paddingLeft: '18px' }}>
                                        <li style={{ margin: '6px 0', fontSize: '13px' }}>{expertData.overallComment}</li>
                                        {expertData.weaknesses?.slice(0, 2).map((w, i) => (
                                            <li key={i} style={{ margin: '6px 0', fontSize: '13px', color: cssVars.warn }}>ข้อควรปรับปรุง: {w}</li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}

                        <hr style={{ border: 'none', borderTop: `1px solid ${cssVars.line}`, margin: '14px 0' }} />

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const }}>
                            <button
                                onClick={() => {
                                    const htmlContent = generateDashboardReport(rubric, results);
                                    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `AI-REC_Closeout_Report_Dashboard_${projectName || 'report'}.html`;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                }}
                                style={{
                                    cursor: 'pointer',
                                    border: '1px solid rgba(59,130,246,.55)',
                                    background: 'rgba(59,130,246,.18)',
                                    color: cssVars.text,
                                    padding: '10px 12px',
                                    borderRadius: '14px',
                                    fontWeight: 800,
                                    fontSize: '13px'
                                }}
                            >
                                Download HTML
                            </button>
                            <button
                                onClick={() => window.print()}
                                style={{
                                    cursor: 'pointer',
                                    border: `1px solid ${cssVars.line}`,
                                    background: 'rgba(255,255,255,.06)',
                                    color: cssVars.text,
                                    padding: '10px 12px',
                                    borderRadius: '14px',
                                    fontWeight: 800,
                                    fontSize: '13px'
                                }}
                            >
                                Print
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Plan Card */}
                <div style={{
                    marginTop: '14px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
                    border: `1px solid ${cssVars.line}`,
                    borderRadius: cssVars.radius,
                    boxShadow: '0 12px 30px rgba(0,0,0,.35)',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        padding: '14px 16px',
                        borderBottom: `1px solid ${cssVars.line}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        flexWrap: 'wrap' as const
                    }}>
                        <h2 style={{ margin: 0, fontSize: '14px', letterSpacing: '.2px' }}>Action Plan (รายการตรวจรับเพื่อยกระดับผลปิดโครงการ)</h2>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 10px',
                            borderRadius: '999px',
                            border: `1px solid ${cssVars.line}`,
                            background: 'rgba(255,255,255,.05)',
                            fontSize: '12px'
                        }}>Must Do / Should Do</span>
                    </div>
                    <div style={{ padding: '16px' }}>
                        {/* Must Do */}
                        {criticalRecs.length > 0 && (
                            <div style={{
                                border: '1px solid rgba(245,158,11,.35)',
                                background: 'rgba(0,0,0,.20)',
                                borderRadius: '16px',
                                padding: '12px',
                                marginBottom: '14px'
                            }}>
                                <b style={{ display: 'block', marginBottom: '6px' }}>🚨 Must Do (จำเป็นเพื่อยกระดับจาก {getStatusLabel(summary.totalScore).split(' — ')[0]})</b>
                                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                                    {criticalRecs.map((rec, i) => (
                                        <li key={i} style={{ margin: '6px 0', fontSize: '13px' }}>
                                            <b>{rec.title}</b>: {rec.detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Should Do */}
                        {highRecs.length > 0 && (
                            <div style={{
                                border: '1px solid rgba(59,130,246,.45)',
                                background: 'rgba(0,0,0,.20)',
                                borderRadius: '16px',
                                padding: '12px'
                            }}>
                                <b style={{ display: 'block', marginBottom: '6px' }}>💡 Should Do (เพื่อเพิ่มคะแนนและลดความเสี่ยงคงค้าง)</b>
                                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                                    {highRecs.slice(0, 5).map((rec, i) => (
                                        <li key={i} style={{ margin: '6px 0', fontSize: '13px' }}>
                                            <b>{rec.title}</b>: {rec.detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div style={{ marginTop: '12px', fontSize: '12px', color: cssVars.muted, lineHeight: 1.5 }}>
                            หมายเหตุ: เมื่อแนบ Must Do ครบ ระบบมีแนวโน้มยกระดับสถานะเป็น &quot;Modify (71–80)&quot; หรือ &quot;Pass (81–100)&quot; ขึ้นอยู่กับคุณภาพหลักฐานที่หน่วยใช้/การเงินยืนยันได้
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    marginTop: '14px',
                    fontSize: '12px',
                    color: cssVars.muted,
                    lineHeight: 1.5,
                    textAlign: 'center' as const
                }}>
                    เอกสารนี้เป็น Single-file Dashboard (ไม่ใช้ External CSS/JS) เพื่อใช้แนบประกอบการประชุม/เสนอผู้บังคับบัญชา/ออกมติปิดโครงการ<br />
                    {rubric.metadata.name} v{rubric.metadata.version} | อัพเดท {rubric.metadata.lastUpdated} | License @2026
                </div>
            </div>
        </div>
    );
}
