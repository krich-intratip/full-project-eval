// Report Export Utility
// Generates standalone HTML report with inline styling
// Updated for flexible rubric system

import { EvaluationResults } from '@/types/evaluation';
import { Rubric } from '@/types/rubric';
import { generateOverallSummary, getExpertTotalScore, collectAllRecommendations } from '@/lib/evaluation';
import { getQualityColorHex } from '@/lib/utils';
import { getAllCriteria } from '@/lib/rubricAdapter';

const CSS_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Prompt', sans-serif;
    background: #FAFAFA;
    color: #333333;
    line-height: 1.6;
    padding: 20px;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
}

.header {
    background: linear-gradient(to right, #E3F2FD, #F3E5F5);
    padding: 40px;
    border-radius: 16px;
    text-align: center;
    margin-bottom: 24px;
}

.header h1 {
    color: #1565C0;
    font-size: 28px;
    margin-bottom: 8px;
}

.header p {
    color: #666;
    font-size: 14px;
}

.rubric-info {
    background: #FFF3E0;
    padding: 12px 24px;
    border-radius: 8px;
    margin-top: 16px;
    font-size: 12px;
}

.summary-score {
    background: linear-gradient(to right, #E8F5E9, #E3F2FD);
    padding: 40px;
    border-radius: 16px;
    text-align: center;
    margin-bottom: 24px;
}

.summary-score h2 {
    font-size: 24px;
    margin-bottom: 16px;
}

.score-value {
    font-size: 56px;
    font-weight: bold;
    margin: 16px 0;
}

.score-percent {
    font-size: 20px;
    color: #666;
    margin-bottom: 16px;
}

.progress-bar {
    width: 100%;
    max-width: 500px;
    height: 24px;
    background: #e0e0e0;
    border-radius: 12px;
    margin: 16px auto;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    border-radius: 12px;
}

.quality-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 32px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    border-radius: 999px;
    margin-top: 16px;
}

.card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card h3 {
    font-size: 20px;
    margin-bottom: 16px;
    color: #333;
}

.expert-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 24px;
}

@media (max-width: 768px) {
    .expert-grid {
        grid-template-columns: 1fr;
    }
}

.expert-card {
    padding: 20px;
    border-radius: 16px;
    text-align: center;
}

.expert-avatar {
    font-size: 40px;
    margin-bottom: 8px;
}

.expert-name {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
}

.expert-title {
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
}

.expert-score {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
}

.expert-quote {
    font-size: 12px;
    font-style: italic;
    color: #666;
    padding: 12px;
    background: rgba(255,255,255,0.5);
    border-radius: 8px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
}

th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

th {
    background: #f5f5f5;
    font-weight: 600;
}

.category-header {
    background: #E3F2FD;
    font-weight: 600;
    color: #1565C0;
}

.score-cell {
    text-align: center;
    font-weight: 600;
}

.recommendation-item {
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 12px;
}

.recommendation-critical {
    background: #FFEBEE;
    border-left: 4px solid #EF5350;
}

.recommendation-high {
    background: #FFF3E0;
    border-left: 4px solid #FF9800;
}

.recommendation-enhancement {
    background: #E3F2FD;
    border-left: 4px solid #2196F3;
}

.recommendation-title {
    font-weight: 600;
    margin-bottom: 8px;
}

.recommendation-detail {
    font-size: 14px;
    color: #666;
}

.footer {
    text-align: center;
    padding: 24px;
    margin-top: 24px;
    background: white;
    border-radius: 16px;
}

.footer p {
    color: #666;
    font-size: 12px;
    margin-bottom: 8px;
}

.footer .developer {
    color: #1565C0;
    font-weight: 600;
}
`;

export function generateHtmlReport(rubric: Rubric, results: EvaluationResults): string {
    const { summary, projectName, organizationName, evaluationDate } = results;

    if (!summary) return '';

    const expertEntries = Object.entries(results.experts).filter(([, data]) => data);
    const allRecommendations = collectAllRecommendations(results.experts);
    const qualityBgColor = getQualityColorHex(summary.qualityLevel);

    // Context-specific labels
    const isMilitary = rubric.metadata.context === 'military' || rubric.metadata.context === 'military-closeout';
    const isCloseout = rubric.metadata.context === 'military-closeout';
    const projectLabel = isMilitary ? 'โครงการ' : 'งานวิจัย';
    const authorLabel = isMilitary ? 'หน่วยเจ้าของโครงการ' : 'ผู้แต่ง';
    const systemTitle = isCloseout
        ? 'ระบบประเมินโครงการวิจัย(ขั้นปิดโครงการ) สวพ.ทบ.'
        : isMilitary
        ? 'ระบบประเมินโครงการวิจัยขั้นกลั่นกรองโครงการ'
        : 'SAR for Academic Research Paper';

    const html = `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>รายงานผลการประเมิน - ${projectName}</title>
    <style>${CSS_STYLES}</style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>📊 รายงานผลการประเมิน${projectLabel}</h1>
            <p>${systemTitle}</p>
            <div class="rubric-info">
                📋 เกณฑ์: ${rubric.metadata.name} | เวอร์ชัน ${rubric.metadata.version} | อัพเดท ${rubric.metadata.lastUpdated}
            </div>
        </div>

        <!-- Summary Score -->
        <div class="summary-score">
            <h2>📊 สรุปผลการประเมิน</h2>
            <p><strong>${projectLabel}:</strong> ${projectName}</p>
            <p><strong>${authorLabel}:</strong> ${organizationName} | <strong>วันที่ประเมิน:</strong> ${evaluationDate}</p>
            <div class="score-value" style="color: ${qualityBgColor}">${summary.totalScore.toFixed(1)}/${summary.maxPossibleScore}</div>
            <div class="score-percent">${summary.percentage.toFixed(1)}%</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${summary.percentage}%; background: ${qualityBgColor}"></div>
            </div>
            <span class="quality-badge" style="background: ${qualityBgColor}">
                ${summary.qualityLevel}
            </span>
            <p style="margin-top: 16px; color: #666; max-width: 600px; margin-left: auto; margin-right: auto;">
                ${generateOverallSummary(rubric, summary)}
            </p>
        </div>

        <!-- Expert Cards -->
        <div class="card">
            <h3>👥 คณะผู้ทรงคุณวุฒิประเมิน</h3>
            <div class="expert-grid">
                ${rubric.experts.map(expert => {
        const expertData = results.experts[expert.id as keyof typeof results.experts];
        if (!expertData) return '';
        const totalScore = getExpertTotalScore(rubric, expertData);
        return `
                    <div class="expert-card" style="border-top: 5px solid ${expert.borderColor}; background: linear-gradient(180deg, ${expert.color} 0%, white 30%)">
                        <div class="expert-avatar">${expert.avatar}</div>
                        <div class="expert-name">${expert.name}</div>
                        <div class="expert-title">${expert.title}</div>
                        <div class="expert-score" style="color: ${expert.borderColor}">${totalScore.toFixed(1)}/${rubric.totalMaxScore}</div>
                        <div class="expert-quote" style="border-left: 3px solid ${expert.borderColor}">"${expertData.summaryQuote}"</div>
                    </div>
                    `;
    }).join('')}
            </div>
        </div>

        <!-- Score Table by Categories -->
        <div class="card">
            <h3>📈 คะแนนเปรียบเทียบตามหมวดหมู่</h3>
            <table>
                <thead>
                    <tr>
                        <th>หัวข้อ</th>
                        ${rubric.experts.map(expert => `<th class="score-cell">${expert.avatar}</th>`).join('')}
                        <th class="score-cell">เฉลี่ย</th>
                        <th class="score-cell">เต็ม</th>
                    </tr>
                </thead>
                <tbody>
                    ${rubric.categories.map(category => `
                        <tr class="category-header">
                            <td colspan="${rubric.experts.length + 3}">หมวด ${category.number}: ${category.name} (${category.maxScore} คะแนน)</td>
                        </tr>
                        ${category.criteria.map(criterion => {
        const scores = rubric.experts.map(expert => {
            const expertData = results.experts[expert.id as keyof typeof results.experts];
            return expertData?.scores?.find(s => s.criterionId === criterion.id)?.score || 0;
        });
        const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        // Prevent division by zero
        const percentage = criterion.maxScore > 0 ? (avg / criterion.maxScore) * 100 : 0;
        return `
                            <tr>
                                <td style="padding-left: 24px;">${criterion.id} ${criterion.name}</td>
                                ${scores.map(score => {
            // Prevent division by zero
            const pct = criterion.maxScore > 0 ? (score / criterion.maxScore) * 100 : 0;
            const bgColor = pct >= 80 ? '#81C784' : pct >= 60 ? '#FFD54F' : pct >= 40 ? '#FFB74D' : '#E57373';
            return `<td class="score-cell" style="background: ${bgColor}">${score}</td>`;
        }).join('')}
                                <td class="score-cell" style="background: #1565C0; color: white">${avg.toFixed(1)}</td>
                                <td class="score-cell">${criterion.maxScore}</td>
                            </tr>
                            `;
    }).join('')}
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr style="background: #f5f5f5; font-weight: bold;">
                        <td colspan="${rubric.experts.length + 1}" style="text-align: right;">รวมทั้งหมด</td>
                        <td class="score-cell" style="font-size: 18px;">${summary.totalScore.toFixed(1)}</td>
                        <td class="score-cell">${rubric.totalMaxScore}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <!-- Expert Details -->
        ${rubric.experts.map(expert => {
        const expertData = results.experts[expert.id as keyof typeof results.experts];
        if (!expertData) return '';
        return `
            <div class="card" style="border-top: 5px solid ${expert.borderColor}">
                <h3>${expert.avatar} ${expert.name}</h3>
                <p style="color: #666; margin-bottom: 16px;">${expertData.overallComment}</p>

                <h4 style="color: #388E3C; margin: 16px 0 8px 0;">✅ จุดแข็ง</h4>
                <ul style="padding-left: 20px;">
                    ${expertData.strengths?.map(s => `<li>${s}</li>`).join('') || ''}
                </ul>

                <h4 style="color: #E53935; margin: 16px 0 8px 0;">⚠️ จุดอ่อน</h4>
                <ul style="padding-left: 20px;">
                    ${expertData.weaknesses?.map(w => `<li>${w}</li>`).join('') || ''}
                </ul>
            </div>
            `;
    }).join('')}

        <!-- Recommendations -->
        <div class="card">
            <h3>💡 คำแนะนำสำคัญจากผู้ทรงคุณวุฒิ</h3>
            ${allRecommendations.slice(0, 10).map(rec => `
                <div class="recommendation-item recommendation-${rec.priority}">
                    <div class="recommendation-title">
                        ${rec.priority === 'critical' ? '🚨' : rec.priority === 'high' ? '⚠️' : '💡'}
                        ${rec.title}
                    </div>
                    <div class="recommendation-detail">${rec.detail}</div>
                    <div class="recommendation-detail" style="margin-top: 8px; color: #388E3C;">
                        <strong>ผลที่คาดหวัง:</strong> ${rec.expectedResult}
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>จัดทำโดย${systemTitle}อัตโนมัติ</p>
            <p>วันที่สร้างรายงาน: ${new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
            <p style="color: #FF9800; font-size: 11px; margin-top: 8px;">
                หมายเหตุ: รีวิวนี้เป็นการประเมินเบื้องต้นโดย AI ควรใช้ร่วมกับการประเมินจากผู้ทรงคุณวุฒิ
            </p>
            <p class="developer" style="margin-top: 12px;">
                ${systemTitle}<br/>
                โดย พล.ท.ดร.กริช อินทราทิพย์<br/>
                License @2026
            </p>
        </div>
    </div>
</body>
</html>`;

    return html;
}

/**
 * Generate Dashboard Summary HTML Report
 * Compact version showing KPIs, category scores, and top recommendations
 */
export function generateDashboardReport(rubric: Rubric, results: EvaluationResults): string {
    const { summary, projectName, organizationName, evaluationDate } = results;

    if (!summary) return '';

    const allRecommendations = collectAllRecommendations(results.experts);
    const criticalRecs = allRecommendations.filter(r => r.priority === 'critical').slice(0, 5);
    const qualityBgColor = getQualityColorHex(summary.qualityLevel);

    // Context-specific labels
    const isMilitary = rubric.metadata.context === 'military' || rubric.metadata.context === 'military-closeout';
    const isCloseout = rubric.metadata.context === 'military-closeout';
    const projectLabel = isMilitary ? 'โครงการ' : 'งานวิจัย';
    const systemTitle = isCloseout
        ? 'ระบบประเมินโครงการวิจัย(ขั้นปิดโครงการ) สวพ.ทบ.'
        : isMilitary
        ? 'ระบบประเมินโครงการวิจัยขั้นกลั่นกรองโครงการ'
        : 'SAR for Academic Research Paper';

    const html = `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - ${projectName}</title>
    <style>${CSS_STYLES}
    .kpi-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 24px;
    }
    @media (max-width: 768px) {
        .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    .kpi-card {
        background: white;
        padding: 20px;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .kpi-value {
        font-size: 32px;
        font-weight: bold;
        margin: 8px 0;
    }
    .kpi-label {
        font-size: 12px;
        color: #666;
    }
    .category-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
    }
    @media (max-width: 768px) {
        .category-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    .category-card {
        background: white;
        padding: 16px;
        border-radius: 12px;
        text-align: center;
        border: 1px solid #eee;
    }
    .category-bar {
        height: 8px;
        background: #e0e0e0;
        border-radius: 4px;
        margin-top: 8px;
        overflow: hidden;
    }
    .category-bar-fill {
        height: 100%;
        border-radius: 4px;
    }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>📊 Dashboard - สรุปผลการประเมิน</h1>
            <p>${systemTitle}</p>
            <div class="rubric-info">
                📋 เกณฑ์: ${rubric.metadata.name} | เวอร์ชัน ${rubric.metadata.version}
            </div>
        </div>

        <!-- Project Info -->
        <div class="summary-score" style="padding: 24px;">
            <h2 style="font-size: 20px; margin-bottom: 8px;">${projectName}</h2>
            <p style="color: #666; font-size: 14px;">${organizationName} | ประเมินเมื่อ: ${evaluationDate}</p>
        </div>

        <!-- KPI Grid -->
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-label">คะแนนรวม</div>
                <div class="kpi-value" style="color: ${qualityBgColor}">${summary.totalScore.toFixed(1)}</div>
                <div class="kpi-label">เต็ม ${summary.maxPossibleScore} คะแนน</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">เปอร์เซ็นต์</div>
                <div class="kpi-value" style="color: #1565C0">${summary.percentage.toFixed(1)}%</div>
                <div class="kpi-label">&nbsp;</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">ระดับคุณภาพ</div>
                <div class="kpi-value" style="font-size: 24px; color: ${qualityBgColor}">${summary.qualityLevel}</div>
                <div class="kpi-label">${summary.decision || ''}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">ผู้ทรงคุณวุฒิ</div>
                <div class="kpi-value" style="color: #388E3C">${Object.values(results.experts).filter(e => e).length}</div>
                <div class="kpi-label">ท่าน</div>
            </div>
        </div>

        <!-- Category Scores -->
        <div class="card">
            <h3>📈 คะแนนตามหมวดหมู่</h3>
            <div class="category-grid">
                ${rubric.categories.map(cat => {
        const catAvg = summary.criteriaAverages
            .filter(c => c.categoryName === cat.name)
            .reduce((sum, c) => sum + c.averageScore, 0);
        const percentage = (catAvg / cat.maxScore) * 100;
        const bgColor = percentage >= 80 ? '#81C784' : percentage >= 60 ? '#FFD54F' : percentage >= 40 ? '#FFB74D' : '#E57373';
        return `
                    <div class="category-card">
                        <div style="font-size: 11px; color: #999;">หมวด ${cat.number}</div>
                        <div style="font-size: 13px; font-weight: 600; margin: 4px 0; height: 36px; display: flex; align-items: center; justify-content: center;">${cat.name}</div>
                        <div style="font-size: 24px; font-weight: bold; color: ${bgColor}">${catAvg.toFixed(1)}</div>
                        <div style="font-size: 11px; color: #666;">/ ${cat.maxScore}</div>
                        <div class="category-bar">
                            <div class="category-bar-fill" style="width: ${percentage}%; background: ${bgColor}"></div>
                        </div>
                    </div>
                    `;
    }).join('')}
            </div>
        </div>

        <!-- Expert Summary -->
        <div class="card">
            <h3>👥 สรุปจากผู้ทรงคุณวุฒิ</h3>
            <div class="expert-grid">
                ${rubric.experts.map(expert => {
        const expertData = results.experts[expert.id as keyof typeof results.experts];
        if (!expertData) return '';
        const totalScore = expertData.scores?.reduce((sum, s) => sum + (s.score || 0), 0) || 0;
        // Prevent division by zero
        const pct = rubric.totalMaxScore > 0 ? (totalScore / rubric.totalMaxScore) * 100 : 0;
        return `
                    <div class="expert-card" style="border-top: 5px solid ${expert.borderColor}; background: linear-gradient(180deg, ${expert.color} 0%, white 30%)">
                        <div class="expert-avatar">${expert.avatar}</div>
                        <div class="expert-name">${expert.name}</div>
                        <div class="expert-score" style="color: ${expert.borderColor}">${totalScore.toFixed(1)}</div>
                        <div style="font-size: 12px; color: #666;">(${pct.toFixed(0)}%)</div>
                        <div class="expert-quote" style="border-left: 3px solid ${expert.borderColor}; margin-top: 8px;">"${expertData.summaryQuote}"</div>
                    </div>
                    `;
    }).join('')}
            </div>
        </div>

        <!-- Critical Recommendations -->
        ${criticalRecs.length > 0 ? `
        <div class="card">
            <h3>🚨 คำแนะนำสำคัญ (Critical)</h3>
            ${criticalRecs.map(rec => `
                <div class="recommendation-item recommendation-critical">
                    <div class="recommendation-title">🚨 ${rec.title}</div>
                    <div class="recommendation-detail">${rec.detail}</div>
                    <div class="recommendation-detail" style="margin-top: 8px; color: #388E3C;">
                        <strong>ผลที่คาดหวัง:</strong> ${rec.expectedResult}
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <!-- Footer -->
        <div class="footer">
            <p>Dashboard Summary Report - ${systemTitle}</p>
            <p>สร้างเมื่อ: ${new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
            <p style="color: #FF9800; font-size: 11px; margin-top: 8px;">
                หมายเหตุ: รายงานฉบับย่อ ดูรายละเอียดเพิ่มเติมในรายงานฉบับเต็ม
            </p>
            <p class="developer" style="margin-top: 12px;">
                โดย พล.ท.ดร.กริช อินทราทิพย์ | License @2026
            </p>
        </div>
    </div>
</body>
</html>`;

    return html;
}
