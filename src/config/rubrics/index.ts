// Rubric Registry
// Central configuration for all available rubrics

import { Rubric, RubricId } from '@/types/rubric';
import { academicRubric } from './academic';
import { militaryRubric } from './military';
import { closeoutRubric } from './closeout';

/**
 * Registry of all available rubrics
 */
export const rubricRegistry: Record<RubricId, Rubric> = {
    academic: academicRubric,
    military: militaryRubric,
    closeout: closeoutRubric
};

/**
 * Default rubric ID - Closeout evaluation is the default
 */
export const DEFAULT_RUBRIC_ID: RubricId = 'closeout';

/**
 * Get rubric by ID
 * @param id - Rubric ID
 * @returns Rubric configuration or default if not found
 */
export function getRubric(id: RubricId): Rubric {
    return rubricRegistry[id] || rubricRegistry[DEFAULT_RUBRIC_ID];
}

/**
 * List all available rubrics with metadata
 * @returns Array of rubric IDs and metadata
 */
export function listRubrics(): { id: RubricId; metadata: Rubric['metadata'] }[] {
    return Object.entries(rubricRegistry).map(([id, rubric]) => ({
        id: id as RubricId,
        metadata: rubric.metadata
    }));
}

/**
 * Check if a rubric ID is valid
 * @param id - Rubric ID to check
 * @returns true if valid
 */
export function isValidRubricId(id: string): id is RubricId {
    return id in rubricRegistry;
}

// Re-export individual rubrics for direct access
export { academicRubric } from './academic';
export { militaryRubric } from './military';
export { closeoutRubric } from './closeout';
