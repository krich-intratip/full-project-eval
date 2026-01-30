'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Rubric, RubricId } from '@/types/rubric';
import { getRubric, DEFAULT_RUBRIC_ID } from '@/config/rubrics';

interface RubricContextType {
    rubricId: RubricId;
    rubric: Rubric;
    setRubricId: (id: RubricId) => void;
}

const RubricContext = createContext<RubricContextType | undefined>(undefined);

interface RubricProviderProps {
    children: ReactNode;
    initialRubricId?: RubricId;
}

export function RubricProvider({ children, initialRubricId }: RubricProviderProps) {
    const [rubricId, setRubricIdState] = useState<RubricId>(initialRubricId || DEFAULT_RUBRIC_ID);
    const rubric = getRubric(rubricId);

    const setRubricId = (id: RubricId) => {
        setRubricIdState(id);
    };

    return (
        <RubricContext.Provider value={{ rubricId, rubric, setRubricId }}>
            {children}
        </RubricContext.Provider>
    );
}

export function useRubric() {
    const context = useContext(RubricContext);
    if (!context) {
        throw new Error('useRubric must be used within RubricProvider');
    }
    return context;
}
