'use client';

import { useState } from 'react';
import { APP_VERSION, APP_LAST_UPDATE, APP_NAME } from '@/types/app';
import { Card, QRCodeModal } from '@/components/ui';

const DEVELOPER_LINK = 'https://portfolio-two-sepia-33.vercel.app/';

export default function About() {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#F3E5F5] to-[#E3F2FD] p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#7B1FA2] mb-4">
                    ℹ️ เกี่ยวกับโปรแกรม
                </h2>
                <p className="text-gray-600">
                    ข้อมูลเกี่ยวกับระบบ {APP_NAME}
                </p>
            </div>

            {/* Program Description */}
            <Card title="วัตถุประสงค์ของโปรแกรม" icon="🎯">
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                        ระบบ <strong>SAR for Academic Research Paper</strong> (Self-Assessment Report)
                        เป็นเครื่องมือที่พัฒนาขึ้นเพื่อทดสอบระบบ SAR ที่ใช้ปัญญาประดิษฐ์ (AI)
                        เป็นผู้เชี่ยวชาญช่วยในการประเมินคุณภาพงานวิจัยทางวิชาการ
                    </p>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <h4 className="font-semibold text-blue-800 mb-2">🎓 กลุ่มเป้าหมาย</h4>
                        <p className="text-blue-700">
                            ระบบนี้มุ่งเน้นการนำไปใช้ในการศึกษาระดับอุดมศึกษาเป็นหลัก
                            เพื่อช่วยอาจารย์และนักศึกษาในการประเมินและพัฒนาคุณภาพงานวิจัย
                        </p>
                    </div>
                </div>
            </Card>

            {/* Features */}
            <Card title="คุณสมบัติของระบบ" icon="✨">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-[#BBDEFB] to-white rounded-lg">
                        <div className="text-2xl mb-2">👨‍🔬</div>
                        <h4 className="font-semibold mb-1">ผู้เชี่ยวชาญ AI 3 ท่าน</h4>
                        <p className="text-sm text-gray-600">
                            ประเมินโดยผู้เชี่ยวชาญด้านระเบียบวิธีวิจัย, เนื้อหาและทฤษฎี, และการเขียนวิชาการ
                        </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#C8E6C9] to-white rounded-lg">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold mb-1">เกณฑ์การประเมิน 8 หัวข้อ</h4>
                        <p className="text-sm text-gray-600">
                            ครอบคลุมตั้งแต่ชื่อเรื่อง บทคัดย่อ จนถึงการอ้างอิงและรูปแบบการเขียน
                        </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#D1C4E9] to-white rounded-lg">
                        <div className="text-2xl mb-2">💡</div>
                        <h4 className="font-semibold mb-1">คำแนะนำและ Roadmap</h4>
                        <p className="text-sm text-gray-600">
                            ให้คำแนะนำที่เป็นรูปธรรมและแผนการพัฒนางานวิจัย
                        </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#FFE0B2] to-white rounded-lg">
                        <div className="text-2xl mb-2">🤖</div>
                        <h4 className="font-semibold mb-1">รองรับหลาย AI Provider</h4>
                        <p className="text-sm text-gray-600">
                            Google Gemini (ฟรี), OpenAI, และ OpenRouter
                        </p>
                    </div>
                </div>
            </Card>

            {/* Technology */}
            <Card title="เทคโนโลยี" icon="🔧">
                <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
                        Next.js 16
                    </span>
                    <span className="px-4 py-2 bg-[#61DAFB] text-black rounded-full text-sm font-medium">
                        React 19
                    </span>
                    <span className="px-4 py-2 bg-[#3178C6] text-white rounded-full text-sm font-medium">
                        TypeScript
                    </span>
                    <span className="px-4 py-2 bg-[#06B6D4] text-white rounded-full text-sm font-medium">
                        Tailwind CSS
                    </span>
                </div>
            </Card>

            {/* Developer Info */}
            <Card title="ผู้พัฒนา" icon="👨‍💻">
                <div className="text-center py-4">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-[#1565C0] to-[#7B1FA2] rounded-full flex items-center justify-center">
                        <span className="text-4xl">👨‍🔬</span>
                    </div>
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
                </div>
            </Card>

            {/* Donation Support */}
            <Card title="สนับสนุนผู้พัฒนา" icon="☕">
                <div className="text-center py-4">
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        สนับสนุนช่วยค่าเช่า Server ของ Web app นี้<br />
                        เพื่อให้สามารถบริการได้ต่อไป
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => setIsQRModalOpen(true)}
                            className="relative w-48 h-48 rounded-xl overflow-hidden shadow-lg border-4 border-white bg-white p-2 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200 group"
                            title="คลิกเพื่อดูรูปขนาดใหญ่"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/donation-qr.jpg"
                                alt="QR Code สำหรับบริจาค"
                                className="w-full h-full object-contain rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">🔍 ดูใหญ่</span>
                            </div>
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        คลิกที่ QR Code เพื่อดูขนาดใหญ่และบันทึกภาพ
                    </p>
                </div>
            </Card>

            {/* Version & License */}
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <div className="flex flex-wrap justify-center gap-8 mb-4">
                    <div>
                        <p className="text-sm text-gray-500">เวอร์ชัน</p>
                        <p className="text-xl font-bold text-[#1565C0]">{APP_VERSION}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">อัปเดตล่าสุด</p>
                        <p className="text-xl font-bold text-[#388E3C]">{APP_LAST_UPDATE}</p>
                    </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-600">
                        License @2026 -
                        <a
                            href={DEVELOPER_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1565C0] hover:underline ml-1"
                        >
                            พล.ท.ดร.กริช อินทราทิพย์
                        </a>
                    </p>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <p className="text-sm text-orange-700">
                    <strong>⚠️ หมายเหตุ:</strong> ระบบนี้เป็นเครื่องมือช่วยประเมินเบื้องต้นโดย AI
                    ผลการประเมินควรใช้ประกอบการพิจารณาร่วมกับการรีวิวจากผู้เชี่ยวชาญมนุษย์
                </p>
            </div>

            {/* QR Code Modal */}
            <QRCodeModal
                isOpen={isQRModalOpen}
                onClose={() => setIsQRModalOpen(false)}
                imageSrc="/donation-qr.jpg"
                imageAlt="QR Code สำหรับบริจาค"
                downloadFileName="donation-qr-academic-sar.jpg"
            />
        </div>
    );
}
