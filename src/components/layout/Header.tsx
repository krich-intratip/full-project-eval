'use client';

import { APP_VERSION, APP_LAST_UPDATE, APP_NAME } from '@/types/app';

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-[#E3F2FD] to-[#F3E5F5] p-8 md:p-10 rounded-2xl text-center mb-8 shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1565C0] mb-2">
                📋 {APP_NAME}
            </h1>
            <p className="text-lg text-gray-600">
                ประเมินผลสัมฤทธิ์โครงการวิจัยโดยผู้ทรงคุณวุฒิ 3 ท่าน
            </p>
            <p className="text-sm text-gray-500 mt-3">
                {APP_VERSION} | อัปเดตล่าสุด: {APP_LAST_UPDATE}
            </p>
        </header>
    );
}
