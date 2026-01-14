// Evaluation Types

export interface Expert {
    id: 'expert1' | 'expert2' | 'expert3';
    name: string;
    title: string;
    avatar: string;
    experience: string;
    color: string;
    borderColor: string;
    focus: string;
    questions: string;
}

export const experts: Record<string, Expert> = {
    expert1: {
        id: 'expert1',
        name: 'ศ.ดร.สุรชัย วิธีการวิจัย',
        title: 'ผู้เชี่ยวชาญด้านระเบียบวิธีวิจัย',
        avatar: '👨‍🔬',
        experience: '25+ ปี, ผู้ทรงคุณวุฒิทางวิชาการ, Methodologist',
        color: '#BBDEFB',
        borderColor: '#1976D2',
        focus: 'Research design, Validity & Reliability, สถิติ, Replicability',
        questions: '"วิธีการเหมาะสมหรือไม่?", "มี validity เพียงพอหรือไม่?", "สามารถทำซ้ำได้หรือไม่?"'
    },
    expert2: {
        id: 'expert2',
        name: 'รศ.ดร.ปิยะนุช เนื้อหาลึกซึ้ง',
        title: 'ผู้เชี่ยวชาญด้านเนื้อหาและทฤษฎี',
        avatar: '👩‍💼',
        experience: '20+ ปี, Domain Expert, Theoretical Framework Specialist',
        color: '#C8E6C9',
        borderColor: '#388E3C',
        focus: 'วรรณกรรม, Research gap, ทฤษฎี, Discussion depth, Contribution',
        questions: '"มี research gap ชัดเจนหรือไม่?", "ทฤษฎีเหมาะสมหรือไม่?", "มีส่วนสนับสนุนวงการอย่างไร?"'
    },
    expert3: {
        id: 'expert3',
        name: 'ผศ.ดร.วิชิต การเขียนวิชาการ',
        title: 'ผู้เชี่ยวชาญด้านการเขียนและนำเสนอวิชาการ',
        avatar: '👨‍🏫',
        experience: '15+ ปี, Academic Writing Expert, Editor',
        color: '#D1C4E9',
        borderColor: '#7B1FA2',
        focus: 'Writing clarity, โครงสร้าง, การอ้างอิง, Grammar, Presentation quality',
        questions: '"เขียนชัดเจนหรือไม่?", "การอ้างอิงถูกต้องหรือไม่?", "โครงสร้างเป็นระบบหรือไม่?"'
    }
};

export interface EvaluationCriteria {
    id: number;
    name: string;
    weight: number;
    maxScore: number;
}

export const evaluationCriteria: EvaluationCriteria[] = [
    { id: 1, name: 'ชื่อเรื่องและบทคัดย่อ', weight: 2, maxScore: 9 },
    { id: 2, name: 'บทนำและการทบทวนวรรณกรรม', weight: 3, maxScore: 13 },
    { id: 3, name: 'คำถามวิจัยและวัตถุประสงค์', weight: 3, maxScore: 13 },
    { id: 4, name: 'ระเบียบวิธีวิจัย', weight: 4, maxScore: 17 },
    { id: 5, name: 'ผลการวิจัยและการวิเคราะห์ข้อมูล', weight: 4, maxScore: 17 },
    { id: 6, name: 'การอภิปรายผล', weight: 3, maxScore: 13 },
    { id: 7, name: 'สรุปและข้อเสนอแนะ', weight: 2, maxScore: 9 },
    { id: 8, name: 'การอ้างอิงและรูปแบบการเขียน', weight: 2, maxScore: 9 }
];

export interface ScoreItem {
    criteriaId: number;
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
    publicationReadiness: 'excellent' | 'very_good' | 'good' | 'fair' | 'poor';
    overallComment: string;
    scores: ScoreItem[];
    strengths: string[];
    weaknesses: string[];
    recommendations: Recommendation[];
    summaryQuote: string;
}

export interface CriteriaAverage {
    criteriaId: number;
    name: string;
    averageScore: number;
    weightedScore: number;
    maxWeightedScore: number;
    weight: number;
}

export interface EvaluationSummary {
    totalScore: number;
    maxPossibleScore: number;
    percentage: number;
    qualityLevel: string;
    criteriaAverages: CriteriaAverage[];
}

export interface EvaluationResults {
    projectName: string;
    organizationName: string;
    evaluationDate: string;
    experts: {
        expert1?: ExpertEvaluation;
        expert2?: ExpertEvaluation;
        expert3?: ExpertEvaluation;
    };
    summary: EvaluationSummary | null;
}

export type EvaluationStep = 1 | 2 | 3 | 4 | 5;
export type StepStatus = 'pending' | 'active' | 'completed';
