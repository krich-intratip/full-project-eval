'use client';

import { useState, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { useRubric } from '@/context/RubricContext';
import { callAI, parseAIResponse } from '@/lib/ai';
import { generateExpertPrompt, generateSummaryPrompt } from '@/lib/prompts';
import { calculateSummary } from '@/lib/evaluation';
import { ExpertEvaluation, EvaluationResults } from '@/types/evaluation';
import { formatThaiDate, sleep, cleanHtmlResponse } from '@/lib/utils';

export function useEvaluation() {
    const { state, dispatch, getEffectiveModel } = useApp();
    const { rubric, rubricId } = useRubric();
    const [error, setError] = useState<string | null>(null);

    const runEvaluation = useCallback(async () => {
        const model = getEffectiveModel();
        if (!state.config.provider || !state.config.apiKey || !model || !state.pdfText) {
            setError('กรุณาตั้งค่าให้ครบถ้วนก่อนเริ่มประเมิน');
            return;
        }

        dispatch({ type: 'SET_EVALUATING', payload: true });
        dispatch({ type: 'SET_CURRENT_STEP', payload: 1 });
        setError(null);

        const results: EvaluationResults = {
            projectName: '',
            organizationName: '',
            evaluationDate: formatThaiDate(),
            rubricId: rubricId,
            experts: {},
            summary: null
        };

        try {
            // Step 1: Analyze document
            dispatch({ type: 'SET_CURRENT_STEP', payload: 1 });
            await sleep(1500);

            // Get experts from rubric with safe access
            if (!rubric.experts || rubric.experts.length < 3) {
                throw new Error('เกณฑ์การประเมินต้องมีผู้เชี่ยวชาญอย่างน้อย 3 ท่าน');
            }
            const [expert1, expert2, expert3] = rubric.experts;

            // Step 2: Expert 1 evaluation
            dispatch({ type: 'SET_CURRENT_STEP', payload: 2 });
            const expert1Prompt = generateExpertPrompt(rubric, expert1, state.pdfText);
            const expert1Response = await callAI(state.config.provider, expert1Prompt, state.config.apiKey, model);
            const expert1Data = parseAIResponse<ExpertEvaluation>(expert1Response);
            results.experts.expert1 = expert1Data;
            results.projectName = expert1Data.paperTitle || 'ไม่ระบุชื่อเรื่อง';
            results.organizationName = expert1Data.authors || 'ไม่ระบุผู้แต่ง';

            // Step 3: Expert 2 evaluation
            dispatch({ type: 'SET_CURRENT_STEP', payload: 3 });
            const expert2Prompt = generateExpertPrompt(rubric, expert2, state.pdfText);
            const expert2Response = await callAI(state.config.provider, expert2Prompt, state.config.apiKey, model);
            results.experts.expert2 = parseAIResponse<ExpertEvaluation>(expert2Response);

            // Step 4: Expert 3 evaluation
            dispatch({ type: 'SET_CURRENT_STEP', payload: 4 });
            const expert3Prompt = generateExpertPrompt(rubric, expert3, state.pdfText);
            const expert3Response = await callAI(state.config.provider, expert3Prompt, state.config.apiKey, model);
            results.experts.expert3 = parseAIResponse<ExpertEvaluation>(expert3Response);

            // Step 5: Calculate summary using rubric
            dispatch({ type: 'SET_CURRENT_STEP', payload: 5 });
            results.summary = calculateSummary(rubric, results.experts);
            await sleep(1000);

            dispatch({ type: 'SET_EVALUATION_RESULTS', payload: results });
            dispatch({ type: 'SET_EVALUATING', payload: false });

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ';
            setError(errorMessage);
            dispatch({ type: 'SET_EVALUATING', payload: false });
        }
    }, [state.config, state.pdfText, dispatch, getEffectiveModel, rubric, rubricId]);

    const summarizePdf = useCallback(async (): Promise<string | null> => {
        const model = getEffectiveModel();
        if (!state.config.provider || !state.config.apiKey || !model || !state.pdfText) {
            setError('กรุณาตั้งค่า AI Provider และอัปโหลดไฟล์ก่อน');
            return null;
        }

        try {
            const prompt = generateSummaryPrompt(rubric, state.pdfText);
            const response = await callAI(state.config.provider, prompt, state.config.apiKey, model);
            return cleanHtmlResponse(response);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'ไม่สามารถสรุปเนื้อหาได้';
            setError(errorMessage);
            return null;
        }
    }, [state.config, state.pdfText, getEffectiveModel, rubric]);

    const testConnection = useCallback(async (): Promise<{ success: boolean; message: string }> => {
        const model = getEffectiveModel();
        if (!state.config.provider || !state.config.apiKey || !model) {
            return {
                success: false,
                message: 'กรุณาเลือก Provider, กรอก API Key และเลือก/ระบุ Model ให้ครบ'
            };
        }

        try {
            const result = await callAI(
                state.config.provider,
                'สวัสดี ตอบสั้นๆ ว่า "เชื่อมต่อสำเร็จ"',
                state.config.apiKey,
                model
            );
            return {
                success: true,
                message: `เชื่อมต่อสำเร็จ!\nModel: ${model}\nตอบกลับ: ${result.substring(0, 100)}`
            };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'เกิดข้อผิดพลาด';
            return {
                success: false,
                message: `การเชื่อมต่อล้มเหลว: ${errorMessage}`
            };
        }
    }, [state.config, getEffectiveModel]);

    return {
        runEvaluation,
        summarizePdf,
        testConnection,
        error,
        isEvaluating: state.isEvaluating,
        currentStep: state.currentStep,
        results: state.evaluationResults,
        rubric
    };
}
