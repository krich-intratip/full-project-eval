// Evaluation Calculation Functions

import {
    EvaluationResults,
    EvaluationSummary,
    CriteriaAverage,
    ExpertEvaluation,
    evaluationCriteria
} from '@/types/evaluation';

export function calculateSummary(expertsData: {
    expert1?: ExpertEvaluation;
    expert2?: ExpertEvaluation;
    expert3?: ExpertEvaluation;
}): EvaluationSummary {
    const summary: EvaluationSummary = {
        totalScore: 0,
        maxPossibleScore: 100,
        percentage: 0,
        qualityLevel: '',
        criteriaAverages: []
    };

    evaluationCriteria.forEach(criteria => {
        let totalScore = 0;
        let count = 0;

        Object.values(expertsData).forEach(expert => {
            if (expert) {
                const scoreObj = expert.scores.find(s => s.criteriaId === criteria.id);
                if (scoreObj) {
                    totalScore += scoreObj.score;
                    count++;
                }
            }
        });

        const average = count > 0 ? totalScore / count : 0;
        const weightedScore = average * criteria.weight;

        summary.criteriaAverages.push({
            criteriaId: criteria.id,
            name: criteria.name,
            averageScore: average,
            weightedScore: weightedScore,
            maxWeightedScore: criteria.maxScore,
            weight: criteria.weight
        });

        summary.totalScore += weightedScore;
    });

    summary.percentage = (summary.totalScore / summary.maxPossibleScore) * 100;

    if (summary.percentage >= 90) {
        summary.qualityLevel = 'Excellent (พร้อมตีพิมพ์)';
    } else if (summary.percentage >= 80) {
        summary.qualityLevel = 'Very Good (Minor Revision)';
    } else if (summary.percentage >= 70) {
        summary.qualityLevel = 'Good (Major Revision)';
    } else if (summary.percentage >= 60) {
        summary.qualityLevel = 'Fair (ต้องปรับปรุงมาก)';
    } else {
        summary.qualityLevel = 'Poor (ไม่พร้อมตีพิมพ์)';
    }

    return summary;
}

export function getExpertTotalScore(expertData: ExpertEvaluation): number {
    return expertData.scores.reduce((sum, s) => {
        const criteria = evaluationCriteria.find(c => c.id === s.criteriaId);
        return sum + (s.score * (criteria?.weight || 1));
    }, 0);
}

export function generateOverallSummary(
    summary: EvaluationSummary,
    expertsData: { expert1?: ExpertEvaluation; expert2?: ExpertEvaluation; expert3?: ExpertEvaluation }
): string {
    const sorted = [...summary.criteriaAverages].sort((a, b) => b.averageScore - a.averageScore);
    const highest = sorted[0];
    const lowest = sorted[sorted.length - 1];

    return `งานวิจัยนี้ได้รับการประเมินในระดับ "${summary.qualityLevel}" โดยมีจุดแข็งที่โดดเด่นในด้าน "${highest.name}" และควรเน้นการพัฒนาในด้าน "${lowest.name}" ผู้เชี่ยวชาญทั้ง 3 ท่านเห็นตรงกันว่างานวิจัยมีศักยภาพในการปรับปรุงให้ดียิ่งขึ้น`;
}

export interface CollectedRecommendation {
    priority: 'critical' | 'high' | 'enhancement';
    title: string;
    detail: string;
    expectedResult: string;
    source: string;
}

export function collectAllRecommendations(
    expertsData: { expert1?: ExpertEvaluation; expert2?: ExpertEvaluation; expert3?: ExpertEvaluation }
): CollectedRecommendation[] {
    const allRecs: CollectedRecommendation[] = [];

    Object.entries(expertsData).forEach(([expertId, expertData]) => {
        if (expertData?.recommendations) {
            expertData.recommendations.forEach(rec => {
                allRecs.push({
                    ...rec,
                    source: expertId
                });
            });
        }
    });

    // Sort by priority: critical first, then high, then enhancement
    const priorityOrder = { critical: 0, high: 1, enhancement: 2 };
    return allRecs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

