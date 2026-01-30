// Rubric Adapter - Helper functions for rubric operations

import { Rubric, SubCriterion, Category, ScoreLevel, DecisionLevel } from '@/types/rubric';

/**
 * Get all criteria as flat list from all categories
 */
export function getAllCriteria(rubric: Rubric): SubCriterion[] {
    return rubric.categories.flatMap(cat => cat.criteria);
}

/**
 * Get criterion by ID
 */
export function getCriterion(rubric: Rubric, criterionId: string): SubCriterion | undefined {
    return getAllCriteria(rubric).find(c => c.id === criterionId);
}

/**
 * Get category by criterion ID
 */
export function getCategoryByCriterionId(rubric: Rubric, criterionId: string): Category | undefined {
    return rubric.categories.find(cat =>
        cat.criteria.some(c => c.id === criterionId)
    );
}

/**
 * Get category by ID
 */
export function getCategoryById(rubric: Rubric, categoryId: string): Category | undefined {
    return rubric.categories.find(cat => cat.id === categoryId);
}

/**
 * Get score level for a given score
 */
export function getScoreLevel(criterion: SubCriterion, score: number): ScoreLevel | undefined {
    return criterion.scoreLevels.find(
        level => score >= level.min && score <= level.max
    );
}

/**
 * Get decision level for total score
 */
export function getDecisionLevel(rubric: Rubric, totalScore: number): DecisionLevel {
    const level = rubric.decisionLevels.find(
        dl => totalScore >= dl.min && totalScore <= dl.max
    );
    // Return last decision level as fallback
    return level || rubric.decisionLevels[rubric.decisionLevels.length - 1];
}

/**
 * Calculate total score from criterion scores
 */
export function calculateTotalScore(
    rubric: Rubric,
    scores: { criterionId: string; score: number }[]
): number {
    return scores.reduce((total, s) => total + s.score, 0);
}

/**
 * Get score color based on criterion and score
 */
export function getScoreColor(criterion: SubCriterion, score: number): string {
    const level = getScoreLevel(criterion, score);
    return level?.color || '#E0E0E0';
}

/**
 * Get score color by percentage of max score
 */
export function getScoreColorByPercentage(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '#81C784';  // Green
    if (percentage >= 60) return '#FFD54F';  // Yellow
    if (percentage >= 40) return '#FFB74D';  // Orange
    return '#E57373';                         // Red
}

/**
 * Validate score is within criterion range
 */
export function isValidScore(criterion: SubCriterion, score: number): boolean {
    return score >= 0 && score <= criterion.maxScore;
}

/**
 * Get percentage of score for a criterion
 */
export function getScorePercentage(criterion: SubCriterion, score: number): number {
    return (score / criterion.maxScore) * 100;
}

/**
 * Get total max score for a category
 */
export function getCategoryMaxScore(category: Category): number {
    return category.criteria.reduce((sum, c) => sum + c.maxScore, 0);
}

/**
 * Calculate category score from individual criteria scores
 */
export function calculateCategoryScore(
    category: Category,
    scores: { criterionId: string; score: number }[]
): number {
    return category.criteria.reduce((sum, criterion) => {
        const scoreItem = scores.find(s => s.criterionId === criterion.id);
        return sum + (scoreItem?.score || 0);
    }, 0);
}

/**
 * Get expert by ID from rubric
 */
export function getExpert(rubric: Rubric, expertId: string) {
    return rubric.experts.find(e => e.id === expertId);
}

/**
 * Get all expert IDs from rubric
 */
export function getExpertIds(rubric: Rubric): string[] {
    return rubric.experts.map(e => e.id);
}

/**
 * Get criteria count for a rubric
 */
export function getCriteriaCount(rubric: Rubric): number {
    return getAllCriteria(rubric).length;
}

/**
 * Get category count for a rubric
 */
export function getCategoryCount(rubric: Rubric): number {
    return rubric.categories.length;
}
