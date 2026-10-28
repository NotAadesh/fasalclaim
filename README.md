# FasalClaim — Premium Agritech Crop-Insurance Claim-Assurance Platform

> **Core Promise:** *“Know what may be blocking your claim. Understand the evidence. Take the right next step.”*

FasalClaim is an independent agricultural crop-insurance claim-assurance web platform designed to help farmers understand, navigate, and resolve delayed, problematic, or confusing crop insurance claims (including PMFBY), while giving institutional partners (FPOs, cooperatives, departments) privacy-preserving insights into administrative bottlenecks.

---

## 🌾 The Six Core Differentiators

1. **Pre-Claim Error Radar (`/radar`)**  
   Deterministic cross-verification comparing user-entered claim details with extracted document metadata (Aadhaar, Bank Passbook, 7/12 Land Record, Sowing Declaration). Highlights: *Potential mismatch*, *Missing information*, *Looks consistent*, or *Needs review* with procedural correction steps.

2. **Evidence-Backed Claim Diagnosis Engine (`/diagnosis`) — The Signature Feature**  
   The centerpiece of the platform. Organizes cases into:
   - Case summary & key dates
   - Potential administrative blockers
   - Supporting evidence on file
   - Information still needed
   - Diagnostic confidence level & explicit uncertainty notes
   - Recommended next practical action
   - Verified statutory source references (e.g. PMFBY Guidelines Sec 13.4, Sec 7.1, Sec 11.2)
   - Follow-up timeline target date

3. **Smart Escalation Navigator (`/escalation`)**  
   Guided grievance workspace that formats structured petitions for the District Level Grievance Committee (DLMC), Insurer Nodal Desks, or Bank Branch Managers. Clearly labeled as **DRAFTS** until submitted, with external submission reference tracking.

4. **Voice-First Claim Assistant (`VoiceAssistantModal`)**  
   Conversational assistant designed for varying digital literacy. Supports short, understandable sentences, quick buttons, and optional browser Web Speech API (Speech-to-Text and Text-to-Speech) in English and Hindi (हिंदी).

5. **Institutional Bottleneck Intelligence (`/institutional`)**  
   Aggregate analytics for FPOs and institutional stakeholders. Visualizes cluster discrepancy categories, milestone turnaround benchmarks vs statutory SLAs, and district distribution without exposing any farmer Personally Identifiable Information (PII).

6. **Delay & Interest Alerts (`DelayInterestAlerts`)**  
   Timeline tracking with rigorous statutory compliance for PMFBY Section 15.2 (12% per annum penal interest rule). Explicitly caveats that interest applies only when statutory prerequisites and state subsidy release are verified.

---

## 🎨 Visual Identity & Art Direction

- **Forest Green:** `#173F2B` (Trust and primary actions)
- **Deep Green:** `#102E22` (Deep contrast background)
- **Warm Ivory:** `#F7F5ED` (Human warmth and earthy paper tone)
- **Muted Sage:** `#DDE7DA` (Agricultural calm)
- **Restrained Terracotta Accent:** `#C9794B` (Meaningful alerts & focus)
- **Charcoal Text:** `#202820` (High contrast readability)
- **Neutral Grey:** `#70786F`

---

## 🛠️ Technical Architecture

- **Framework:** Next.js (App Router) + React 18
- **Language:** TypeScript (Strict typing)
- **Styling:** Tailwind CSS with custom brand extension tokens
- **Icons:** Lucide React
- **Analytics:** Recharts
- **Database Model:** PostgreSQL schema with Supabase Row Level Security (RLS) in `src/lib/supabase-schema.sql`
- **State Management:** Reactive Client Context with zero-latency hydrated demo state and full CRUD support

---

## 🚀 Running Locally

1. Clone or navigate to the repository:
   ```bash
   cd fasalclaim
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Run Type-Check & Build:
   ```bash
   npm run type-check
   npm run build
   ```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub / GitLab.
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. Framework Preset will auto-detect as **Next.js**.
4. (Optional) Add your Supabase credentials from `.env.example`. If omitted, the application runs seamlessly in self-contained **Demo Mode** with realistic sample cases.
5. Click **Deploy**.

---

## 🔒 Security & Statutory Notice

- **Independent Platform:** FasalClaim is an independent technology service. It is not an insurer, insurance company, claims adjudicator, or official PMFBY portal.
- **Draft Labeling:** All grievance letters generated are clearly marked as formal drafts for review prior to physical or portal submission.
- **Zero Hallucination:** Deterministic rules govern all diagnostic findings and statutory citations.

