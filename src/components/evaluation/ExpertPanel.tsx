'use client';

import { useRubric } from '@/context/RubricContext';

export default function ExpertPanel() {
    const { rubric } = useRubric();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {rubric.experts.map(expert => (
                <div
                    key={expert.id}
                    className="p-4 rounded-xl border-2"
                    style={{
                        backgroundColor: expert.color,
                        borderColor: expert.borderColor
                    }}
                >
                    <p className="font-semibold">
                        {expert.avatar} {expert.name}
                    </p>
                    <p className="text-sm text-gray-600">{expert.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{expert.focus}</p>
                </div>
            ))}
        </div>
    );
}
