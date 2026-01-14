// Report Export Utility
// Generates standalone HTML report with inline styling

import { EvaluationResults, experts, evaluationCriteria } from '@/types/evaluation';
import { generateOverallSummary, getExpertTotalScore, collectAllRecommendations } from '@/lib/evaluation';
import { getQualityColor, getScoreColor } from '@/lib/utils';

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
    color: #2E7D32;
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
    background: linear-gradient(to right, #FFD54F, #81C784);
    border-radius: 12px;
}

.quality-badge {
    display: inline-block;
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

export function generateHtmlReport(results: EvaluationResults): string {
    const { summary, projectName, organizationName, evaluationDate } = results;

    if (!summary) return '';

    const expertEntries = Object.entries(results.experts).filter(([, data]) => data);
    const allRecommendations = collectAllRecommendations(results.experts);

    const qualityColorClass = getQualityColor(summary.qualityLevel);
    const qualityBgColor = qualityColorClass.includes('green') ? '#4CAF50' :
        qualityColorClass.includes('yellow') ? '#FFC107' :
            qualityColorClass.includes('orange') ? '#FF9800' : '#F44336';

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
            <h1>📚 รายงานผลการประเมินงานวิจัย</h1>
            <p>SAR for Academic Research Paper</p>
        </div>

        <!-- Summary Score -->
        <div class="summary-score">
            <h2>📊 สรุปผลการประเมิน</h2>
            <p><strong>งานวิจัย:</strong> ${projectName}</p>
            <p><strong>ผู้แต่ง:</strong> ${organizationName} | <strong>วันที่ประเมิน:</strong> ${evaluationDate}</p>
            <div class="score-value">${summary.totalScore.toFixed(1)}/${summary.maxPossibleScore}</div>
            <div class="score-percent">${summary.percentage.toFixed(1)}%</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${summary.percentage}%"></div>
            </div>
            <span class="quality-badge" style="background: ${qualityBgColor}">${summary.qualityLevel}</span>
            <p style="margin-top: 16px; color: #666; max-width: 600px; margin-left: auto; margin-right: auto;">
                ${generateOverallSummary(summary, results.experts)}
            </p>
        </div>

        <!-- Expert Cards -->
        <div class="card">
            <h3>👥 คณะผู้เชี่ยวชาญประเมิน</h3>
            <div class="expert-grid">
                ${expertEntries.map(([expertId, expertData]) => {
        const expert = experts[expertId];
        if (!expert || !expertData) return '';
        const totalScore = getExpertTotalScore(expertData);
        return `
                    <div class="expert-card" style="border-top: 5px solid ${expert.borderColor}; background: linear-gradient(180deg, ${expert.color} 0%, white 30%)">
                        <div class="expert-avatar">${expert.avatar}</div>
                        <div class="expert-name">${expert.name}</div>
                        <div class="expert-title">${expert.title}</div>
                        <div class="expert-score" style="color: ${expert.borderColor}">${totalScore.toFixed(1)}/100</div>
                        <div class="expert-quote" style="border-left: 3px solid ${expert.borderColor}">"${expertData.summaryQuote}"</div>
                    </div>
                    `;
    }).join('')}
            </div>
        </div>

        <!-- Score Table -->
        <div class="card">
            <h3>📈 คะแนนเปรียบเทียบ 8 หัวข้อ</h3>
            <table>
                <thead>
                    <tr>
                        <th>หัวข้อ</th>
                        <th>น้ำหนัก</th>
                        ${expertEntries.map(([expertId]) => {
        const expert = experts[expertId];
        return `<th class="score-cell">${expert?.avatar || ''}</th>`;
    }).join('')}
                        <th class="score-cell">ค่าเฉลี่ย</th>
                    </tr>
                </thead>
                <tbody>
                    ${evaluationCriteria.map((criteria, index) => {
        const scores = expertEntries.map(([, expertData]) => {
            const scoreItem = expertData?.scores?.find(s => s.criteriaId === criteria.id);
            return scoreItem?.score || 0;
        });
        const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        return `
                        <tr>
                            <td>${index + 1}. ${criteria.name}</td>
                            <td>×${criteria.weight}</td>
                            ${scores.map(score => {
            const bgColor = score >= 4 ? '#81C784' : score >= 3 ? '#FFD54F' : score >= 2 ? '#FFB74D' : '#E57373';
            return `<td class="score-cell" style="background: ${bgColor}; color: ${score >= 3 ? '#000' : '#fff'}">${score}</td>`;
        }).join('')}
                            <td class="score-cell" style="background: #1565C0; color: white">${avg.toFixed(1)}</td>
                        </tr>
                        `;
    }).join('')}
                </tbody>
            </table>
        </div>

        <!-- Expert Details -->
        ${expertEntries.map(([expertId, expertData]) => {
        const expert = experts[expertId];
        if (!expert || !expertData) return '';
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
            <h3>💡 คำแนะนำสำคัญจากผู้เชี่ยวชาญ</h3>
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
            <p>จัดทำโดยระบบประเมินงานวิจัย Academic SAR อัตโนมัติ</p>
            <p>วันที่สร้างรายงาน: ${new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
            <p style="color: #FF9800; font-size: 11px; margin-top: 8px;">
                หมายเหตุ: รีวิวนี้เป็นการประเมินเบื้องต้นโดย AI ควรใช้ร่วมกับการรีวิวจากมนุษย์
            </p>
            <p class="developer" style="margin-top: 12px;">
                ระบบรีวิวงานวิจัยทางวิชาการ<br/>
                โดย พล.ท.ดร.กริช อินทราทิพย์<br/>
                License @2026
            </p>
        </div>
    </div>
</body>
</html>`;

    return html;
}
