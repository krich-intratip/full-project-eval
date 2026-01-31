'use client';

import { APP_NAME } from '@/types/app';

export default function Footer() {
    return (
        <footer className="text-center py-8 px-6 mt-8 bg-white rounded-2xl shadow-md">
            <p className="text-gray-500 text-sm">
                จัดทำโดย {APP_NAME}
            </p>
            <p className="text-gray-400 text-xs mt-2">
                วันที่สร้าง: {new Date().toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </p>
            <p className="text-orange-600 text-xs mt-3">
                หมายเหตุ: การประเมินนี้เป็นการประเมินเบื้องต้นโดย AI ควรใช้ร่วมกับการพิจารณาของผู้ทรงคุณวุฒิ
            </p>
            <p className="text-[#1565C0] font-semibold mt-4">
                ระบบประเมินโครงการวิจัย(ขั้นปิดโครงการ) สวพ.ทบ.<br />
                โดย พล.ท.ดร.กริช อินทราทิพย์
            </p>
        </footer>
    );
}
