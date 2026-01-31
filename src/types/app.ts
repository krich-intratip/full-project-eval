// App State Types

import { AIProvider } from './ai';
import { EvaluationResults } from './evaluation';

export interface AppConfig {
    provider: AIProvider | null;
    apiKey: string | null;
    model: string | null;
    customModel: string | null;
}

// PDF File info structure for each file
export interface PdfFileInfo {
    text: string;
    fileName: string;
    fileSize: number;
}

export interface AppState {
    config: AppConfig;
    // Legacy single PDF support (for backward compatibility)
    pdfText: string | null;
    pdfFileName: string | null;
    pdfFileSize: number | null;
    // New: Two PDF files support
    proposalPdf: PdfFileInfo | null;      // ไฟล์คำขอโครงการ
    completePdf: PdfFileInfo | null;       // ไฟล์โครงการฉบับสมบูรณ์
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
    // New actions for two PDF files
    | { type: 'SET_PROPOSAL_PDF'; payload: PdfFileInfo }
    | { type: 'CLEAR_PROPOSAL_PDF' }
    | { type: 'SET_COMPLETE_PDF'; payload: PdfFileInfo }
    | { type: 'CLEAR_COMPLETE_PDF' }
    | { type: 'SET_EVALUATING'; payload: boolean }
    | { type: 'SET_CURRENT_STEP'; payload: number }
    | { type: 'SET_EVALUATION_RESULTS'; payload: EvaluationResults | null }
    | { type: 'LOAD_CONFIG'; payload: AppConfig }
    | { type: 'RESET' };

export const APP_VERSION = 'v1.1.0';
export const APP_LAST_UPDATE = '31 มกราคม 2569';
export const APP_TITLE = 'ระบบประเมินโครงการวิจัย(ขั้นปิดโครงการ) สวพ.ทบ.';
export const APP_NAME = 'ระบบประเมินโครงการวิจัย(ขั้นปิดโครงการ)';
export const APP_SHORT_NAME = 'Closeout Eval';

// Maximum file size in bytes (25 MB)
export const MAX_FILE_SIZE = 25 * 1024 * 1024;

