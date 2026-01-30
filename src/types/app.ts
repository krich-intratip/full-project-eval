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

export const APP_VERSION = 'v3.0.0';
export const APP_LAST_UPDATE = '30 มกราคม 2569';
export const APP_TITLE = 'ระบบประเมินโครงการวิจัยขั้นกลั่นกรอง';
export const APP_NAME = 'ระบบประเมินโครงการวิจัยขั้นกลั่นกรองโครงการ';
export const APP_SHORT_NAME = 'SAR';

