// App State Types

import { AIProvider } from './ai';
import { EvaluationResults } from './evaluation';

export interface AppConfig {
    provider: AIProvider | null;
    apiKey: string | null;
    model: string | null;
    customModel: string | null;
}

export interface AppState {
    config: AppConfig;
    pdfText: string | null;
    pdfFileName: string | null;
    pdfFileSize: number | null;
    isEvaluating: boolean;
    currentStep: number;
    evaluationResults: EvaluationResults | null;
}

export type AppAction =
    | { type: 'SET_PROVIDER'; payload: AIProvider | null }
    | { type: 'SET_API_KEY'; payload: string | null }
    | { type: 'SET_MODEL'; payload: string | null }
    | { type: 'SET_CUSTOM_MODEL'; payload: string | null }
    | { type: 'SET_PDF_TEXT'; payload: { text: string; fileName: string; fileSize: number } }
    | { type: 'CLEAR_PDF' }
    | { type: 'SET_EVALUATING'; payload: boolean }
    | { type: 'SET_CURRENT_STEP'; payload: number }
    | { type: 'SET_EVALUATION_RESULTS'; payload: EvaluationResults | null }
    | { type: 'LOAD_CONFIG'; payload: AppConfig }
    | { type: 'RESET' };

export const APP_VERSION = 'v2.0.1';
export const APP_LAST_UPDATE = '14 มกราคม 2569';
export const APP_TITLE = 'SAR for Academic Research';
export const APP_NAME = 'SAR for Academic Research Paper';

