'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, AppAction, AppConfig, AIProvider } from '@/types';

const STORAGE_KEY = 'closeout_eval_config';

const initialState: AppState = {
    config: {
        provider: null,
        apiKey: null,
        model: null,
        customModel: null
    },
    // Legacy single PDF support
    pdfText: null,
    pdfFileName: null,
    pdfFileSize: null,
    // New: Two PDF files
    proposalPdf: null,
    completePdf: null,
    isEvaluating: false,
    currentStep: 0,
    evaluationResults: null
};

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'SET_PROVIDER':
            return {
                ...state,
                config: {
                    ...state.config,
                    provider: action.payload,
                    model: null,
                    customModel: null
                }
            };
        case 'SET_API_KEY':
            return {
                ...state,
                config: { ...state.config, apiKey: action.payload }
            };
        case 'SET_MODEL':
            return {
                ...state,
                config: { ...state.config, model: action.payload }
            };
        case 'SET_CUSTOM_MODEL':
            return {
                ...state,
                config: { ...state.config, customModel: action.payload }
            };
        case 'SET_PDF_TEXT':
            return {
                ...state,
                pdfText: action.payload.text,
                pdfFileName: action.payload.fileName,
                pdfFileSize: action.payload.fileSize
            };
        case 'CLEAR_PDF':
            return {
                ...state,
                pdfText: null,
                pdfFileName: null,
                pdfFileSize: null
            };
        // New: Two PDF files actions
        case 'SET_PROPOSAL_PDF':
            return {
                ...state,
                proposalPdf: action.payload,
                // Also set legacy fields for backward compatibility (combine both texts)
                pdfText: state.completePdf
                    ? `=== ไฟล์คำขอโครงการ ===\n${action.payload.text}\n\n=== ไฟล์โครงการฉบับสมบูรณ์ ===\n${state.completePdf.text}`
                    : action.payload.text,
                pdfFileName: action.payload.fileName,
                pdfFileSize: action.payload.fileSize
            };
        case 'CLEAR_PROPOSAL_PDF':
            return {
                ...state,
                proposalPdf: null,
                pdfText: state.completePdf ? state.completePdf.text : null,
                pdfFileName: state.completePdf ? state.completePdf.fileName : null,
                pdfFileSize: state.completePdf ? state.completePdf.fileSize : null
            };
        case 'SET_COMPLETE_PDF':
            return {
                ...state,
                completePdf: action.payload,
                // Update legacy fields with combined text
                pdfText: state.proposalPdf
                    ? `=== ไฟล์คำขอโครงการ ===\n${state.proposalPdf.text}\n\n=== ไฟล์โครงการฉบับสมบูรณ์ ===\n${action.payload.text}`
                    : action.payload.text,
                pdfFileName: state.proposalPdf ? `${state.proposalPdf.fileName}, ${action.payload.fileName}` : action.payload.fileName,
                pdfFileSize: state.proposalPdf ? state.proposalPdf.fileSize + action.payload.fileSize : action.payload.fileSize
            };
        case 'CLEAR_COMPLETE_PDF':
            return {
                ...state,
                completePdf: null,
                pdfText: state.proposalPdf ? state.proposalPdf.text : null,
                pdfFileName: state.proposalPdf ? state.proposalPdf.fileName : null,
                pdfFileSize: state.proposalPdf ? state.proposalPdf.fileSize : null
            };
        case 'SET_EVALUATING':
            return { ...state, isEvaluating: action.payload };
        case 'SET_CURRENT_STEP':
            return { ...state, currentStep: action.payload };
        case 'SET_EVALUATION_RESULTS':
            return { ...state, evaluationResults: action.payload };
        case 'LOAD_CONFIG':
            return { ...state, config: action.payload };
        case 'RESET':
            return { ...initialState };
        default:
            return state;
    }
}

interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
    getEffectiveModel: () => string | null;
    isReadyToEvaluate: () => boolean;
    saveConfig: () => void;
    getCombinedPdfText: () => string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Load saved config on mount
    useEffect(() => {
        try {
            const savedProvider = localStorage.getItem('closeout_eval_provider');
            if (savedProvider) {
                const provider = savedProvider as AIProvider;
                const apiKey = localStorage.getItem(`closeout_eval_apikey_${provider}`);
                const model = localStorage.getItem(`closeout_eval_model_${provider}`);
                const customModel = localStorage.getItem(`closeout_eval_custom_model_${provider}`);

                dispatch({
                    type: 'LOAD_CONFIG',
                    payload: {
                        provider,
                        apiKey,
                        model,
                        customModel
                    }
                });
            }
        } catch (error) {
            console.error('Error loading config:', error);
        }
    }, []);

    const saveConfig = () => {
        if (state.config.provider) {
            localStorage.setItem('closeout_eval_provider', state.config.provider);
            if (state.config.apiKey) {
                localStorage.setItem(`closeout_eval_apikey_${state.config.provider}`, state.config.apiKey);
            }
            if (state.config.model) {
                localStorage.setItem(`closeout_eval_model_${state.config.provider}`, state.config.model);
            }
            if (state.config.customModel) {
                localStorage.setItem(`closeout_eval_custom_model_${state.config.provider}`, state.config.customModel);
            } else {
                localStorage.removeItem(`closeout_eval_custom_model_${state.config.provider}`);
            }
        }
    };

    const getEffectiveModel = (): string | null => {
        return state.config.customModel || state.config.model;
    };

    const getCombinedPdfText = (): string | null => {
        if (state.proposalPdf && state.completePdf) {
            return `=== ไฟล์คำขอโครงการ ===\n${state.proposalPdf.text}\n\n=== ไฟล์โครงการฉบับสมบูรณ์ ===\n${state.completePdf.text}`;
        }
        if (state.proposalPdf) {
            return `=== ไฟล์คำขอโครงการ ===\n${state.proposalPdf.text}`;
        }
        if (state.completePdf) {
            return `=== ไฟล์โครงการฉบับสมบูรณ์ ===\n${state.completePdf.text}`;
        }
        return state.pdfText;
    };

    const isReadyToEvaluate = (): boolean => {
        const hasBothPdfs = !!(state.proposalPdf && state.completePdf);
        return !!(
            state.config.provider &&
            state.config.apiKey &&
            getEffectiveModel() &&
            hasBothPdfs
        );
    };

    return (
        <AppContext.Provider value={{ state, dispatch, getEffectiveModel, isReadyToEvaluate, saveConfig, getCombinedPdfText }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
