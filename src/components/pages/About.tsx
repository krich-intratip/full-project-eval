'use client';

import { useState } from 'react';
import { APP_VERSION, APP_LAST_UPDATE, APP_NAME } from '@/types/app';
import { useRubric } from '@/context/RubricContext';
import { Card, QRCodeModal } from '@/components/ui';

const DEVELOPER_LINK = 'https://portfolio-two-sepia-33.vercel.app/';

type AboutTab = 'functional' | 'non-functional' | 'timeline';

// Version history
const VERSION_HISTORY = [
    {
        version: 'v1.2.0',
        date: '7 กุมภาพันธ์ 2569',
        changes: [
            'ปรับปรุงหน้าคู่มือเพิ่มวิธีสมัคร API ทุก Provider',
            'เพิ่ม DeepSeek และ Kimi เป็น AI Provider หลัก',
            'แก้ไข Bugs: Division by zero, Null access, Array bounds',
            'ปรับปรุงความเสถียรของระบบโดยรวม'
        ]
    },
    {
        version: 'v1.1.0',
        date: '31 มกราคม 2569',
        changes: [
            'ปรับปรุงเกณฑ์ประเมินให้เข้มงวดและละเอียดมากขึ้น',
            'เพิ่มชุดหลักฐานประกอบรายงานปิดโครงการ 7 ชุด',
            'อัพเดท Dashboard ใหม่แสดงผลแบบ Dark Theme',
            'อัพเดทรายชื่อโมเดล OpenRouter รองรับภาษาไทย',
            'แก้ไข Bugs และปรับปรุงความเสถียรของระบบ'
        ]
    },
    {
        version: 'v1.0.0',
        date: '29 มกราคม 2569',
        changes: [
            'เปิดตัวระบบประเมินโครงการวิจัย(ขั้นปิดโครงการ) สวพ.ทบ.',
            'รองรับอัปโหลด 2 ไฟล์: คำขอโครงการ + โครงการฉบับสมบูรณ์',
            'เกณฑ์ประเมินปิดโครงการ 4 หมวด (100 คะแนน)',
            'ผู้ทรงคุณวุฒิ AI 3 ท่านสำหรับประเมินผลสัมฤทธิ์',
            '4 ระดับมติปิดโครงการ'
        ]
    }
];

export default function About() {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<AboutTab>('functional');
    const { rubric } = useRubric();

    const tabs = [
        { id: 'functional' as AboutTab, label: 'Functional', icon: '⚡' },
        { id: 'non-functional' as AboutTab, label: 'Non-Functional', icon: '🛡️' },
        { id: 'timeline' as AboutTab, label: 'ประวัติการพัฒนา', icon: '📅' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#F3E5F5] to-[#E3F2FD] p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#7B1FA2] mb-4">
                    ℹ️ เกี่ยวกับระบบ
                </h2>
                <p className="text-gray-600">
                    {APP_NAME}
                </p>
            </div>

            {/* Sub-tabs */}
            <div className="flex justify-center gap-2 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-5 py-3 rounded-lg font-medium transition-all ${
                            activeTab === tab.id
                                ? 'bg-[#7B1FA2] text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Functional Tab */}
            {activeTab === 'functional' && (
                <>
                    <Card title="คุณสมบัติหลักของระบบ (Functional Requirements)" icon="⚡">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gradient-to-r from-[#BBDEFB] to-white rounded-lg">
                                    <div className="text-2xl mb-2">📄</div>
                                    <h4 className="font-semibold mb-1">อัปโหลด 2 ไฟล์ PDF</h4>
                                    <p className="text-sm text-gray-600">
                                        รองรับไฟล์คำขอโครงการและโครงการฉบับสมบูรณ์ ขนาดไม่เกิน 25MB ต่อไฟล์
                                    </p>
                                </div>
                                <div className="p-4 bg-gradient-to-r from-[#C8E6C9] to-white rounded-lg">
                                    <div className="text-2xl mb-2">🤖</div>
                                    <h4 className="font-semibold mb-1">AI ผู้ทรงคุณวุฒิ 3 ท่าน</h4>
                                    <p className="text-sm text-gray-600">
                                        {rubric.experts.map(e => e.name).join(', ')}
                                    </p>
                                </div>
                                <div className="p-4 bg-gradient-to-r from-[#D1C4E9] to-white rounded-lg">
                                    <div className="text-2xl mb-2">📊</div>
                                    <h4 className="font-semibold mb-1">เกณฑ์ประเมิน {rubric.categories.length} หมวด</h4>
                                    <p className="text-sm text-gray-600">
                                        {rubric.categories.map(c => c.name).join(', ')}
                                    </p>
                                </div>
                                <div className="p-4 bg-gradient-to-r from-[#FFE0B2] to-white rounded-lg">
                                    <div className="text-2xl mb-2">📋</div>
                                    <h4 className="font-semibold mb-1">4 ระดับมติปิดโครงการ</h4>
                                    <p className="text-sm text-gray-600">
                                        {rubric.decisionLevels.map(d => d.label).join(', ')}
                                    </p>
                                </div>
                                <div className="p-4 bg-gradient-to-r from-[#FFCDD2] to-white rounded-lg">
                                    <div className="text-2xl mb-2">💾</div>
                                    <h4 className="font-semibold mb-1">บันทึกรายงาน HTML</h4>
                                    <p className="text-sm text-gray-600">
                                        ดาวน์โหลดผลประเมินเป็นไฟล์ HTML พร้อมกราฟ
                                    </p>
                                </div>
                                <div className="p-4 bg-gradient-to-r from-[#B2DFDB] to-white rounded-lg">
                                    <div className="text-2xl mb-2">📈</div>
                                    <h4 className="font-semibold mb-1">Dashboard</h4>
                                    <p className="text-sm text-gray-600">
                                        แสดงผลประเมินล่าสุดพร้อมคำแนะนำสำคัญ
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="รองรับ AI Provider" icon="🤖">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border rounded-lg text-center">
                                <div className="text-3xl mb-2">✨</div>
                                <h4 className="font-semibold">Google Gemini</h4>
                                <p className="text-sm text-green-600">ฟรี (แนะนำ)</p>
                            </div>
                            <div className="p-4 border rounded-lg text-center">
                                <div className="text-3xl mb-2">🧠</div>
                                <h4 className="font-semibold">OpenAI</h4>
                                <p className="text-sm text-gray-500">GPT-4, GPT-3.5</p>
                            </div>
                            <div className="p-4 border rounded-lg text-center">
                                <div className="text-3xl mb-2">🔀</div>
                                <h4 className="font-semibold">OpenRouter</h4>
                                <p className="text-sm text-gray-500">หลาย Model</p>
                            </div>
                        </div>
                    </Card>
                </>
            )}

            {/* Non-Functional Tab */}
            {activeTab === 'non-functional' && (
                <>
                    <Card title="คุณสมบัติที่ไม่ใช่ฟังก์ชัน (Non-Functional Requirements)" icon="🛡️">
                        <div className="space-y-4">
                            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                                <h4 className="font-semibold text-green-800 mb-2">🔒 ความปลอดภัย</h4>
                                <ul className="text-sm text-green-700 space-y-1">
                                    <li>• API Key เก็บใน Browser Local Storage เท่านั้น</li>
                                    <li>• ไม่ส่งข้อมูลไปเก็บที่ Server กลาง</li>
                                    <li>• การเรียก AI ทำโดยตรงจาก Browser</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                <h4 className="font-semibold text-blue-800 mb-2">⚡ ประสิทธิภาพ</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• ประมวลผล PDF ด้วย pdf.js</li>
                                    <li>• ประเมินเสร็จภายใน 1-2 นาที</li>
                                    <li>• รองรับไฟล์ PDF สูงสุด 25MB ต่อไฟล์</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                                <h4 className="font-semibold text-purple-800 mb-2">📱 การใช้งาน</h4>
                                <ul className="text-sm text-purple-700 space-y-1">
                                    <li>• Responsive Design รองรับทุกหน้าจอ</li>
                                    <li>• ใช้งานง่าย ไม่ต้องลงทะเบียน</li>
                                    <li>• รองรับภาษาไทยเต็มรูปแบบ</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                                <h4 className="font-semibold text-orange-800 mb-2">🔧 การบำรุงรักษา</h4>
                                <ul className="text-sm text-orange-700 space-y-1">
                                    <li>• Flexible Rubric System รองรับเกณฑ์ใหม่ได้ง่าย</li>
                                    <li>• Modular Architecture แยก components ชัดเจน</li>
                                    <li>• TypeScript สำหรับ Type Safety</li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <Card title="เทคโนโลยีที่ใช้" icon="🔧">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="p-3 bg-black text-white rounded-lg text-center">
                                <div className="font-bold">Next.js 16</div>
                                <div className="text-xs opacity-75">App Router</div>
                            </div>
                            <div className="p-3 bg-[#61DAFB] text-black rounded-lg text-center">
                                <div className="font-bold">React 19</div>
                                <div className="text-xs opacity-75">Hooks</div>
                            </div>
                            <div className="p-3 bg-[#3178C6] text-white rounded-lg text-center">
                                <div className="font-bold">TypeScript</div>
                                <div className="text-xs opacity-75">Type Safety</div>
                            </div>
                            <div className="p-3 bg-[#06B6D4] text-white rounded-lg text-center">
                                <div className="font-bold">Tailwind</div>
                                <div className="text-xs opacity-75">CSS</div>
                            </div>
                        </div>
                    </Card>
                </>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
                <Card title="ประวัติการพัฒนาระบบ (Version History)" icon="📅">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1565C0] to-[#7B1FA2]" />

                        <div className="space-y-6">
                            {VERSION_HISTORY.map((release, index) => (
                                <div key={release.version} className="relative pl-14">
                                    {/* Timeline dot */}
                                    <div className={`absolute left-4 w-5 h-5 rounded-full border-4 border-white shadow-md ${
                                        index === 0 ? 'bg-[#1565C0]' : 'bg-[#7B1FA2]'
                                    }`} />

                                    <div className={`p-4 rounded-lg ${
                                        index === 0 ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                                    }`}>
                                        <div className="flex flex-wrap justify-between items-center mb-2">
                                            <span className={`font-bold text-lg ${
                                                index === 0 ? 'text-[#1565C0]' : 'text-gray-700'
                                            }`}>
                                                {release.version}
                                                {index === 0 && (
                                                    <span className="ml-2 px-2 py-1 bg-[#1565C0] text-white text-xs rounded-full">
                                                        Latest
                                                    </span>
                                                )}
                                            </span>
                                            <span className="text-sm text-gray-500">{release.date}</span>
                                        </div>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            {release.changes.map((change, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-green-500">✓</span>
                                                    {change}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            )}

            {/* Developer Info - Always visible */}
            <Card title="ผู้พัฒนา" icon="👨‍💻">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-[#1565C0] to-[#7B1FA2] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-4xl">👨‍🔬</span>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            <a
                                href={DEVELOPER_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#1565C0] hover:text-[#7B1FA2] hover:underline transition-colors"
                            >
                                พล.ท.ดร.กริช อินทราทิพย์
                            </a>
                        </h3>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                            <span>เวอร์ชัน: <strong className="text-[#1565C0]">{APP_VERSION}</strong></span>
                            <span>อัปเดต: <strong className="text-[#388E3C]">{APP_LAST_UPDATE}</strong></span>
                        </div>
                    </div>
                    <div className="flex-grow" />
                    <button
                        onClick={() => setIsQRModalOpen(true)}
                        className="w-24 h-24 rounded-xl overflow-hidden shadow-md border-2 border-white bg-white p-1 cursor-pointer hover:scale-105 transition-transform flex-shrink-0"
                        title="สนับสนุนผู้พัฒนา"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/donation-qr.jpg"
                            alt="QR Code สำหรับบริจาค"
                            className="w-full h-full object-contain rounded-lg"
                        />
                    </button>
                </div>
            </Card>

            {/* Disclaimer */}
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <p className="text-sm text-orange-700">
                    <strong>⚠️ หมายเหตุ:</strong> ระบบนี้เป็นเครื่องมือช่วยประเมินผลสัมฤทธิ์โครงการวิจัยเบื้องต้นโดย AI
                    ผลการประเมินควรใช้ประกอบการพิจารณาร่วมกับการพิจารณาจากผู้ทรงคุณวุฒิ
                </p>
            </div>

            {/* QR Code Modal */}
            <QRCodeModal
                isOpen={isQRModalOpen}
                onClose={() => setIsQRModalOpen(false)}
                imageSrc="/donation-qr.jpg"
                imageAlt="QR Code สำหรับบริจาค"
                downloadFileName="donation-qr-closeout-eval.jpg"
            />
        </div>
    );
}
