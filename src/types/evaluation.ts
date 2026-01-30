// Evaluation Types
// Updated for flexible rubric system

import { RubricId } from './rubric';

// Re-export rubric types for convenience
export type { ExpertProfile as Expert } from './rubric';

/**
 * @deprecated Use rubric.experts from RubricContext instead
 * Kept for backward compatibility - will be removed in future versions
 */
export { } from './rubric';

/**
 * Score item for a single criterion
 * Changed from criteriaId: number to criterionId: string for flexibility
 */
export interface ScoreItem {
    criterionId: string;  // e.g., "1.1", "2.3" - matches SubCriterion.id
    score: number;
    reason: string;
}

export interface Recommendation {
    priority: 'critical' | 'high' | 'enhancement';
    title: string;
    detail: string;
    expectedResult: string;
}

export interface ExpertEvaluation {
    expertId: string;
    paperTitle: string;
    authors: string;
    publicationReadiness: string;  // Made flexible: 'approved', 'conditional', 'rejected', etc.
    overallComment: string;
    scores: ScoreItem[];
    strengths: string[];
    weaknesses: string[];
    recommendations: Recommendation[];
    summaryQuote: string;
}

export interface CriteriaAverage {
    criterionId: string;  // Changed from criteriaId: number
    name: string;
    averageScore: number;
    maxScore: number;     // Changed from maxWeightedScore
    categoryName?: string; // Added for grouping
}

export interface EvaluationSummary {
    totalScore: number;
    maxPossibleScore: number;
    percentage: number;
    qualityLevel: string;
    decision?: string;     // Added for rubric decision
    criteriaAverages: CriteriaAverage[];
}

export interface EvaluationResults {
    projectName: string;
    organizationName: string;
    evaluationDate: string;
    rubricId?: RubricId;   // Added to track which rubric was used
    experts: {
        expert1?: ExpertEvaluation;
        expert2?: ExpertEvaluation;
        expert3?: ExpertEvaluation;
    };
    summary: EvaluationSummary | null;
}

export type EvaluationStep = 1 | 2 | 3 | 4 | 5;
export type StepStatus = 'pending' | 'active' | 'completed';

// Legacy types for backward compatibility
// These will be removed in future versions

/**
 * @deprecated Use SubCriterion from rubric.ts instead
 */
export interface EvaluationCriteria {
    id: number;
    name: string;
    weight: number;
    maxScore: number;
}

/**
 * @deprecated evaluationCriteria is now in config/rubrics/
 * Use useRubric().rubric.categories instead
 */
export const evaluationCriteria: EvaluationCriteria[] = [];

/**
 * @deprecated experts is now in config/rubrics/
 * Use useRubric().rubric.experts instead
 */
export const experts: Record<string, unknown> = {};
