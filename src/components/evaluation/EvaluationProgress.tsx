'use client';

import { Card, ProgressSteps } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { useRubric } from '@/context/RubricContext';

export default function EvaluationProgress() {
    const { state } = useApp();
    const { rubric } = useRubric();

    if (!state.isEvaluating && state.currentStep === 0) {
        return null;
    }

    // Dynamic steps based on rubric experts
    const steps = [
        { label: 'วิเคราะห์เอกสาร' },
        ...rubric.experts.map((_, idx) => ({ label: `Expert ${idx + 1}` })),
        { label: 'สรุปผล' }
    ];

    // Dynamic messages based on rubric experts
    const getStepMessage = (step: number): string => {
        if (step === 1) {
            const isCloseout = rubric.metadata.context === 'military-closeout';
            return isCloseout
                ? 'กำลังวิเคราะห์โครงสร้างเอกสารปิดโครงการ...'
                : 'กำลังวิเคราะห์โครงสร้างเอกสาร...';
        }
        if (step === steps.length) {
            return 'กำลังสรุปผลการประเมิน...';
        }
        const expertIndex = step - 2;
        if (expertIndex >= 0 && expertIndex < rubric.experts.length) {
            const expert = rubric.experts[expertIndex];
            return `กำลังประเมินโดย ${expert.name}...`;
        }
        return '';
    };

    return (
        <Card title="📊 ความคืบหน้าการประเมิน" icon="">
            <ProgressSteps currentStep={state.currentStep} steps={steps} />
            <p className="text-center text-gray-600">
                {getStepMessage(state.currentStep)}
            </p>
        </Card>
    );
}
