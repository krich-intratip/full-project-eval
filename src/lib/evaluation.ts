// Evaluation Calculation Functions
// Updated: 2026-01-31 - Fixed division by zero and empty array access

import {
    EvaluationSummary,
    CriteriaAverage,
    ExpertEvaluation
} from '@/types/evaluation';
import { Rubric } from '@/types/rubric';
import { getAllCriteria, getCategoryByCriterionId, getDecisionLevel } from './rubricAdapter';

/**
 * Safe division that returns 0 if divisor is 0
 */
function safeDivide(numerator: number, denominator: number): number {
    if (denominator === 0) return 0;
    return numerator / denominator;
}

/**
 * Calculate summary from expert evaluations
 * Now accepts rubric as parameter for flexibility
 */
export function calculateSummary(
    rubric: Rubric,
    expertsData: {
        expert1?: ExpertEvaluation;
        expert2?: ExpertEvaluation;
        expert3?: ExpertEvaluation;
    }
): EvaluationSummary {
    const criteria = getAllCriteria(rubric);
    const criteriaAverages: CriteriaAverage[] = [];
    let totalScore = 0;

    criteria.forEach(criterion => {
        let criterionTotal = 0;
        let count = 0;

        Object.values(expertsData).forEach(expert => {
            if (expert?.scores && Array.isArray(expert.scores)) {
                const scoreObj = expert.scores.find(s => s.criterionId === criterion.id);
                if (scoreObj && typeof scoreObj.score === 'number') {
                    criterionTotal += scoreObj.score;
                    count++;
                }
            }
        });

        const average = safeDivide(criterionTotal, count);
        const category = getCategoryByCriterionId(rubric, criterion.id);

        criteriaAverages.push({
            criterionId: criterion.id,
            name: criterion.name,
            averageScore: average,
            maxScore: criterion.maxScore,
            categoryName: category?.name
        });

        totalScore += average;
    });

    const maxPossibleScore = rubric.totalMaxScore || 100;
    const percentage = safeDivide(totalScore, maxPossibleScore) * 100;
    const decisionLevel = getDecisionLevel(rubric, totalScore);

    return {
        totalScore,
        maxPossibleScore,
        percentage,
        qualityLevel: decisionLevel.label,
        decision: decisionLevel.decision,
        criteriaAverages
    };
}

/**
 * Get total score for a single expert
 */
export function getExpertTotalScore(
    rubric: Rubric,
    expertData: ExpertEvaluation
): number {
    if (!expertData?.scores || !Array.isArray(expertData.scores)) {
        return 0;
    }
    return expertData.scores.reduce((sum, s) => {
        const score = typeof s.score === 'number' ? s.score : 0;
        return sum + score;
    }, 0);
}

/**
 * Generate overall summary text
 */
export function generateOverallSummary(
    rubric: Rubric,
    summary: EvaluationSummary
): string {
    // Handle empty or invalid criteriaAverages
    if (!summary.criteriaAverages || summary.criteriaAverages.length === 0) {
        return `โครงการได้รับการประเมินในระดับ "${summary.qualityLevel}"`;
    }

    const sorted = [...summary.criteriaAverages].sort((a, b) => {
        const aPercentage = safeDivide(a.averageScore, a.maxScore);
        const bPercentage = safeDivide(b.averageScore, b.maxScore);
        return bPercentage - aPercentage;
    });

    const highest = sorted[0];
    const lowest = sorted[sorted.length - 1];

    // Handle case where highest/lowest might be same item
    const highestName = highest?.name || 'ไม่ระบุ';
    const lowestName = lowest?.name || 'ไม่ระบุ';

    if (rubric.metadata.context === 'military' || rubric.metadata.context === 'military-closeout') {
        return `โครงการวิจัยนี้ได้รับการประเมินในระดับ "${summary.qualityLevel}" โดยมีจุดแข็งที่โดดเด่นในด้าน "${highestName}" และควรเน้นการพัฒนาในด้าน "${lowestName}" ผู้ทรงคุณวุฒิทั้ง 3 ท่านเห็นตรงกันว่าโครงการมีศักยภาพในการปรับปรุงให้ดียิ่งขึ้น`;
    }

    return `งานวิจัยนี้ได้รับการประเมินในระดับ "${summary.qualityLevel}" โดยมีจุดแข็งที่โดดเด่นในด้าน "${highestName}" และควรเน้นการพัฒนาในด้าน "${lowestName}" ผู้เชี่ยวชาญทั้ง 3 ท่านเห็นตรงกันว่างานวิจัยมีศักยภาพในการปรับปรุงให้ดียิ่งขึ้น`;
}

export interface CollectedRecommendation {
    priority: 'critical' | 'high' | 'enhancement';
    title: string;
    detail: string;
    expectedResult: string;
    source: string;
}

/**
 * Collect all recommendations from experts
 */
export function collectAllRecommendations(
    expertsData: {
        expert1?: ExpertEvaluation;
        expert2?: ExpertEvaluation;
        expert3?: ExpertEvaluation;
    }
): CollectedRecommendation[] {
    const allRecs: CollectedRecommendation[] = [];

    Object.entries(expertsData).forEach(([expertId, expertData]) => {
        if (expertData?.recommendations && Array.isArray(expertData.recommendations)) {
            expertData.recommendations.forEach(rec => {
                if (rec && rec.title) {
                    allRecs.push({
                        priority: rec.priority || 'enhancement',
                        title: rec.title,
                        detail: rec.detail || '',
                        expectedResult: rec.expectedResult || '',
                        source: expertId
                    });
                }
            });
        }
    });

    // Sort by priority: critical first, then high, then enhancement
    const priorityOrder: Record<string, number> = { critical: 0, high: 1, enhancement: 2 };
    return allRecs.sort((a, b) => {
        const aPriority = priorityOrder[a.priority] ?? 2;
        const bPriority = priorityOrder[b.priority] ?? 2;
        return aPriority - bPriority;
    });
}

/**
 * Get category scores from expert evaluation
 */
export function getCategoryScores(
    rubric: Rubric,
    expertData: ExpertEvaluation
): { categoryId: string; categoryName: string; score: number; maxScore: number }[] {
    if (!rubric?.categories || !Array.isArray(rubric.categories)) {
        return [];
    }

    return rubric.categories.map(category => {
        let score = 0;

        if (category.criteria && Array.isArray(category.criteria)) {
            score = category.criteria.reduce((sum, criterion) => {
                const scoreItem = expertData?.scores?.find(s => s.criterionId === criterion.id);
                const scoreValue = scoreItem?.score;
                return sum + (typeof scoreValue === 'number' ? scoreValue : 0);
            }, 0);
        }

        return {
            categoryId: category.id,
            categoryName: category.name,
            score,
            maxScore: category.maxScore || 0
        };
    });
}
