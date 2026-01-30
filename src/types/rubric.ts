// Rubric Type Definitions
// Version: 1.0.0
// Last Updated: 2026-01-29

/**
 * ระดับคะแนนสำหรับเกณฑ์ย่อย
 */
export interface ScoreLevel {
    min: number;
    max: number;
    label: string;
    color: string;
    description?: string;
}

/**
 * เกณฑ์ย่อย (Sub-criterion)
 */
export interface SubCriterion {
    id: string;                     // e.g., "1.1", "2.3"
    name: string;
    maxScore: number;
    scoreLevels: ScoreLevel[];
    guidingQuestions?: string[];
    requiredEvidence?: string[];
    redFlags?: string[];
}

/**
 * หมวดหมู่เกณฑ์ (Category)
 */
export interface Category {
    id: string;                     // e.g., "cat1"
    number: number;                 // 1, 2, 3, 4
    name: string;
    maxScore: number;               // Sum of sub-criteria
    weight: number;                 // Percentage weight (e.g., 60)
    criteria: SubCriterion[];
}

/**
 * ระดับการตัดสิน
 */
export interface DecisionLevel {
    min: number;
    max: number;
    decision: string;
    label: string;
    description: string;
    icon: string;
    color: string;
}

/**
 * โปรไฟล์ผู้เชี่ยวชาญ
 */
export interface ExpertProfile {
    id: string;
    name: string;
    title: string;
    avatar: string;
    experience: string;
    focus: string;
    questions: string;
    color: string;
    borderColor: string;
}

/**
 * Metadata ของ Rubric
 */
export interface RubricMetadata {
    id: string;                     // e.g., "military-research-v1"
    name: string;                   // e.g., "เกณฑ์ประเมินโครงการวิจัยทางทหาร"
    shortName: string;              // e.g., "Military R&D"
    version: string;                // e.g., "1.0.0"
    lastUpdated: string;            // ISO date: "2026-01-29"
    author: string;
    description: string;
    context: 'military' | 'academic' | string;
}

/**
 * Rubric Configuration
 */
export interface Rubric {
    metadata: RubricMetadata;
    categories: Category[];
    totalMaxScore: number;
    decisionLevels: DecisionLevel[];
    experts: ExpertProfile[];
    scoringPrinciples?: string[];
}

/**
 * Rubric ID type
 */
export type RubricId = 'academic' | 'military' | string;
