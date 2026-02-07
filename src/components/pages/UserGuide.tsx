'use client';

import { useState } from 'react';
import { Card } from '@/components/ui';
import { useRubric } from '@/context/RubricContext';

export default function UserGuide() {
    const { rubric } = useRubric();
    const [activeSection, setActiveSection] = useState<'steps' | 'faq' | 'api-guide'>('steps');

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
            <div className="flex justify-center gap-2 flex-wrap">
                <button
                    onClick={() => setActiveSection('steps')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        activeSection === 'steps'
                            ? 'bg-[#1565C0] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    📝 ขั้นตอนการใช้งาน
                </button>
                <button
                    onClick={() => setActiveSection('api-guide')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        activeSection === 'api-guide'
                            ? 'bg-[#1565C0] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    🔑 วิธีสมัคร API Key
                </button>
                <button
                    onClick={() => setActiveSection('faq')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        activeSection === 'faq'
                            ? 'bg-[#1565C0] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    ❓ คำถามที่พบบ่อย
                </button>
            </div>

            {activeSection === 'api-guide' ? (
                <>
                    {/* API Guide Section */}
                    <Card title="🔷 Google Gemini (แนะนำ - ฟรี!)" icon="🔑">
                        <div className="space-y-4">
                            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                                <p className="text-green-700 font-semibold">✅ แนะนำสำหรับผู้เริ่มต้น - ฟรี ไม่มีค่าใช้จ่าย!</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                                    <div>
                                        <p className="text-gray-700">ไปที่ <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Google AI Studio</a></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                                    <div>
                                        <p className="text-gray-700">ล็อกอินด้วย Google Account (Gmail)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                                    <div>
                                        <p className="text-gray-700">คลิกปุ่ม <strong>&quot;Create API Key&quot;</strong></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                                    <div>
                                        <p className="text-gray-700">คัดลอก API Key ที่ได้ มาใส่ในระบบ</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                                <p className="text-sm text-gray-600"><strong>โมเดลแนะนำ:</strong> Gemini 2.5 Flash (เร็ว คุ้มค่า) หรือ Gemini 2.5 Pro (Thinking)</p>
                                <p className="text-sm text-gray-600 mt-1"><strong>ข้อจำกัด:</strong> ฟรี 60 requests/นาที (เพียงพอสำหรับการใช้งานทั่วไป)</p>
                            </div>
                        </div>
                    </Card>

                    <Card title="🇨🇳 DeepSeek (ราคาถูก รองรับไทยดีมาก)" icon="🔑">
                        <div className="space-y-4">
                            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                                <p className="text-orange-700 font-semibold">💰 ต้องเติมเงินก่อนใช้งาน (ราคาถูกมาก ~$0.14/1M tokens)</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                                    <div>
                                        <p className="text-gray-700">ไปที่ <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">DeepSeek Platform</a></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                                    <div>
                                        <p className="text-gray-700">คลิก <strong>&quot;Sign Up&quot;</strong> สมัครด้วย Email หรือ Google Account</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                                    <div>
                                        <p className="text-gray-700">ไปที่ <strong>&quot;Top Up&quot;</strong> เติมเงิน (ขั้นต่ำ $5) ผ่าน Credit Card หรือ Crypto</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                                    <div>
                                        <p className="text-gray-700">ไปที่ <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">API Keys</a> คลิก <strong>&quot;Create API Key&quot;</strong></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
                                    <div>
                                        <p className="text-gray-700">คัดลอก API Key มาใส่ในระบบ</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                                <p className="text-sm text-gray-600"><strong>โมเดลแนะนำ:</strong> DeepSeek Chat (คุ้มค่า) หรือ DeepSeek Reasoner (Thinking)</p>
                                <p className="text-sm text-gray-600 mt-1"><strong>ข้อดี:</strong> รองรับภาษาไทยดีมาก ราคาถูกที่สุดในตลาด</p>
                            </div>
                        </div>
                    </Card>

                    <Card title="🌙 Kimi / Moonshot AI (Context ยาว)" icon="🔑">
                        <div className="space-y-4">
                            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                                <p className="text-purple-700 font-semibold">💰 ต้องเติมเงินก่อนใช้งาน (รองรับ Context ยาวมาก)</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                                    <div>
                                        <p className="text-gray-700">ไปที่ <a href="https://platform.moonshot.cn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Moonshot Platform</a> (ภาษาจีน)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                                    <div>
                                        <p className="text-gray-700">คลิก <strong>&quot;注册&quot; (สมัคร)</strong> สมัครด้วยเบอร์โทรหรือ Email</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                                    <div>
                                        <p className="text-gray-700">เติมเงินผ่าน Alipay หรือ WeChat Pay</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                                    <div>
                                        <p className="text-gray-700">ไปที่ <a href="https://platform.moonshot.cn/console/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">API Keys</a> สร้าง Key ใหม่</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                                <p className="text-sm text-gray-600"><strong>โมเดลแนะนำ:</strong> Kimi K2 Preview (ใหม่สุด) หรือ Kimi K2 Thinking (Reasoning)</p>
                                <p className="text-sm text-gray-600 mt-1"><strong>ข้อดี:</strong> รองรับ Context ยาวมาก เหมาะกับเอกสารขนาดใหญ่</p>
                            </div>
                        </div>
                    </Card>

                    <Card title="🔀 OpenRouter (เข้าถึงทุกโมเดล)" icon="🔑">
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                <p className="text-blue-700 font-semibold">✅ มีโมเดลฟรีให้เลือก + สามารถใช้ Claude, GPT, Qwen ได้</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                                    <div>
                                        <p className="text-gray-700">ไปที่ <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">OpenRouter.ai</a></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                                    <div>
                                        <p className="text-gray-700">คลิก <strong>&quot;Sign In&quot;</strong> ล็อกอินด้วย Google, GitHub หรือ Discord</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                                    <div>
                                        <p className="text-gray-700">ไปที่ <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Keys</a> คลิก <strong>&quot;Create Key&quot;</strong></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                                    <div>
                                        <p className="text-gray-700">(ถ้าต้องการโมเดลพรีเมียม) ไปที่ <strong>&quot;Credits&quot;</strong> เติมเงิน</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                                <p className="text-sm text-gray-600"><strong>โมเดลฟรีแนะนำ:</strong> Gemini 2.5 Flash, DeepSeek V3, Qwen 3 235B</p>
                                <p className="text-sm text-gray-600 mt-1"><strong>โมเดลพรีเมียม:</strong> Claude Opus/Sonnet, GPT-5, Grok 3</p>
                            </div>
                        </div>
                    </Card>

                    {/* Comparison Table */}
                    <Card title="📊 เปรียบเทียบ AI Providers" icon="📋">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-3 text-left">Provider</th>
                                        <th className="p-3 text-left">ราคา</th>
                                        <th className="p-3 text-left">ภาษาไทย</th>
                                        <th className="p-3 text-left">ความเร็ว</th>
                                        <th className="p-3 text-left">แนะนำสำหรับ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="p-3 font-medium">🔷 Gemini</td>
                                        <td className="p-3 text-green-600">ฟรี</td>
                                        <td className="p-3">⭐⭐⭐⭐</td>
                                        <td className="p-3">⭐⭐⭐⭐⭐</td>
                                        <td className="p-3">ผู้เริ่มต้น, ทดสอบระบบ</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-3 font-medium">🇨🇳 DeepSeek</td>
                                        <td className="p-3 text-orange-600">$0.14/1M</td>
                                        <td className="p-3">⭐⭐⭐⭐⭐</td>
                                        <td className="p-3">⭐⭐⭐⭐</td>
                                        <td className="p-3">เอกสารไทย, ราคาประหยัด</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-3 font-medium">🌙 Kimi</td>
                                        <td className="p-3 text-orange-600">ตามการใช้งาน</td>
                                        <td className="p-3">⭐⭐⭐⭐</td>
                                        <td className="p-3">⭐⭐⭐</td>
                                        <td className="p-3">เอกสารยาวมาก</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-medium">🔀 OpenRouter</td>
                                        <td className="p-3 text-blue-600">ฟรี/ตามโมเดล</td>
                                        <td className="p-3">⭐⭐⭐⭐</td>
                                        <td className="p-3">⭐⭐⭐⭐</td>
                                        <td className="p-3">ต้องการหลายโมเดล</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </>
            ) : activeSection === 'steps' ? (
                <>
                    {/* Step 1 */}
                    <Card title="ขั้นตอนที่ 1: ตั้งค่า AI Provider" icon="⚙️">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">1</span>
                                <div>
                                    <h4 className="font-semibold mb-1">เลือก AI Provider</h4>
                                    <p className="text-gray-600 text-sm">
                                        เลือก Provider ที่ต้องการใช้งาน ได้แก่ Google Gemini (แนะนำ - ฟรี), DeepSeek, Kimi หรือ OpenRouter
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
                    <Card title="ขั้นตอนที่ 2: อัปโหลดเอกสารโครงการ (2 ไฟล์)" icon="📄">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#388E3C] text-white rounded-full flex items-center justify-center font-bold">1</span>
                                <div>
                                    <h4 className="font-semibold mb-1">อัปโหลดไฟล์คำขอโครงการ</h4>
                                    <p className="text-gray-600 text-sm">
                                        คลิกพื้นที่อัปโหลดช่องแรก หรือลากไฟล์ PDF ของ<strong>คำขอโครงการที่ได้รับอนุมัติ</strong>มาวาง (ขนาดไม่เกิน 25MB)
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#388E3C] text-white rounded-full flex items-center justify-center font-bold">2</span>
                                <div>
                                    <h4 className="font-semibold mb-1">อัปโหลดไฟล์โครงการฉบับสมบูรณ์</h4>
                                    <p className="text-gray-600 text-sm">
                                        คลิกพื้นที่อัปโหลดช่องที่สอง หรือลากไฟล์ PDF ของ<strong>รายงานผลการวิจัยพร้อมหลักฐานประกอบ</strong>มาวาง (ขนาดไม่เกิน 25MB)
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#388E3C] text-white rounded-full flex items-center justify-center font-bold">3</span>
                                <div>
                                    <h4 className="font-semibold mb-1">ตรวจสอบการอ่านเอกสาร</h4>
                                    <p className="text-gray-600 text-sm">
                                        ระบบจะแสดงสถานะการอัปโหลดทั้ง 2 ไฟล์ ต้องอัปโหลดครบทั้ง 2 ไฟล์จึงจะเริ่มประเมินได้
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <p className="text-sm text-blue-700">
                                <strong>📋 ไฟล์ที่ต้องเตรียม:</strong>
                            </p>
                            <ul className="text-sm text-blue-700 mt-2 space-y-1">
                                <li>• <strong>ไฟล์คำขอโครงการ:</strong> ข้อเสนอโครงการที่ได้รับอนุมัติ (มีวัตถุประสงค์, ขอบเขตงาน, งบประมาณ)</li>
                                <li>• <strong>ไฟล์โครงการฉบับสมบูรณ์:</strong> รายงานผลการวิจัยพร้อมหลักฐานประกอบ (Test Report, เอกสารส่งมอบ, ฯลฯ)</li>
                            </ul>
                        </div>
                        <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                            <p className="text-sm text-orange-700">
                                <strong>💡 คำแนะนำ:</strong> ใช้ไฟล์ PDF ที่มีข้อความสามารถ copy ได้ (ไม่ใช่ภาพสแกน) จะให้ผลการประเมินที่แม่นยำกว่า
                            </p>
                        </div>
                    </Card>

                    {/* Step 3 */}
                    <Card title="ขั้นตอนที่ 3: เริ่มการประเมินปิดโครงการ" icon="🚀">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#7B1FA2] text-white rounded-full flex items-center justify-center font-bold">1</span>
                                <div>
                                    <h4 className="font-semibold mb-1">กดปุ่ม &quot;เริ่มการประเมิน&quot;</h4>
                                    <p className="text-gray-600 text-sm">
                                        เมื่อตั้งค่าและอัปโหลดเอกสารครบทั้ง 2 ไฟล์เรียบร้อย ให้กดปุ่มเริ่มการประเมิน
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#7B1FA2] text-white rounded-full flex items-center justify-center font-bold">2</span>
                                <div>
                                    <h4 className="font-semibold mb-1">รอผลการประเมิน</h4>
                                    <p className="text-gray-600 text-sm">
                                        ระบบจะใช้ AI ผู้ทรงคุณวุฒิ 3 ท่านประเมินผลสัมฤทธิ์โครงการ (ใช้เวลาประมาณ 1-2 นาที)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Step 4 */}
                    <Card title="ขั้นตอนที่ 4: ดูผลการประเมินและมติปิดโครงการ" icon="📊">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#E65100] text-white rounded-full flex items-center justify-center font-bold">1</span>
                                <div>
                                    <h4 className="font-semibold mb-1">ดูผลการประเมิน</h4>
                                    <p className="text-gray-600 text-sm">
                                        ระบบจะแสดงคะแนนรวม, มติปิดโครงการ (4 ระดับ), ผลการประเมินจากผู้ทรงคุณวุฒิแต่ละท่าน, จุดแข็ง-จุดอ่อน และคำแนะนำ
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#E65100] text-white rounded-full flex items-center justify-center font-bold">2</span>
                                <div>
                                    <h4 className="font-semibold mb-1">บันทึกรายงาน</h4>
                                    <p className="text-gray-600 text-sm">
                                        กดปุ่ม &quot;บันทึกรายงาน&quot; เพื่อดาวน์โหลดผลการประเมินปิดโครงการเป็นไฟล์ HTML
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Evaluation Criteria - Dynamic from Rubric */}
                    <Card title={`เกณฑ์การประเมินปิดโครงการ ${rubric.categories.length} หมวด (${rubric.totalMaxScore} คะแนน)`} icon="📐">
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
                            <h4 className="font-semibold mb-3">ระดับมติปิดโครงการ:</h4>
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
                                    Q: ทำไมต้องอัปโหลด 2 ไฟล์?
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    A: เพื่อให้การประเมินปิดโครงการมีความครบถ้วน ระบบต้องเปรียบเทียบระหว่าง:
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                                    <li><strong>ไฟล์คำขอโครงการ:</strong> ดูวัตถุประสงค์, ขอบเขตงาน และงบประมาณที่ได้รับอนุมัติ</li>
                                    <li><strong>ไฟล์โครงการฉบับสมบูรณ์:</strong> ดูผลสัมฤทธิ์, หลักฐาน และการใช้จ่ายจริง</li>
                                </ul>
                            </div>

                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-[#1565C0] mb-2">
                                    Q: รองรับไฟล์ประเภทใดบ้าง?
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    A: ระบบรองรับเฉพาะไฟล์ PDF เท่านั้น โดยขนาดไฟล์ไม่เกิน 25MB ต่อไฟล์
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
                                    <li>Google Gemini (ฟรี): <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">aistudio.google.com/apikey</a></li>
                                    <li>DeepSeek: <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.deepseek.com/api_keys</a></li>
                                    <li>Kimi (Moonshot): <a href="https://platform.moonshot.cn/console/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.moonshot.cn/console/api-keys</a></li>
                                    <li>OpenRouter: <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">openrouter.ai/keys</a></li>
                                </ul>
                            </div>

                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-[#1565C0] mb-2">
                                    Q: มติปิดโครงการมีกี่ระดับ?
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    A: มี 4 ระดับ:
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                                    {rubric.decisionLevels.map((level) => (
                                        <li key={level.label}>
                                            <span style={{ color: level.color }}>{level.icon}</span> <strong>{level.label}</strong> ({level.min}-{level.max} คะแนน): {level.description}
                                        </li>
                                    ))}
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
                                    ควรใช้ประกอบการพิจารณาร่วมกับการพิจารณาจากผู้ทรงคุณวุฒิ
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
