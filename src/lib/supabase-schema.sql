-- =========================================================================
-- FASALCLAIM: PRODUCTION POSTGRESQL & SUPABASE DATA MODEL WITH RLS
-- Comprehensive, relational, secure architecture for agritech claim assurance
-- =========================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES & ROLES
CREATE TYPE user_role AS ENUM ('farmer', 'institutional', 'admin');

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    role user_role DEFAULT 'farmer' NOT NULL,
    fpo_or_org_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. FARMER CLAIM CASES
CREATE TYPE claim_status_enum AS ENUM (
    'draft',
    'under_review',
    'discrepancy_detected',
    'escalation_prepared',
    'grievance_submitted',
    'resolved'
);

CREATE TABLE IF NOT EXISTS public.claim_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    case_number VARCHAR(64) UNIQUE NOT NULL,
    farmer_name TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    aadhaar_last_4 CHAR(4) NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    taluka VARCHAR(100) NOT NULL,
    village VARCHAR(100) NOT NULL,
    crop TEXT NOT NULL,
    season VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    survey_number VARCHAR(100) NOT NULL,
    insured_area_hectares NUMERIC(8, 2) NOT NULL,
    sum_insured_inr NUMERIC(12, 2) NOT NULL,
    policy_number VARCHAR(100) NOT NULL,
    application_number VARCHAR(100) NOT NULL,
    insurer_name TEXT NOT NULL,
    bank_name TEXT NOT NULL,
    bank_branch TEXT,
    account_number_last_4 CHAR(4) NOT NULL,
    ifsc_code VARCHAR(15) NOT NULL,
    loss_date DATE,
    loss_reason TEXT,
    application_date DATE,
    claim_intimation_date DATE,
    status claim_status_enum DEFAULT 'under_review' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_claim_cases_user ON public.claim_cases(user_id);
CREATE INDEX idx_claim_cases_district ON public.claim_cases(district);
CREATE INDEX idx_claim_cases_status ON public.claim_cases(status);

-- 3. PRIVATE CLAIM DOCUMENTS & METADATA
CREATE TYPE doc_type_enum AS ENUM (
    'aadhaar',
    'land_record_7_12',
    'bank_passbook',
    'sowing_certificate',
    'pmfby_receipt',
    'crop_loss_intimation',
    'other'
);

CREATE TYPE doc_check_status_enum AS ENUM (
    'verified',
    'mismatch',
    'missing',
    'needs_review'
);

CREATE TABLE IF NOT EXISTS public.claim_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.claim_cases(id) ON DELETE CASCADE NOT NULL,
    doc_type doc_type_enum NOT NULL,
    title TEXT NOT NULL,
    storage_path TEXT NOT NULL, -- Private path in Supabase storage: "cases/{case_id}/{filename}"
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    extracted_data JSONB DEFAULT '{}'::jsonb,
    status doc_check_status_enum DEFAULT 'needs_review' NOT NULL,
    notes TEXT,
    uploaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_claim_docs_case ON public.claim_documents(case_id);

-- 4. PRE-CLAIM ERROR RADAR FINDINGS
CREATE TYPE radar_status_enum AS ENUM (
    'potential_mismatch',
    'missing_information',
    'looks_consistent',
    'needs_review'
);

CREATE TABLE IF NOT EXISTS public.radar_findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.claim_cases(id) ON DELETE CASCADE NOT NULL,
    category VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    field_checked TEXT NOT NULL,
    status radar_status_enum NOT NULL,
    what_was_checked TEXT NOT NULL,
    what_appears_inconsistent TEXT,
    entered_value TEXT,
    document_value TEXT,
    why_it_matters TEXT NOT NULL,
    how_to_verify_or_correct TEXT NOT NULL,
    confidence_score INT CHECK (confidence_score BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_radar_case ON public.radar_findings(case_id);

-- 5. EVIDENCE-BACKED DIAGNOSIS FINDINGS
CREATE TYPE confidence_level_enum AS ENUM (
    'high',
    'moderate',
    'tentative',
    'insufficient_evidence'
);

CREATE TABLE IF NOT EXISTS public.diagnosis_findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.claim_cases(id) ON DELETE CASCADE NOT NULL,
    category VARCHAR(100) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    evidence TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
    missing_information TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
    confidence_level confidence_level_enum NOT NULL,
    confidence_percentage INT CHECK (confidence_percentage BETWEEN 0 AND 100),
    uncertainty_note TEXT NOT NULL,
    recommended_next_action TEXT NOT NULL,
    suggested_follow_up_date DATE,
    statutory_source_title TEXT NOT NULL,
    statutory_rule_section TEXT NOT NULL,
    statutory_issuing_authority TEXT NOT NULL,
    statutory_date_verified DATE NOT NULL,
    is_rule_verified BOOLEAN DEFAULT TRUE NOT NULL,
    rule_version VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_diagnosis_case ON public.diagnosis_findings(case_id);

-- 6. SMART ESCALATION GRIEVANCE DRAFTS
CREATE TYPE grievance_status_enum AS ENUM (
    'draft',
    'pending_user_submission',
    'submitted_offline',
    'submitted_online',
    'acknowledged',
    'hearing_scheduled',
    'resolved'
);

CREATE TABLE IF NOT EXISTS public.grievance_drafts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.claim_cases(id) ON DELETE CASCADE NOT NULL,
    recipient_type VARCHAR(100) NOT NULL,
    recipient_name TEXT NOT NULL,
    recipient_address TEXT NOT NULL,
    subject TEXT NOT NULL,
    draft_body TEXT NOT NULL,
    evidence_references TEXT[] DEFAULT ARRAY[]::TEXT[],
    missing_docs_attached TEXT[] DEFAULT ARRAY[]::TEXT[],
    suggested_follow_up_days INT DEFAULT 14,
    status grievance_status_enum DEFAULT 'draft' NOT NULL,
    submission_date DATE,
    submission_reference_number VARCHAR(100),
    submission_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_grievance_case ON public.grievance_drafts(case_id);

-- 7. CHRONOLOGICAL CASE TIMELINES
CREATE TABLE IF NOT EXISTS public.case_timelines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.claim_cases(id) ON DELETE CASCADE NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    actor VARCHAR(50) NOT NULL,
    action_type VARCHAR(50) NOT NULL
);

CREATE INDEX idx_timeline_case ON public.case_timelines(case_id);

-- 8. STATUTORY RULES CONFIGURATION (ADMIN MANAGED)
CREATE TABLE IF NOT EXISTS public.diagnosis_rules_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rule_code VARCHAR(50) UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    applicable_scheme TEXT NOT NULL,
    statutory_source TEXT NOT NULL,
    rule_section TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    rule_version VARCHAR(50) NOT NULL,
    last_updated TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. AUDIT TRAIL LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    actor_id UUID REFERENCES auth.users(id),
    actor_name TEXT NOT NULL,
    action TEXT NOT NULL,
    case_number VARCHAR(100),
    details TEXT NOT NULL,
    ip_address INET
);

CREATE INDEX idx_audit_timestamp ON public.audit_logs(timestamp DESC);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict least-privilege data access enforcement
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claim_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claim_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radar_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnosis_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grievance_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnosis_rules_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Farmer Policies: Can read and write only their own records
CREATE POLICY "Farmers can access own profile"
    ON public.profiles FOR ALL
    USING (auth.uid() = id);

CREATE POLICY "Farmers can access own claim cases"
    ON public.claim_cases FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Farmers can access own claim documents"
    ON public.claim_documents FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.claim_cases c 
        WHERE c.id = claim_documents.case_id AND c.user_id = auth.uid()
    ));

CREATE POLICY "Farmers can access own radar findings"
    ON public.radar_findings FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.claim_cases c 
        WHERE c.id = radar_findings.case_id AND c.user_id = auth.uid()
    ));

CREATE POLICY "Farmers can access own diagnosis findings"
    ON public.diagnosis_findings FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.claim_cases c 
        WHERE c.id = diagnosis_findings.case_id AND c.user_id = auth.uid()
    ));

CREATE POLICY "Farmers can access own grievance drafts"
    ON public.grievance_drafts FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.claim_cases c 
        WHERE c.id = grievance_drafts.case_id AND c.user_id = auth.uid()
    ));

CREATE POLICY "Farmers can access own case timelines"
    ON public.case_timelines FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.claim_cases c 
        WHERE c.id = case_timelines.case_id AND c.user_id = auth.uid()
    ));

-- Rules are read-only for authenticated farmers, writable by admin
CREATE POLICY "Anyone authenticated can view active diagnosis rules"
    ON public.diagnosis_rules_config FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Admins can manage diagnosis rules"
    ON public.diagnosis_rules_config FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles p 
        WHERE p.id = auth.uid() AND p.role = 'admin'
    ));

-- Storage Bucket Private Access:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('claim-documents', 'claim-documents', false);
-- CREATE POLICY "Private document access" ON storage.objects
--   FOR SELECT USING (bucket_id = 'claim-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

