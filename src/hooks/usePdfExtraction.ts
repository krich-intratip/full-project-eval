'use client';

import { useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { PdfFileInfo } from '@/types';

declare global {
    interface Window {
        pdfjsLib: {
            getDocument: (data: { data: ArrayBuffer }) => { promise: Promise<PDFDocument> };
            GlobalWorkerOptions: { workerSrc: string };
        };
    }
}

interface PDFDocument {
    numPages: number;
    getPage: (pageNum: number) => Promise<PDFPage>;
}

interface PDFPage {
    getTextContent: () => Promise<{ items: Array<{ str: string }> }>;
}

export type PdfType = 'proposal' | 'complete' | 'legacy';

export function usePdfExtraction() {
    const { dispatch } = useApp();

    const extractTextFromFile = useCallback(async (file: File): Promise<PdfFileInfo> => {
        // Load PDF.js from CDN if not loaded
        if (!window.pdfjsLib) {
            await loadPdfJs();
        }

        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += `--- หน้า ${i} ---\n${pageText}\n\n`;
        }

        return {
            text: fullText,
            fileName: file.name,
            fileSize: file.size
        };
    }, []);

    // Legacy single PDF extraction
    const extractText = useCallback(async (file: File): Promise<string> => {
        const pdfInfo = await extractTextFromFile(file);

        dispatch({
            type: 'SET_PDF_TEXT',
            payload: pdfInfo
        });

        return pdfInfo.text;
    }, [dispatch, extractTextFromFile]);

    // New: Extract and store proposal PDF
    const extractProposalPdf = useCallback(async (file: File): Promise<PdfFileInfo> => {
        const pdfInfo = await extractTextFromFile(file);

        dispatch({
            type: 'SET_PROPOSAL_PDF',
            payload: pdfInfo
        });

        return pdfInfo;
    }, [dispatch, extractTextFromFile]);

    // New: Extract and store complete project PDF
    const extractCompletePdf = useCallback(async (file: File): Promise<PdfFileInfo> => {
        const pdfInfo = await extractTextFromFile(file);

        dispatch({
            type: 'SET_COMPLETE_PDF',
            payload: pdfInfo
        });

        return pdfInfo;
    }, [dispatch, extractTextFromFile]);

    const clearPdf = useCallback(() => {
        dispatch({ type: 'CLEAR_PDF' });
    }, [dispatch]);

    const clearProposalPdf = useCallback(() => {
        dispatch({ type: 'CLEAR_PROPOSAL_PDF' });
    }, [dispatch]);

    const clearCompletePdf = useCallback(() => {
        dispatch({ type: 'CLEAR_COMPLETE_PDF' });
    }, [dispatch]);

    return {
        extractText,
        extractProposalPdf,
        extractCompletePdf,
        clearPdf,
        clearProposalPdf,
        clearCompletePdf,
        extractTextFromFile
    };
}

async function loadPdfJs(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (window.pdfjsLib) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load PDF.js'));
        document.head.appendChild(script);
    });
}
