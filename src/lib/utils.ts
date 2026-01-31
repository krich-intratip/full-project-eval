// Utility Functions
// Updated: 2026-01-31 - Fixed division by zero issues

import { SubCriterion } from '@/types/rubric';

/**
 * Safe division that returns 0 if divisor is 0
 */
function safeDivide(numerator: number, denominator: number): number {
    if (denominator === 0 || !Number.isFinite(denominator)) return 0;
    const result = numerator / denominator;
    return Number.isFinite(result) ? result : 0;
}

export function formatFileSize(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

export function formatThaiDate(date: Date = new Date()): string {
    const thaiMonths = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543; // Convert to Buddhist Era

    return `${day} ${month} ${year}`;
}

/**
 * Get score color by percentage of max score (rubric-agnostic)
 */
export function getScoreColorByPercentage(score: number, maxScore: number): string {
    const percentage = safeDivide(score, maxScore) * 100;
    if (percentage >= 80) return '#81C784';  // Green
    if (percentage >= 60) return '#FFD54F';  // Yellow
    if (percentage >= 40) return '#FFB74D';  // Orange
    return '#E57373';                         // Red
}

/**
 * Get score color from criterion's score levels
 */
export function getScoreColorFromCriterion(criterion: SubCriterion, score: number): string {
    if (!criterion?.scoreLevels || !Array.isArray(criterion.scoreLevels)) {
        return '#E0E0E0';
    }
    const level = criterion.scoreLevels.find(l => score >= l.min && score <= l.max);
    return level?.color || '#E0E0E0';
}

/**
 * Get score background class by percentage
 */
export function getScoreBgClassByPercentage(score: number, maxScore: number): string {
    const percentage = safeDivide(score, maxScore) * 100;
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 60) return 'bg-yellow-100';
    if (percentage >= 40) return 'bg-orange-100';
    return 'bg-red-100';
}

/**
 * @deprecated Use getScoreColorByPercentage instead
 * Kept for backward compatibility with old 1-4 scale
 */
export function getScoreColor(score: number): string {
    if (score >= 3.5) return 'bg-score-4';
    if (score >= 2.5) return 'bg-score-3';
    if (score >= 1.5) return 'bg-score-2';
    return 'bg-score-1';
}

/**
 * @deprecated Use getScoreColorByPercentage instead
 */
export function getScoreColorHex(score: number): string {
    if (score >= 3.5) return '#81C784';
    if (score >= 2.5) return '#FFD54F';
    if (score >= 1.5) return '#FFB74D';
    return '#E57373';
}

/**
 * @deprecated Use getScoreBgClassByPercentage instead
 */
export function getScoreBgClass(score: number): string {
    if (score === 4) return 'bg-green-100';
    if (score === 3) return 'bg-yellow-100';
    if (score === 2) return 'bg-orange-100';
    return 'bg-red-100';
}

/**
 * Get quality color based on decision level
 */
export function getQualityColor(level: string): string {
    if (!level || typeof level !== 'string') return 'bg-score-1';

    // Closeout rubric decisions
    if (level.includes('ดีเยี่ยม')) return 'bg-score-4';
    if (level.includes('เงื่อนไข')) return 'bg-score-3';
    if (level.includes('รับทราบ')) return 'bg-score-2';
    if (level.includes('ไม่เห็นชอบ')) return 'bg-score-1';

    // Military rubric decisions
    if (level.includes('เห็นชอบ') && !level.includes('เงื่อนไข')) return 'bg-score-4';
    if (level.includes('เงื่อนไข')) return 'bg-score-3';
    if (level.includes('ปรับปรุง') || level.includes('ไม่เห็นชอบ')) return 'bg-score-1';

    // Academic rubric decisions
    if (level.includes('Excellent') || level.includes('พร้อมตีพิมพ์')) return 'bg-score-4';
    if (level.includes('Very Good') || level.includes('Minor')) return 'bg-score-3';
    if (level.includes('Good') || level.includes('Major')) return 'bg-score-2';
    return 'bg-score-1';
}

/**
 * Get quality color hex based on decision level
 */
export function getQualityColorHex(level: string): string {
    if (!level || typeof level !== 'string') return '#E57373';

    // Closeout rubric decisions
    if (level.includes('ดีเยี่ยม')) return '#81C784';
    if (level.includes('เงื่อนไข')) return '#FFD54F';
    if (level.includes('รับทราบ')) return '#3b82f6';
    if (level.includes('ไม่เห็นชอบ')) return '#E57373';

    // Military rubric decisions
    if (level.includes('เห็นชอบ') && !level.includes('เงื่อนไข')) return '#81C784';
    if (level.includes('เงื่อนไข')) return '#FFD54F';
    if (level.includes('ปรับปรุง') || level.includes('ไม่เห็นชอบ')) return '#E57373';

    // Academic rubric decisions
    if (level.includes('Excellent') || level.includes('พร้อมตีพิมพ์')) return '#81C784';
    if (level.includes('Very Good') || level.includes('Minor')) return '#FFD54F';
    if (level.includes('Good') || level.includes('Major')) return '#FFB74D';
    return '#E57373';
}

export function getPriorityColor(priority: string): string {
    const colors: Record<string, string> = {
        'critical': 'bg-red-500',
        'high': 'bg-orange-500',
        'enhancement': 'bg-green-500'
    };
    return colors[priority] || 'bg-gray-500';
}

export function getPriorityLabel(priority: string): string {
    const labels: Record<string, string> = {
        'critical': 'เร่งด่วนมาก',
        'high': 'สำคัญ',
        'enhancement': 'ข้อเสนอแนะ'
    };
    return labels[priority] || priority;
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function cleanHtmlResponse(html: string): string {
    if (!html || typeof html !== 'string') return '';
    return html
        .trim()
        .replace(/^```html\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '');
}
