# Development Log - Proposal Evaluation System

## Project Overview
- **Project Name**: ระบบประเมินโครงการวิจัยขั้นกลั่นกรองโครงการ
- **Tech Stack**: Next.js 16.1.6, React 19, TypeScript, Tailwind CSS 4
- **Deployment**: Cloudflare Pages (Static Export)
- **Repository**: https://github.com/krich-intratip/proposal-eval.git

---

## Session: 2026-01-30

### Features Implemented

#### 1. Flexible Rubric System
- **Problem**: Hard-coded evaluation criteria ไม่ยืดหยุ่น
- **Solution**: สร้าง Registry Pattern สำหรับ rubric configuration
- **Files Created**:
  - `src/types/rubric.ts` - Type definitions
  - `src/config/rubrics/military.ts` - Military research criteria (100 points, 4 categories, 12 sub-criteria)
  - `src/config/rubrics/academic.ts` - Academic research criteria
  - `src/config/rubrics/index.ts` - Rubric registry
  - `src/context/RubricContext.tsx` - React Context
  - `src/lib/rubricAdapter.ts` - Helper functions

#### 2. Dashboard Page
- KPI summary cards (คะแนนรวม, เปอร์เซ็นต์, ระดับคุณภาพ, จำนวนผู้ทรง)
- Category scores visualization with progress bars
- Expert summary with quotes
- Separate HTML export (`generateDashboardReport`)

#### 3. Navigation Update
- 4 tabs: Dashboard, Evaluate, Manual, About
- About page with 3 sub-tabs (Functional, Non-Functional, Timeline)

#### 4. Dual HTML Export
- หน้าประเมินโครงการ: `generateHtmlReport()` - รายงานฉบับเต็ม
- หน้า Dashboard: `generateDashboardReport()` - รายงานฉบับย่อ

---

## Bugs & Fixes

### Bug 1: generateHtmlReport Missing Parameter
```
Error: Expected 2 arguments, but got 1
```
**Cause**: Function signature changed to require `rubric` parameter
**Fix**: Updated call in `page.tsx`:
```typescript
// Before
const htmlContent = generateHtmlReport(results);
// After
const htmlContent = generateHtmlReport(rubric, results);
```
**Lesson**: เมื่อเปลี่ยน function signature ต้องอัพเดททุกที่ที่เรียกใช้

---

### Bug 2: DecisionLevel Missing 'color' Property
```
Error: Property 'color' does not exist on type 'DecisionLevel'
```
**Cause**: Type definition ไม่มี `color` field
**Fix**:
1. Added to `src/types/rubric.ts`:
```typescript
export interface DecisionLevel {
    min: number;
    max: number;
    decision: string;
    label: string;
    description: string;
    icon: string;
    color: string;  // Added
}
```
2. Added colors to `military.ts` decisionLevels:
```typescript
{ ..., color: '#22c55e' }, // green
{ ..., color: '#f59e0b' }, // amber
{ ..., color: '#ef4444' }, // red
```
**Lesson**: เพิ่ม property ใหม่ใน interface ต้องอัพเดททุก implementation

---

### Bug 3: Recommendations.tsx Using Deprecated 'experts' Object
```
Error: Object is of type 'unknown'
```
**Cause**: ใช้ `experts[expertId]` แบบเก่าที่ถูก deprecate
**Fix**: Changed to use rubric context:
```typescript
// Before
import { experts } from '@/config/experts';
const expertName = experts[expertId]?.name || expertId;

// After
import { useRubric } from '@/context/RubricContext';
const { rubric } = useRubric();
const expertProfile = rubric.experts.find(e => e.id === expertId);
const expertName = expertProfile?.name || expertId;
```
**Lesson**: ใช้ `find()` แทน direct object access เพื่อ type safety

---

## Deployment Issues & Solutions

### Issue 1: Vercel Detects Wrong Framework (Preact)
**Symptom**:
```
sh: line 1: preact: command not found
Error: Command "preact build" exited with 127
```
**Cause**: Vercel auto-detect ผิดพลาด
**Solution**: Create `vercel.json`:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```
**Lesson**: สร้าง `vercel.json` เสมอเพื่อระบุ framework ชัดเจน

---

### Issue 2: Vercel "No Next.js version detected"
**Symptom**:
```
Warning: Could not identify Next.js version
Error: No Next.js version detected
```
**Cause**: Next.js 16 ยังใหม่มาก Vercel CLI อาจยังไม่รองรับเต็มที่
**Solution**: เพิ่ม explicit build commands ใน vercel.json
**Lesson**: Next.js versions ใหม่ๆ อาจมี compatibility issues กับ deployment platforms

---

### Issue 3: Vercel 404 NOT_FOUND After Deploy
**Symptom**: Deploy succeeds but page shows 404
**Cause**: Next.js 16 App Router compatibility issues
**Attempted Fix**: Added `output: 'standalone'` (didn't fully resolve)
**Lesson**: ถ้า Vercel มีปัญหา ลองใช้ platform อื่น เช่น Cloudflare

---

### Issue 4: OpenNext Cloudflare Build Fails on Windows
**Symptom**:
```
Missing file: resvg.wasm?module
```
**Cause**: OpenNext ไม่ compatible กับ Windows เต็มที่ (WASM files path issues)
**Warning Message**:
```
WARN OpenNext is not fully compatible with Windows.
WARN For optimal performance, use Windows Subsystem for Linux (WSL).
```
**Solution**: ใช้ Static Export + Cloudflare Pages แทน Workers
**Lesson**: OpenNext ควรใช้บน Linux/macOS หรือ WSL

---

### Issue 5: OpenNext Config Format Error
**Symptom**:
```
Error: The `open-next.config.ts` should have a default export
```
**Cause**: ใช้ format เก่า
**Wrong**:
```typescript
import type { OpenNextConfig } from "@opennextjs/cloudflare";
const config: OpenNextConfig = { ... };
export default config;
```
**Correct**:
```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
export default defineCloudflareConfig({});
```
**Lesson**: อ่าน documentation ล่าสุดเสมอ API อาจเปลี่ยน

---

### Issue 6: OpenNext Peer Dependency
**Symptom**:
```
npm error peer next@"~16.0.11 || ^16.1.5" from @opennextjs/cloudflare
```
**Cause**: Next.js 16.1.1 ไม่ตรง requirement
**Solution**: Upgrade Next.js:
```bash
npm install next@^16.1.5
```
**Lesson**: ตรวจสอบ peer dependencies ก่อน install

---

## Final Working Deployment: Cloudflare Pages (Static Export)

### Configuration Files

**next.config.ts**:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
};

export default nextConfig;
```

**wrangler.jsonc**:
```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "proposal-eval",
  "pages_build_output_dir": "out",
  "compatibility_date": "2024-09-23"
}
```

**package.json scripts**:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "deploy:cloudflare": "npm run build && wrangler pages deploy out --project-name proposal-eval"
  }
}
```

### Deploy Commands
```bash
# First time - login to Cloudflare
npx wrangler login

# Create project (first time only)
npx wrangler pages project create proposal-eval --production-branch main

# Deploy
npm run deploy:cloudflare
```

---

## Git Mistakes & Recovery

### Mistake: Pushed to Wrong Repository
**Problem**: Pushed to `academic-sar.git` instead of `proposal-eval.git`
**Recovery Steps**:
```bash
# 1. Check current remote
git remote -v

# 2. Revert academic-sar to original state
git push origin 143b534:main --force

# 3. Change remote to correct repo
git remote set-url origin https://github.com/krich-intratip/proposal-eval.git

# 4. Push to correct repo
git push origin main --force
```
**Lesson**:
- ตรวจสอบ `git remote -v` ก่อน push เสมอ
- ระวังเมื่อทำงานกับ repos หลายตัวในเครื่องเดียวกัน

---

## Key Learnings Summary

### 1. Next.js 16 + Deployment Platforms
| Platform | Status | Notes |
|----------|--------|-------|
| Vercel | ⚠️ Issues | May not fully support Next.js 16 yet |
| Cloudflare Workers (OpenNext) | ⚠️ Windows issues | Works on Linux/macOS |
| Cloudflare Pages (Static) | ✅ Works | Best option for Windows dev |

### 2. React Context Pattern for Global State
```typescript
// 1. Create context
const RubricContext = createContext<RubricContextType | null>(null);

// 2. Create provider
export function RubricProvider({ children }) {
  const [rubric, setRubric] = useState(defaultRubric);
  return (
    <RubricContext.Provider value={{ rubric, setRubric }}>
      {children}
    </RubricContext.Provider>
  );
}

// 3. Create hook
export function useRubric() {
  const context = useContext(RubricContext);
  if (!context) throw new Error('useRubric must be used within RubricProvider');
  return context;
}

// 4. Wrap app in layout.tsx
<RubricProvider>{children}</RubricProvider>
```

### 3. Type Safety Best Practices
- ใช้ `find()` แทน direct object access
- เพิ่ม property ใหม่ใน interface ต้องอัพเดททุก implementation
- Run `npm run build` เพื่อ check TypeScript errors

### 4. Deployment Checklist
- [ ] ตรวจสอบ `git remote -v`
- [ ] สร้าง platform config file (vercel.json, wrangler.jsonc)
- [ ] ทดสอบ build locally ก่อน deploy
- [ ] ตรวจสอบ peer dependencies

---

## Commands Reference

```bash
# Development
npm run dev

# Build (local test)
npm run build

# Deploy to Cloudflare Pages
npm run deploy:cloudflare

# Cloudflare login
npx wrangler login

# Check Cloudflare auth
npx wrangler whoami

# Git - check remote
git remote -v

# Git - change remote
git remote set-url origin <new-url>
```

---

## URLs

- **Production**: https://proposal-eval.pages.dev
- **Repository**: https://github.com/krich-intratip/proposal-eval.git

---

## Future Improvements

- [ ] Add more rubric configurations (grant proposal, thesis)
- [ ] Implement rubric switching UI
- [ ] Add PDF export option
- [ ] Implement data persistence (localStorage/IndexedDB)
- [ ] Add evaluation history
- [ ] Support WSL for OpenNext deployment
