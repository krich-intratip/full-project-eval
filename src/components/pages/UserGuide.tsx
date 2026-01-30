'use client';

import { useState } from 'react';
import { Card } from '@/components/ui';
import { useRubric } from '@/context/RubricContext';

export default function UserGuide() {
    const { rubric } = useRubric();
    const [activeSection, setActiveSection] = useState<'steps' | 'faq'>('steps');

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#E8F5E9] to-[#E3F2FD] p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1565C0] mb-4">
                    📖 คู่มือการใช้งาน
                </h2>
                <p className="text-gray-600">
                    ขั้นตอนการใช้งาน{rubric.metadata.name}
                </p>
            </div>

            {/* Section Toggle */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setActiveSection('steps')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        activeSection === 'steps'
                            ? 'bg-[#1565C0] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    📝 ขั้นตอนการใช้งาน
                </button>
                <button
                    onClick={() => setActiveSection('faq')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        activeSection === 'faq'
                            ? 'bg-[#1565C0] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    ❓ คำถามที่พบบ่อย
                </button>
            </div>

            {activeSection === 'steps' ? (
                <>
                    {/* Step 1 */}
                    <Card title="ขั้นตอนที่ 1: ตั้งค่า AI Provider" icon="⚙️">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">1</span>
                                <div>
                                    <h4 className="font-semibold mb-1">เลือก AI Provider</h4>
                                    <p className="text-gray-600 text-sm">
                                        เลือก Provider ที่ต้องการใช้งาน ได้แก่ Google Gemini (แนะนำ - ฟรี), OpenAI, หรือ OpenRouter
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">2</span>
                                <div>
                                    <h4 className="font-semibold mb-1">กรอก API Key</h4>
                                    <p className="text-gray-600 text-sm">
                                        กรอก API Key ของ Provider ที่เลือก สามารถขอรับ API Key ฟรีได้จากลิงก์ที่ระบุ
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">3</span>
                                <div>
                                    <h4 className="font-semibold mb-1">เลือก Model</h4>
                                    <p className="text-gray-600 text-sm">
                                        เลือก AI Model ที่ต้องการใช้ โดยระบบแนะนำให้ใช้ Gemini 2.5 Flash หรือ Pro
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">4</span>
                                <div>
                                    <h4 className="font-semibold mb-1">ทดสอบการเชื่อมต่อ</h4>
                                    <p className="text-gray-600 text-sm">
                                        กดปุ่ม &quot;ทดสอบการเชื่อมต่อ&quot; เพื่อตรวจสอบว่า API Key และ Model ทำงานได้ถูกต้อง
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Step 2 */}
                    <Card title="ขั้นตอนที่ 2: อัปโหลดเอกสารโครงการ" icon="📄">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#388E3C] text-white rounded-full flex items-center justify-center font-bold">1</span>
                                <div>
                                    <h4 className="font-semibold mb-1">อัปโหลดไฟล์ PDF</h4>
                                    <p className="text-gray-600 text-sm">
                                        คลิกพื้นที่อัปโหลดหรือลากไฟล์ PDF ของโครงการวิจัยที่ต้องการประเมินมาวาง
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#388E3C] text-white rounded-full flex items-center justify-center font-bold">2</span>
                                <div>
                                    <h4 className="font-semibold mb-1">ตรวจสอบการอ่านเอกสาร</h4>
                                    <p className="text-gray-600 text-sm">
                                        ระบบจะแสดงข้อมูลสรุปของเอกสารที่อัปโหลด ให้ตรวจสอบความถูกต้อง
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                            <p className="text-sm text-orange-700">
                                <strong>💡 คำแนะนำ:</strong> ใช้ไฟล์ PDF ที่มีข้อความสามารถ copy ได้ (ไม่ใช่ภาพสแกน) จะให้ผลการประเมินที่แม่นยำกว่า
                            </p>
                        </div>
                    </Card>

                    {/* Step 3 */}
                    <Card title="ขั้นตอนที่ 3: เริ่มการประเมิน" icon="🚀">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#7B1FA2] text-white rounded-full flex items-center justify-center font-bold">1</span>
                                <div>
                                    <h4 className="font-semibold mb-1">กดปุ่ม &quot;เริ่มการประเมิน&quot;</h4>
                                    <p className="text-gray-600 text-sm">
                                        เมื่อตั้งค่าและอัปโหลดเอกสารเรียบร้อย ให้กดปุ่มเริ่มการประเมิน
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#7B1FA2] text-white rounded-full flex items-center justify-center font-bold">2</span>
                                <div>
                                    <h4 className="font-semibold mb-1">รอผลการประเมิน</h4>
                                    <p className="text-gray-600 text-sm">
                                        ระบบจะใช้ AI ผู้ทรงคุณวุฒิ 3 ท่านประเมินโครงการ (ใช้เวลาประมาณ 1-2 นาที)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Step 4 */}
                    <Card title="ขั้นตอนที่ 4: ดูผลการประเมินและบันทึกรายงาน" icon="📊">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#E65100] text-white rounded-full flex items-center justify-center font-bold">1</span>
                                <div>
                                    <h4 className="font-semibold mb-1">ดูผลการประเมิน</h4>
                                    <p className="text-gray-600 text-sm">
                                        ระบบจะแสดงคะแนนรวม, ผลการประเมินจากผู้ทรงคุณวุฒิแต่ละท่าน, จุดแข็ง-จุดอ่อน และคำแนะนำ
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#E65100] text-white rounded-full flex items-center justify-center font-bold">2</span>
                                <div>
                                    <h4 className="font-semibold mb-1">บันทึกรายงาน</h4>
                                    <p className="text-gray-600 text-sm">
                                        กดปุ่ม &quot;บันทึกรายงาน&quot; เพื่อดาวน์โหลดผลการประเมินเป็นไฟล์ HTML
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Evaluation Criteria - Dynamic from Rubric */}
                    <Card title={`เกณฑ์การประเมิน ${rubric.categories.length} หมวด (${rubric.totalMaxScore} คะแนน)`} icon="📐">
                        <div className="space-y-4">
                            {rubric.categories.map((cat) => (
                                <div key={cat.id} className="border rounded-lg overflow-hidden">
                                    <div className="bg-[#E3F2FD] p-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-[#1565C0]">
                                                หมวด {cat.number}: {cat.name}
                                            </span>
                                            <span className="text-sm text-[#1565C0]">{cat.maxScore} คะแนน</span>
                                        </div>
                                    </div>
                                    <div className="p-3 space-y-2">
                                        {cat.criteria.map((c) => (
                                            <div key={c.id} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-700">{c.id} {c.name}</span>
                                                <span className="text-gray-500">{c.maxScore} คะแนน</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Decision Levels */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold mb-3">ระดับการตัดสิน:</h4>
                            <div className="space-y-2">
                                {rubric.decisionLevels.map((level) => (
                                    <div key={level.label} className="flex items-center gap-3">
                                        <span
                                            className="w-4 h-4 rounded"
                                            style={{ backgroundColor: level.color }}
                                        />
                                        <span className="text-sm">
                                            {level.min === 0
                                                ? `< ${level.max + 1}`
                                                : level.max === rubric.totalMaxScore
                                                ? `≥ ${level.min}`
                                                : `${level.min}-${level.max}`
                                            } คะแนน: <strong>{level.label}</strong> - {level.description}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </>
            ) : (
                <>
                    {/* FAQ Section */}
                    <Card title="คำถามที่พบบ่อย (FAQ)" icon="❓">
                        <div className="space-y-4">
                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-[#1565C0] mb-2">
                                    Q: รองรับไฟล์ประเภทใดบ้าง?
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    A: ระบบรองรับเฉพาะไฟล์ PDF เท่านั้น โดยขนาดไฟล์ไม่เกิน 25MB
                                    และควรเป็น PDF ที่สามารถ copy ข้อความได้ (ไม่ใช่ภาพสแกน)
                                </p>
                            </div>

                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-[#1565C0] mb-2">
                                    Q: ขอ API Key ได้จากที่ไหน?
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    A: สามารถขอ API Key ได้ฟรีจาก:
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                                    <li>Google Gemini: <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">aistudio.google.com/apikey</a></li>
                                    <li>OpenAI: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.openai.com/api-keys</a></li>
                                    <li>OpenRouter: <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">openrouter.ai/keys</a></li>
                                </ul>
                            </div>

                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-[#1565C0] mb-2">
                                    Q: ผลประเมินจัดเก็บไว้ที่ไหน?
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    A: ผลประเมินจัดเก็บไว้ใน Browser Session เท่านั้น
                                    เมื่อปิดหน้าต่างหรือ refresh หน้าเว็บ ข้อมูลจะหายไป
                                    กรุณากดบันทึกรายงานเป็นไฟล์ HTML ไว้ก่อนปิดหน้าเว็บ
                                </p>
                            </div>

                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-[#1565C0] mb-2">
                                    Q: API Key ปลอดภัยหรือไม่?
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    A: API Key จะถูกเก็บไว้ใน Local Storage ของ Browser เท่านั้น
                                    ไม่ได้ส่งไปเก็บที่ Server ของเรา การเรียก AI จะทำโดยตรงจาก Browser ไปยัง AI Provider
                                </p>
                            </div>

                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-[#1565C0] mb-2">
                                    Q: ใช้เวลาประเมินนานแค่ไหน?
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    A: การประเมินใช้เวลาประมาณ 1-2 นาที ขึ้นอยู่กับขนาดเอกสาร
                                    และความเร็วของ AI Provider ที่เลือกใช้
                                </p>
                            </div>

                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-[#1565C0] mb-2">
                                    Q: ทำไมถึงมีผู้ทรงคุณวุฒิ 3 ท่าน?
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    A: เพื่อให้การประเมินมีมุมมองที่หลากหลาย ผู้ทรงคุณวุฒิแต่ละท่านจะเน้นประเด็นที่แตกต่างกัน:
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                                    {rubric.experts.map((expert) => (
                                        <li key={expert.id}>
                                            <strong>{expert.name}:</strong> {expert.focus}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-[#1565C0] mb-2">
                                    Q: ผลประเมินน่าเชื่อถือได้มากน้อยเพียงใด?
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    A: ผลประเมินเป็นการประเมินเบื้องต้นโดย AI
                                    ควรใช้ประกอบการพิจารณาร่วมกับการรีวิวจากผู้เชี่ยวชาญมนุษย์
                                    เพื่อให้ได้ผลการประเมินที่ครบถ้วนและแม่นยำ
                                </p>
                            </div>
                        </div>
                    </Card>
                </>
            )}
        </div>
    );
}
