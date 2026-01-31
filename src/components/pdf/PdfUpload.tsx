'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { useApp } from '@/context/AppContext';
import { usePdfExtraction } from '@/hooks';
import { formatFileSize } from '@/lib/utils';
import { StatusMessage } from '@/components/ui';
import { MAX_FILE_SIZE } from '@/types';

interface SinglePdfUploadProps {
    title: string;
    description: string;
    icon: string;
    pdfInfo: { fileName: string; fileSize: number } | null;
    onExtract: (file: File) => Promise<unknown>;
    onClear: () => void;
    isExtracting: boolean;
    setIsExtracting: (value: boolean) => void;
    error: string | null;
    setError: (value: string | null) => void;
}

function SinglePdfUpload({
    title,
    description,
    icon,
    pdfInfo,
    onExtract,
    onClear,
    isExtracting,
    setIsExtracting,
    error,
    setError
}: SinglePdfUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            handleFile(file);
        } else {
            setError('กรุณาอัปโหลดไฟล์ PDF เท่านั้น');
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleFile = async (file: File) => {
        if (file.size > MAX_FILE_SIZE) {
            setError(`ไฟล์มีขนาดใหญ่เกินไป (${formatFileSize(file.size)}) กรุณาเลือกไฟล์ขนาดไม่เกิน 25 MB`);
            return;
        }

        setIsExtracting(true);
        setError(null);

        try {
            await onExtract(file);
            setIsExtracting(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ไม่สามารถอ่านไฟล์ PDF ได้');
            setIsExtracting(false);
        }
    };

    return (
        <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>{icon}</span>
                {title}
            </h3>
            <p className="text-gray-500 text-sm mb-3">{description}</p>

            {!pdfInfo ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                        border-2 border-dashed p-6 text-center rounded-xl cursor-pointer
                        transition-all duration-300 min-h-[140px] flex flex-col justify-center
                        ${isDragging
                            ? 'border-[#1976D2] bg-[#E3F2FD] scale-[1.02]'
                            : 'border-gray-300 hover:border-[#1976D2] hover:bg-[#E3F2FD]'
                        }
                    `}
                >
                    <div className="text-4xl mb-2">📁</div>
                    <p className="font-medium text-sm">คลิกหรือลากไฟล์ PDF มาวางที่นี่</p>
                    <p className="text-gray-400 text-xs mt-1">ขนาดไม่เกิน 25 MB</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            ) : (
                <div className="p-4 bg-[#E8F5E9] rounded-xl animate-fadeIn">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="font-medium text-sm truncate max-w-[200px]" title={pdfInfo.fileName}>
                                📎 {pdfInfo.fileName}
                            </p>
                            <p className="text-gray-600 text-xs mt-1">
                                📊 {formatFileSize(pdfInfo.fileSize)}
                            </p>
                        </div>
                        <button
                            onClick={onClear}
                            className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
                            title="ลบไฟล์"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {isExtracting && (
                <div className="mt-3 p-3 bg-[#E3F2FD] text-[#1565C0] rounded-lg flex items-center gap-2 text-sm">
                    <span className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                    <span>กำลังอ่านเนื้อหา PDF...</span>
                </div>
            )}

            <StatusMessage
                type="error"
                message={error || ''}
                show={!!error}
            />
        </div>
    );
}

export default function PdfUpload() {
    const { state } = useApp();
    const { extractProposalPdf, extractCompletePdf, clearProposalPdf, clearCompletePdf } = usePdfExtraction();

    const [isExtractingProposal, setIsExtractingProposal] = useState(false);
    const [isExtractingComplete, setIsExtractingComplete] = useState(false);
    const [proposalError, setProposalError] = useState<string | null>(null);
    const [completeError, setCompleteError] = useState<string | null>(null);

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Proposal PDF Upload */}
                <SinglePdfUpload
                    title="1. ไฟล์คำขอโครงการ"
                    description="ข้อเสนอโครงการที่ได้รับอนุมัติ"
                    icon="📋"
                    pdfInfo={state.proposalPdf}
                    onExtract={extractProposalPdf}
                    onClear={clearProposalPdf}
                    isExtracting={isExtractingProposal}
                    setIsExtracting={setIsExtractingProposal}
                    error={proposalError}
                    setError={setProposalError}
                />

                {/* Complete Project PDF Upload */}
                <SinglePdfUpload
                    title="2. ไฟล์โครงการฉบับสมบูรณ์"
                    description="รายงานผลการวิจัยพร้อมหลักฐานประกอบ"
                    icon="📚"
                    pdfInfo={state.completePdf}
                    onExtract={extractCompletePdf}
                    onClear={clearCompletePdf}
                    isExtracting={isExtractingComplete}
                    setIsExtracting={setIsExtractingComplete}
                    error={completeError}
                    setError={setCompleteError}
                />
            </div>

            {/* Status indicator */}
            {state.proposalPdf && state.completePdf && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
                    <span className="text-lg">✅</span>
                    <span>อัปโหลดไฟล์ครบทั้ง 2 ไฟล์แล้ว พร้อมสำหรับการประเมิน</span>
                </div>
            )}

            {(state.proposalPdf || state.completePdf) && !(state.proposalPdf && state.completePdf) && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm flex items-center gap-2">
                    <span className="text-lg">⚠️</span>
                    <span>
                        กรุณาอัปโหลดไฟล์ให้ครบทั้ง 2 ไฟล์
                        (ยังขาด: {!state.proposalPdf ? 'ไฟล์คำขอโครงการ' : 'ไฟล์โครงการฉบับสมบูรณ์'})
                    </span>
                </div>
            )}
        </div>
    );
}
