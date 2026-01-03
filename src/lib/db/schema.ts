import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    boolean,
    integer,
    decimal,
    jsonb,
    date,
    pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================
// ENUMS
// ============================================

export const subscriptionTierEnum = pgEnum("subscription_tier", [
    "free",
    "pro",
    "business",
]);

export const contractStatusEnum = pgEnum("contract_status", [
    "draft",
    "pending_review",
    "in_negotiation",
    "active",
    "completed",
    "cancelled",
]);

export const paymentTermsEnum = pgEnum("payment_terms", [
    "NET_15",
    "NET_30",
    "NET_45",
    "NET_60",
    "NET_90",
    "ON_COMPLETION",
    "MILESTONE",
    "OTHER",
]);

export const riskSeverityEnum = pgEnum("risk_severity", [
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
]);

export const scopeStatusEnum = pgEnum("scope_status", [
    "pending",
    "in_progress",
    "completed",
    "cancelled",
]);

export const changeOrderStatusEnum = pgEnum("change_order_status", [
    "draft",
    "pending_approval",
    "approved",
    "rejected",
    "invoiced",
]);

export const communicationChannelEnum = pgEnum("communication_channel", [
    "EMAIL",
    "SLACK",
    "ZOOM",
    "OTHER",
]);

export const sentimentLabelEnum = pgEnum("sentiment_label", [
    "VERY_NEGATIVE",
    "NEGATIVE",
    "NEUTRAL",
    "POSITIVE",
    "VERY_POSITIVE",
]);

export const testimonialTypeEnum = pgEnum("testimonial_type", [
    "pending",
    "text",
    "video",
]);

export const productStatusEnum = pgEnum("product_status", [
    "draft",
    "active",
    "archived",
]);

export const agentStatusEnum = pgEnum("agent_status", [
    "pending",
    "running",
    "completed",
    "failed",
]);

// ============================================
// CORE TABLES
// ============================================

// Users
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkId: varchar("clerk_id", { length: 255 }).unique().notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }),
    avatarUrl: text("avatar_url"),
    timezone: varchar("timezone", { length: 100 }).default("UTC"),
    onboardingCompleted: boolean("onboarding_completed").default(false),
    subscriptionTier: subscriptionTierEnum("subscription_tier").default("free"),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Vault (User's Business Context)
export const vaults = pgTable("vaults", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .unique()
        .notNull(),
    settings: jsonb("settings").default({}).$type<VaultSettings>(),
    aiPreferences: jsonb("ai_preferences").default({}).$type<AiPreferences>(),
    brandAssets: jsonb("brand_assets").default({}).$type<BrandAssets>(),
    defaultRates: jsonb("default_rates").default({}).$type<DefaultRates>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Clients
export const clients = pgTable("clients", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }),
    company: varchar("company", { length: 255 }),
    industry: varchar("industry", { length: 100 }),
    website: text("website"),
    phone: varchar("phone", { length: 50 }),
    address: text("address"),
    avatarUrl: text("avatar_url"),
    healthScore: integer("health_score").default(100),
    status: varchar("status", { length: 50 }).default("active").notNull(),
    sentimentTrend: sentimentLabelEnum("sentiment_trend").default("NEUTRAL"),
    totalRevenue: decimal("total_revenue", { precision: 12, scale: 2 }).default(
        "0"
    ),
    notes: text("notes"),
    metadata: jsonb("metadata").default({}).$type<ClientMetadata>(),
    isArchived: boolean("is_archived").default(false),
    lastContactedAt: timestamp("last_contacted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// SHIELD CORE TABLES
// ============================================

// Contracts
export const contracts = pgTable("contracts", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    clientId: uuid("client_id").references(() => clients.id, {
        onDelete: "set null",
    }),
    title: varchar("title", { length: 255 }).notNull(),
    status: contractStatusEnum("status").default("draft"),
    originalFileUrl: text("original_file_url"),
    originalFileName: varchar("original_file_name", { length: 255 }),
    parsedContent: text("parsed_content"),
    extractedTerms: jsonb("extracted_terms").$type<ExtractedTerms>(),
    riskScore: integer("risk_score"),
    riskFlags: jsonb("risk_flags").default([]).$type<RiskFlag[]>(),
    paymentTerms: paymentTermsEnum("payment_terms"),
    totalValue: decimal("total_value", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 3 }).default("USD"),
    startDate: date("start_date"),
    endDate: date("end_date"),
    signedAt: timestamp("signed_at"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Scope Items
export const scopeItems = pgTable("scope_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    contractId: uuid("contract_id")
        .references(() => contracts.id, { onDelete: "cascade" })
        .notNull(),
    description: text("description").notNull(),
    category: varchar("category", { length: 100 }),
    deliverableType: varchar("deliverable_type", { length: 100 }),
    estimatedHours: decimal("estimated_hours", { precision: 8, scale: 2 }),
    rate: decimal("rate", { precision: 10, scale: 2 }),
    revisionLimit: integer("revision_limit"),
    status: scopeStatusEnum("status").default("pending"),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Change Orders
export const changeOrders = pgTable("change_orders", {
    id: uuid("id").defaultRandom().primaryKey(),
    contractId: uuid("contract_id")
        .references(() => contracts.id, { onDelete: "cascade" })
        .notNull(),
    orderNumber: integer("order_number").notNull(),
    originalRequest: text("original_request").notNull(),
    translatedScope: text("translated_scope"),
    estimatedHours: decimal("estimated_hours", { precision: 8, scale: 2 }),
    proposedAmount: decimal("proposed_amount", { precision: 10, scale: 2 }),
    status: changeOrderStatusEnum("status").default("draft"),
    clientResponse: text("client_response"),
    respondedAt: timestamp("responded_at"),
    invoiceId: varchar("invoice_id", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// RADAR CORE TABLES
// ============================================

// Communications
export const communications = pgTable("communications", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    clientId: uuid("client_id").references(() => clients.id, {
        onDelete: "set null",
    }),
    contractId: uuid("contract_id").references(() => contracts.id, {
        onDelete: "set null",
    }),
    channel: communicationChannelEnum("channel").notNull(),
    direction: varchar("direction", { length: 20 }).notNull(), // inbound/outbound
    externalId: varchar("external_id", { length: 255 }),
    subject: varchar("subject", { length: 500 }),
    contentPreview: text("content_preview"),
    fullContent: text("full_content"),
    sentimentScore: decimal("sentiment_score", { precision: 3, scale: 2 }),
    sentimentLabel: sentimentLabelEnum("sentiment_label"),
    flaggedRequests: jsonb("flagged_requests").default([]).$type<FlaggedRequest[]>(),
    responseTimeMinutes: integer("response_time_minutes"),
    receivedAt: timestamp("received_at"),
    analyzedAt: timestamp("analyzed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// MAGNET CORE TABLES
// ============================================

// Portfolio Items
export const portfolioItems = pgTable("portfolio_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    clientId: uuid("client_id").references(() => clients.id, {
        onDelete: "set null",
    }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    shortDescription: varchar("short_description", { length: 500 }),
    category: varchar("category", { length: 100 }),
    industries: text("industries").array(),
    tags: text("tags").array(),
    thumbnailUrl: text("thumbnail_url"),
    featuredImageUrl: text("featured_image_url"),
    images: jsonb("images").default([]).$type<PortfolioImage[]>(),
    externalUrl: text("external_url"),
    projectUrl: text("project_url"),
    caseStudyContent: text("case_study_content"),
    metrics: jsonb("metrics").default({}).$type<PortfolioMetrics>(),
    isFeatured: boolean("is_featured").default(false),
    isPublic: boolean("is_public").default(true),
    status: varchar("status", { length: 50 }).default("draft"),
    displayOrder: integer("display_order").default(0),
    projectDate: date("project_date"),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Testimonials
export const testimonials = pgTable("testimonials", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    clientId: uuid("client_id").references(() => clients.id, {
        onDelete: "set null",
    }),
    portfolioItemId: uuid("portfolio_item_id").references(
        () => portfolioItems.id,
        { onDelete: "set null" }
    ),
    type: testimonialTypeEnum("type").default("pending"),
    content: text("content"),
    videoUrl: text("video_url"),
    videoThumbnail: text("video_thumbnail"),
    rating: integer("rating"),
    clientName: varchar("client_name", { length: 255 }),
    clientTitle: varchar("client_title", { length: 255 }),
    clientCompany: varchar("client_company", { length: 255 }),
    clientAvatar: text("client_avatar"),
    isApproved: boolean("is_approved").default(false),
    isFeatured: boolean("is_featured").default(false),
    magicLinkToken: varchar("magic_link_token", { length: 255 }).unique(),
    magicLinkExpiresAt: timestamp("magic_link_expires_at"),
    collectedAt: timestamp("collected_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Dynamic Pitches
export const pitches = pgTable("pitches", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    leadEmail: varchar("lead_email", { length: 255 }),
    leadName: varchar("lead_name", { length: 255 }),
    leadCompany: varchar("lead_company", { length: 255 }),
    leadIndustry: varchar("lead_industry", { length: 100 }),
    leadEnrichmentData: jsonb("lead_enrichment_data").$type<LeadEnrichment>(),
    selectedPortfolioIds: uuid("selected_portfolio_ids").array(),
    selectedTestimonialIds: uuid("selected_testimonial_ids").array(),
    customHeadline: text("custom_headline"),
    customIntro: text("custom_intro"),
    generatedMockups: jsonb("generated_mockups").default([]).$type<GeneratedMockup[]>(),
    publicSlug: varchar("public_slug", { length: 100 }).unique().notNull(),
    isActive: boolean("is_active").default(true),
    viewCount: integer("view_count").default(0),
    lastViewedAt: timestamp("last_viewed_at"),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// FORGE CORE TABLES
// ============================================

// Products (Micro-SaaS)
export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 100 }).unique().notNull(),
    description: text("description"),
    shortDescription: varchar("short_description", { length: 500 }),
    type: varchar("type", { length: 50 }), // template, component, tool, etc.
    sourceRepository: text("source_repository"),
    sourceFiles: jsonb("source_files").default([]).$type<SourceFile[]>(),
    pricingType: varchar("pricing_type", { length: 50 }).default("one_time"),
    price: decimal("price", { precision: 10, scale: 2 }),
    stripeProductId: varchar("stripe_product_id", { length: 255 }),
    stripePriceId: varchar("stripe_price_id", { length: 255 }),
    landingPageContent: text("landing_page_content"),
    documentation: text("documentation"),
    downloadUrl: text("download_url"),
    previewUrl: text("preview_url"),
    thumbnailUrl: text("thumbnail_url"),
    images: jsonb("images").default([]).$type<string[]>(),
    features: jsonb("features").default([]).$type<string[]>(),
    techStack: text("tech_stack").array(),
    salesCount: integer("sales_count").default(0),
    totalRevenue: decimal("total_revenue", { precision: 12, scale: 2 }).default(
        "0"
    ),
    rating: decimal("rating", { precision: 2, scale: 1 }),
    reviewCount: integer("review_count").default(0),
    status: productStatusEnum("status").default("draft"),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// AI & SYSTEM TABLES
// ============================================

// Agent Runs (Audit Trail)
export const agentRuns = pgTable("agent_runs", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    agentType: varchar("agent_type", { length: 100 }).notNull(),
    trigger: varchar("trigger", { length: 100 }),
    inputSummary: text("input_summary"),
    outputSummary: text("output_summary"),
    confidenceScore: decimal("confidence_score", { precision: 3, scale: 2 }),
    actionsTaken: jsonb("actions_taken").default([]).$type<AgentAction[]>(),
    humanOverride: boolean("human_override").default(false),
    tokensUsed: integer("tokens_used"),
    durationMs: integer("duration_ms"),
    status: agentStatusEnum("status").default("pending"),
    errorMessage: text("error_message"),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Notifications
export const notifications = pgTable("notifications", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    type: varchar("type", { length: 100 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message"),
    data: jsonb("data").default({}),
    isRead: boolean("is_read").default(false),
    readAt: timestamp("read_at"),
    actionUrl: text("action_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// RELATIONS
// ============================================

export const usersRelations = relations(users, ({ one, many }) => ({
    vault: one(vaults, {
        fields: [users.id],
        references: [vaults.userId],
    }),
    clients: many(clients),
    contracts: many(contracts),
    portfolioItems: many(portfolioItems),
    testimonials: many(testimonials),
    pitches: many(pitches),
    products: many(products),
    communications: many(communications),
    agentRuns: many(agentRuns),
    notifications: many(notifications),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
    user: one(users, {
        fields: [clients.userId],
        references: [users.id],
    }),
    contracts: many(contracts),
    communications: many(communications),
    portfolioItems: many(portfolioItems),
    testimonials: many(testimonials),
}));

export const contractsRelations = relations(contracts, ({ one, many }) => ({
    user: one(users, {
        fields: [contracts.userId],
        references: [users.id],
    }),
    client: one(clients, {
        fields: [contracts.clientId],
        references: [clients.id],
    }),
    scopeItems: many(scopeItems),
    changeOrders: many(changeOrders),
    communications: many(communications),
}));

export const scopeItemsRelations = relations(scopeItems, ({ one }) => ({
    contract: one(contracts, {
        fields: [scopeItems.contractId],
        references: [contracts.id],
    }),
}));

export const changeOrdersRelations = relations(changeOrders, ({ one }) => ({
    contract: one(contracts, {
        fields: [changeOrders.contractId],
        references: [contracts.id],
    }),
}));

export const portfolioItemsRelations = relations(
    portfolioItems,
    ({ one, many }) => ({
        user: one(users, {
            fields: [portfolioItems.userId],
            references: [users.id],
        }),
        client: one(clients, {
            fields: [portfolioItems.clientId],
            references: [clients.id],
        }),
        testimonials: many(testimonials),
    })
);

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
    user: one(users, {
        fields: [testimonials.userId],
        references: [users.id],
    }),
    client: one(clients, {
        fields: [testimonials.clientId],
        references: [clients.id],
    }),
    portfolioItem: one(portfolioItems, {
        fields: [testimonials.portfolioItemId],
        references: [portfolioItems.id],
    }),
}));

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface VaultSettings {
    defaultCurrency?: string;
    defaultPaymentTerms?: string;
    autoGenerateChangeOrders?: boolean;
    scopeCreepSensitivity?: "low" | "medium" | "high";
    notificationPreferences?: {
        email?: boolean;
        push?: boolean;
        slack?: boolean;
    };
}

export interface AiPreferences {
    preferredTone?: "professional" | "friendly" | "casual";
    autoNegotiate?: boolean;
    riskTolerance?: "conservative" | "moderate" | "aggressive";
}

export interface BrandAssets {
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    tagline?: string;
}

export interface DefaultRates {
    hourlyRate?: number;
    dayRate?: number;
    projectMinimum?: number;
}

export interface ClientMetadata {
    source?: string;
    tags?: string[];
    customFields?: Record<string, string>;
}

export interface ExtractedTerms {
    parties?: {
        client?: { name: string; address?: string | null };
        contractor?: { name: string; address?: string | null };
    };
    financials?: {
        totalValue?: number | null;
        currency?: string;
        paymentTerms?: string;
        depositRequired?: boolean;
        depositAmount?: number | null;
    };
    dates?: {
        effectiveDate?: string | null;
        endDate?: string | null;
        milestones?: { name: string; date: string }[];
    };
    scope?: {
        description: string;
        category: string;
        deliverableType: string;
        revisionLimits?: number | null;
        estimatedHours?: number | null;
    }[];
    ipOwnership?: string;
    terminationClause?: string;
    confidentiality?: string;
}

export interface RiskFlag {
    clause: string;
    category: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    explanation: string;
    recommendation: string;
    suggestedRevision?: string;
}

export interface FlaggedRequest {
    type: string;
    content: string;
    detectedAt: string;
    analysis?: {
        isOutOfScope: boolean;
        confidence: number;
        estimatedHours?: number;
        estimatedCost?: number;
    };
}

export interface PortfolioImage {
    url: string;
    alt?: string;
    caption?: string;
    order?: number;
    fields: {
        imageUrl: string;
        description: string;
    }
}

export interface PortfolioMetrics {
    [key: string]: string | number;
}

export interface LeadEnrichment {
    company?: string;
    industry?: string;
    employeeCount?: number;
    revenue?: string;
    technologies?: string[];
    recentNews?: string[];
    logoUrl?: string;
    brandColors?: string[];
    socialProfiles?: Record<string, string>;
}

export interface GeneratedMockup {
    url: string;
    prompt: string;
    generatedAt: string;
}

export interface SourceFile {
    path: string;
    type: string;
    size: number;
}

export interface AgentAction {
    type: string;
    description: string;
    timestamp: string;
    result?: string;
}
