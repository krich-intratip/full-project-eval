// Evaluation Calculation Functions
// Updated for flexible rubric system

import {
    EvaluationSummary,
    CriteriaAverage,
    ExpertEvaluation
} from '@/types/evaluation';
import { Rubric } from '@/types/rubric';
import { getAllCriteria, getCategoryByCriterionId, getDecisionLevel } from './rubricAdapter';

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
            if (expert) {
                const scoreObj = expert.scores.find(s => s.criterionId === criterion.id);
                if (scoreObj) {
                    criterionTotal += scoreObj.score;
                    count++;
                }
            }
        });

        const average = count > 0 ? criterionTotal / count : 0;
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

    const percentage = (totalScore / rubric.totalMaxScore) * 100;
    const decisionLevel = getDecisionLevel(rubric, totalScore);

    return {
        totalScore,
        maxPossibleScore: rubric.totalMaxScore,
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
    return expertData.scores.reduce((sum, s) => sum + s.score, 0);
}

/**
 * Generate overall summary text
 */
export function generateOverallSummary(
    rubric: Rubric,
    summary: EvaluationSummary
): string {
    const sorted = [...summary.criteriaAverages].sort((a, b) => {
        const aPercentage = a.averageScore / a.maxScore;
        const bPercentage = b.averageScore / b.maxScore;
        return bPercentage - aPercentage;
    });
    const highest = sorted[0];
    const lowest = sorted[sorted.length - 1];

    if (rubric.metadata.context === 'military') {
        return `โครงการวิจัยนี้ได้รับการประเมินในระดับ "${summary.qualityLevel}" โดยมีจุดแข็งที่โดดเด่นในด้าน "${highest.name}" และควรเน้นการพัฒนาในด้าน "${lowest.name}" ผู้ทรงคุณวุฒิทั้ง 3 ท่านเห็นตรงกันว่าโครงการมีศักยภาพในการปรับปรุงให้ดียิ่งขึ้น`;
    }

    return `งานวิจัยนี้ได้รับการประเมินในระดับ "${summary.qualityLevel}" โดยมีจุดแข็งที่โดดเด่นในด้าน "${highest.name}" และควรเน้นการพัฒนาในด้าน "${lowest.name}" ผู้เชี่ยวชาญทั้ง 3 ท่านเห็นตรงกันว่างานวิจัยมีศักยภาพในการปรับปรุงให้ดียิ่งขึ้น`;
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

/**
 * Get category scores from expert evaluation
 */
export function getCategoryScores(
    rubric: Rubric,
    expertData: ExpertEvaluation
): { categoryId: string; categoryName: string; score: number; maxScore: number }[] {
    return rubric.categories.map(category => {
        const score = category.criteria.reduce((sum, criterion) => {
            const scoreItem = expertData.scores.find(s => s.criterionId === criterion.id);
            return sum + (scoreItem?.score || 0);
        }, 0);

        return {
            categoryId: category.id,
            categoryName: category.name,
            score,
            maxScore: category.maxScore
        };
    });
}
