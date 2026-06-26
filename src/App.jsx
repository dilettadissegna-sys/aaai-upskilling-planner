import { useState, useMemo } from "react";
import { Search, ChevronRight, Sparkles, ArrowLeft, Loader2, Target, Wrench, CalendarClock, MessageSquareText, RotateCcw } from "lucide-react";

const C = {
  pink: "#f2007d",
  sunset: "#441f72",
  aqua: "#2abeb9",
  sunrays: "#ffb511",
  white: "#ffffff",
  lava: "#1e0023",
  sand: "#f3ece1",
};

const FRAMEWORK = {
  Corporate: {
    mission: "Sets direction and governance",
    color: C.sunset,
    roles: [
      { name: "Employee Engagement & Experience", mission: "Drives initiatives that enhance employee motivation, satisfaction and engagement by shaping a positive, inclusive, values-aligned employee experience.", resp: ["Designs engagement, well-being and recognition strategies across multi-national teams", "Collects, analyses and interprets employee feedback and experience metrics to identify trends", "Proposes initiatives to elevate culture, satisfaction and retention", "Partners with People functions and L&D to align culture with the EVP", "Acts as strategic advisor to leadership on engagement", "Monitors effectiveness of internal rituals and events"] },
      { name: "Global Learning & Development", mission: "Enables continuous growth and organisational readiness by designing, delivering and evolving learning and talent development initiatives.", resp: ["Designs end-to-end learning systems, experiences and pathways", "Partners with stakeholders to identify capability gaps and translate them into solutions", "Delivers and coordinates programmes, workshops and digital assets", "Manages learning vendors and budgets", "Supports talent processes such as performance management and IDPs", "Uses data and feedback to evaluate training effectiveness", "Oversees learning platforms and tools"] },
      { name: "HR Business Partner", mission: "Partners with the business to understand needs, identify opportunities and coach leaders to boost performance and satisfaction.", resp: ["Oversees the employee lifecycle for one or more functions", "Implements HR policies and processes within assigned functions", "Acts as primary contact on recruitment, compensation, L&D and budgeting", "Integrates inputs from local HR specialists", "Coaches leaders on team performance"] },
      { name: "Internal Communications", mission: "Drives the internal narrative and event ecosystem that connects, informs and inspires global talent.", resp: ["Designs internal communication strategies, campaigns and executive messaging", "Builds and maintains multi-channel, accessible information across the lifecycle", "Plans, manages and executes corporate and departmental events", "Partners with senior stakeholders for seamless end-to-end communication", "Analyses communication metrics and event ROI"] },
      { name: "Talent Acquisition", mission: "Ensures high-quality, efficient recruitment and builds a compelling employer brand.", resp: ["Manages end-to-end recruitment including sourcing, screening and interviewing", "Leverages effective sourcing channels such as referrals, headhunters and campus outreach", "Executes employer branding initiatives and event management"] },
      { name: "People Operations", mission: "Delivers integrated, compliant and scalable HR operations across all regions.", resp: ["Processes payroll and ensures compliance with local tax and labour regulations", "Maintains employee records and HR documentation", "Serves as primary contact for HR operational enquiries", "Supports employee relations", "Generates and maintains local HR reports", "Upholds HR system integrity and data accuracy"] },
      { name: "Global Rewards", mission: "Designs and manages competitive compensation and benefits programmes that are sustainable, equitable and competitive.", resp: ["Supports salary reviews and incentive programmes", "Analyses market data and internal pay equity", "Maintains reward data accuracy in HRIS", "Assists with reward compliance and reporting", "Collaborates with HR and Finance on budget tracking and financial modelling", "Contributes to compensation surveys and communication materials"] },
      { name: "Compliance & Security", mission: "Guarantees compliance with laws, licences and regulations while safeguarding data privacy.", resp: ["Establishes procedures to manage and reduce IT risks", "Coordinates governance for PCI compliance", "Develops and enforces information security policies", "Conducts internal and external system scans and audits", "Provides risk mitigation guidance"] },
      { name: "Enterprise Risk Management", mission: "Ensures the effectiveness of the ERM system by integrating risk processes into strategy and operations.", resp: ["Designs and implements a comprehensive risk management process", "Performs risk assessments on current and emerging threats", "Establishes the company's Risk Appetite", "Delivers tailored risk reporting", "Cultivates risk awareness through training"] },
      { name: "Internal Auditor", mission: "Ensures the effectiveness of internal controls in compliance with corporate and government standards.", resp: ["Verifies internal business controls for processes, systems and financial reporting", "Identifies control gaps and initiates remedial actions", "Develops and evaluates audit programs", "Reports audit results with actionable recommendations", "Monitors corporate governance procedures"] },
      { name: "Corporate Affairs", mission: "Ensures fulfilment of statutory duties for all legal entities and drives corporate governance.", resp: ["Organises board and shareholder meetings", "Supports corporate transaction processes and due diligence", "Monitors SIX Swiss Exchange disclosure requirements", "Develops corporate governance frameworks", "Ensures observance of insider trading rules"] },
      { name: "Data Protection", mission: "Guarantees privacy compliance and embeds privacy by design across the organisation.", resp: ["Develops procedures consistent with GDPR and Group standards", "Manages privacy guidelines and trains staff", "Executes Privacy Impact Assessments for new projects", "Undertakes supplier audits", "Achieves privacy by design and by default across products"] },
      { name: "Legal Advisor", mission: "Provides legal support to keep operations within legal and regulatory frameworks.", resp: ["Reviews features and products for privacy and data protection compliance", "Advises on legal and regulatory matters", "Drafts, reviews and negotiates commercial agreements", "Monitors legal developments affecting the business"] },
      { name: "Corporate PR", mission: "Defines and implements external communication and corporate PR strategy.", resp: ["Develops corporate PR strategies to enhance reputation", "Manages media relations as primary contact for journalists", "Delivers press releases, statements and Q&A documents", "Supports crisis and issue communications", "Monitors media coverage and public perception"] },
      { name: "Investor Relator", mission: "Serves as the primary link to shareholders and key external financial stakeholders.", resp: ["Maintains communications with the investment community", "Cultivates relationships with financial institutions", "Monitors investment market trends and shapes response strategies"] },
      { name: "Sustainability & Social Responsibility", mission: "Drives the Group's sustainability strategy across environment, social equity and inclusion.", resp: ["Coordinates non-financial disclosure requirements", "Leads preparation of Non-Financial Reports", "Ensures ESG regulatory compliance", "Quantifies environmental impacts and sets reduction goals", "Directs stakeholder engagement on sustainability"] },
      { name: "Fraud & Dispute", mission: "Develops and monitors strategies and systems to minimise fraud across the portfolio.", resp: ["Reviews fraud alerts and classifies fraud types", "Monitors fraud trends with advanced reporting tools", "Implements and monitors fraud prevention measures", "Ensures fraud levels stay within scheme thresholds", "Liaises with police and investigative bodies"] },
      { name: "Payment Operation", mission: "Optimises payment processing performance and manages acquiring costs.", resp: ["Resolves technical problems impacting conversion", "Audits bookings flagged by alerting systems", "Monitors payment performance with reporting tools", "Implements payment routing strategies to reduce costs", "Manages relationships with payment providers"] },
      { name: "Treasury & B2B Payments", mission: "Manages and optimises cash and payment operations including FX, debt and capital.", resp: ["Processes booking-related payments after reconciliation", "Performs core treasury operations", "Reconciles bank accounts and delivers cash reporting", "Forecasts card spending", "Defines cash flow and payment strategies"] },
      { name: "Booking Management Accountant", mission: "Manages analytical accounting, cost reconciliation, allocation and recovery to protect margins.", resp: ["Ensures quality of daily feeds from banks and issuers", "Analyses, allocates and recovers costs for cost centres", "Identifies inefficiencies impacting margins", "Produces reports on billing and cost allocation", "Manages monthly P&L and balance sheet closures"] },
      { name: "FP&A Controller", mission: "Provides financial and cost analysis against budget and prior year for managers and the Board.", resp: ["Performs variance analysis against budget and prior year", "Identifies anomalous trends and opportunities", "Performs intercompany reconciliations", "Facilitates the budget and forecasting processes", "Develops procedures for timely data collection"] },
      { name: "Labour Costs & Analytics", mission: "Provides data-driven insights to support workforce planning and HR decision-making.", resp: ["Collects, cleans and manages HR data for a single source of truth", "Produces reports and dashboards on headcount, attrition and DEI", "Automates repetitive reporting workflows", "Analyses workforce trends for efficiency", "Maintains data privacy compliance"] },
      { name: "Management Accounting", mission: "Ensures accuracy and timeliness of monthly closing activities.", resp: ["Produces and verifies financial reports", "Performs intercompany reconciliations", "Records journal entries to support the balance sheet", "Monitors ERP financial entries and trains the business", "Documents new procedures"] },
      { name: "Finance Business Partner", mission: "Provides financial and cost analysis to support strategic management decisions.", resp: ["Analyses EPM reports and departmental performance", "Analyses and controls marketing costs", "Monitors the variable cost base", "Contributes to budget and reforecasting for contribution margin", "Monitors Post-Marketing Contribution"] },
      { name: "Workforce Management", mission: "Ensures the right resources at the right time and cost for efficient Customer Service.", resp: ["Forecasts customer contact volumes across markets and channels", "Designs agent schedules and distribution plans", "Controls shrinkage categories", "Monitors real-time performance and coverage", "Provides actionable insights on staffing trends"] },
      { name: "Procurement — Global Procurement", mission: "Supports business functions in supplier relationships and ensures cost control.", resp: ["Identifies and scouts new vendors", "Supports supplier negotiations", "Tracks contract expiry dates", "Develops vendor shortlists and scorecards", "Manages high-value purchases"] },
      { name: "Procurement — Purchasing Process", mission: "Supports functions throughout the purchase order lifecycle.", resp: ["Supervises the purchase order policy process", "Conducts weekly audits", "Updates process documentation", "Ensures compliance checks and escalates issues", "Develops end-user training materials"] },
      { name: "Accountant", mission: "Performs general accounting and ensures integrity of accounting records.", resp: ["Manages AR and AP invoice processing", "Posts general ledger entries", "Performs Capex recording and analysis", "Manages tax and fiscal compliance including VAT", "Prepares and reports on accounting transactions"] },
      { name: "Consolidation", mission: "Prepares consolidation entries and consolidates subsidiary financial accounts.", resp: ["Reconciles consolidated ledger accounts and statements", "Analyses the Group net financial position", "Designs internal controls over financial reporting", "Reviews reporting packages from local Finance", "Supports consolidation procedures"] },
      { name: "Tax", mission: "Prepares tax records and participates in the global tax strategy to optimise efficiency.", resp: ["Advises on tax treatment of transactions", "Produces Transfer Pricing files", "Reconciles current and deferred tax under IAS 12", "Evaluates tax implications of M&A", "Monitors local tax developments"] },
    ],
  },
  Market: {
    mission: "Creates demand and generates revenue",
    color: C.pink,
    roles: [
      { name: "Brand Marketing", mission: "Defines, plans and executes impactful brand campaigns across all channels.", resp: ["Supports a high-impact customer acquisition strategy", "Analyses campaign performance and ROI", "Develops marketing collateral that positions product strengths", "Plans, implements and tracks digital and offline strategies", "Runs advertising campaigns across platforms"] },
      { name: "Consumer PR", mission: "Develops differentiated PR that increases awareness of the brand and products.", resp: ["Executes Consumer and Marketing PR activities", "Drafts and distributes press releases and media pitches", "Manages relationships with journalists and influencers", "Supports PR campaigns and product launches", "Monitors media coverage and brand sentiment"] },
      { name: "Social Media", mission: "Supports brand growth through paid media campaigns across social channels.", resp: ["Develops and executes social media campaigns", "Optimises campaigns in real time against performance goals", "Tracks performance against KPIs", "Produces reports on pacing, delivery and performance", "Shares insights to improve creative and targeting"] },
      { name: "Art Director", mission: "Delivers high-impact creative that strengthens the brand's visual presence.", resp: ["Elevates creative materials, brand guidelines and templates", "Provides art direction and quality checks on assets", "Drives visual research and design improvements for landing pages", "Collaborates with UX and Product on the UI", "Conceptualises new brand identities"] },
      { name: "Content", mission: "Owns creation, management and optimisation of the landing page ecosystem.", resp: ["Builds landing pages using the CMS and templates", "Manages the landing page ecosystem for consistency", "Maintains the destination content catalogue", "Uses AI tools to execute routine tasks per workflows", "Creates and manages data feeds with business logic"] },
      { name: "Copywriter", mission: "Translates brand propositions into clear, effective customer communications.", resp: ["Drafts high-quality copy and runs persuasion experiments", "Aligns content across markets for a consistent voice", "Proofreads and edits copy from other departments", "Guides language specialists on translations", "Partners with Product and UX on data-driven experiences"] },
      { name: "Digital Designer", mission: "Delivers high-impact visual design for marketing, media and e-commerce.", resp: ["Produces visual designs and assets for campaigns", "Collaborates with Copywriters on creative concepts", "Manages daily production workflows", "Creates static and dynamic display banners and templates", "Curates imagery for landing pages and feeds"] },
      { name: "Digital Multimedia Production", mission: "Creates content that inspires travellers and drives traffic and conversions.", resp: ["Manages multimedia content creation and measurement", "Develops the content plan and editorial calendar", "Oversees daily content production and refreshes", "Optimises multimedia for SEO and visibility", "Produces infographics, imagery and video"] },
      { name: "Ad-Operations", mission: "Oversees end-to-end technical execution of ad campaigns.", resp: ["Provides account support across the campaign lifecycle", "Troubleshoots creative or tracking issues", "Conducts QA before and during launch", "Monitors and distributes pacing reports", "Implements optimisation strategies for yield"] },
      { name: "Affiliation", mission: "Manages and analyses affiliation campaigns to hit profitability and growth targets.", resp: ["Negotiates commercial agreements with publishers", "Analyses KPIs and campaign economics", "Produces performance reports and insights", "Monitors market trends and competitor activity", "Onboards high-potential affiliates"] },
      { name: "CRM", mission: "Manages relationships with customers to maximise lifetime value and loyalty.", resp: ["Builds engaging newsletters highlighting customer benefits", "Executes multi-channel campaigns including push and in-app", "Provides segmented audiences based on behavioural data", "Runs A/B testing and message experimentation", "Measures and reports on campaign success"] },
      { name: "Commercial Marketing & Solutions", mission: "Expands monetisation through innovative programmes and a 360 marketing approach.", resp: ["Creates a mix of marketing products and content solutions", "Sources and deploys strategic assets and frameworks", "Manages stakeholders through project management", "Supports high-value external client briefs", "Analyses market trends for competitiveness"] },
      { name: "Display Monetisation", mission: "Develops and optimises display performance to maximise digital revenue.", resp: ["Identifies trends in complex data sets", "Evaluates funnel conversion and channel performance", "Monitors programmatic performance against KPIs", "Implements ad-network and targeting strategies", "Provides technical support for trafficking and pixels"] },
      { name: "SEM", mission: "Acquires customers via SEM measured end-to-end from click to revenue.", resp: ["Manages SEM campaigns from setup and bidding to execution", "Identifies growth opportunities and scales winning tests", "Produces analysis, reports and insights", "Conducts A/B tests in a test-and-learn approach", "Maintains Google Ads certification"] },
      { name: "SEO", mission: "Sets a long-term SEO strategy to increase qualified organic traffic.", resp: ["Owns an SEO strategy for assigned markets and brands", "Improves organic acquisition focused on traffic quality", "Produces analysis on opportunities, risks and technical issues", "Maintains understanding of SEO and GEO dynamics", "Conducts site audits and competitive benchmarking"] },
      { name: "Product Designer", mission: "Transforms user needs into intuitive, high-performing experiences.", resp: ["Develops understanding of customer and user needs", "Designs and tests interfaces across the journey", "Prototypes and iterates on design solutions", "Maintains and contributes to the design system", "Presents recommendations to stakeholders"] },
      { name: "Product Management", mission: "Drives product value by prioritising customer problems and enabling fast learning, leveraging AI where it improves outcomes.", resp: ["Identifies customer and business problems through research and data", "Frames problems and defines hypotheses for discovery", "Prioritises opportunities by value, impact and feasibility", "Defines success metrics and measurement frameworks", "Builds an evidence base of insights and experiments", "Uses data continuously to steer product evolution"] },
      { name: "Researcher", mission: "Translates user needs into experiences through evidence-based research.", resp: ["Designs and executes quantitative and qualitative UX research", "Uses A/B testing, benchmarking, surveys and usability testing", "Manages the testing lifecycle with Product and Design", "Maintains user personas and journey maps", "Synthesises feedback from Customer Care and Analytics"] },
      { name: "Pricing", mission: "Maximises profit margins through data-led price positioning.", resp: ["Implements and optimises pricing strategies through analysis", "Monitors pricing performance against KPIs", "Executes pricing models and evaluates strategy shifts", "Delivers pricing strategy reports", "Conducts competitor benchmarking and market analysis"] },
      { name: "Account Management", mission: "Identifies partners and negotiates commercial agreements to maximise margins.", resp: ["Maintains product data integrity including rates and availability", "Contracts new products and explores market opportunities", "Negotiates competitive commercial terms", "Communicates market requirements to partners", "Represents the company at trade events"] },
      { name: "Category Management", mission: "Develops business and optimises profitability across products.", resp: ["Monitors product performance through data analysis", "Develops promotion and positioning strategies with Marketing", "Ensures a competitive content range across markets", "Analyses KPIs to identify trends and opportunities", "Translates insights into commercial actions"] },
      { name: "Client Management", mission: "Acts as the liaison between clients and internal execution teams.", resp: ["Secures campaign assets and creative approvals", "Translates client requirements into actionable briefs", "Provides high-touch account support", "Communicates performance insights to clients", "Optimises onboarding to reduce time-to-launch"] },
      { name: "Partnerships", mission: "Plans and implements promotions and events to increase sales and awareness.", resp: ["Executes the marketing strategy for Group services", "Analyses campaign KPIs and economic performance", "Monitors market trends and competitor activity", "Liaises across Legal, Administration and Support", "Manages the existing partner portfolio"] },
      { name: "Sales and Business Development", mission: "Grows and scales revenue by securing profitable new streams.", resp: ["Manages the full sales lifecycle from pitching to renewals", "Provides market feedback to develop advertising products", "Advocates the brand at industry events", "Meets and exceeds revenue targets", "Supports internationalisation into new markets"] },
      { name: "Telesales", mission: "Develops offline business and increases revenue with a customer-centric vision.", resp: ["Acquires customers through outbound calls, chat and email", "Proposes suitable travel solutions", "Produces incremental bookings", "Increases revenue through ancillary attach rates", "Monitors the sales funnel for bugs and bottlenecks"] },
      { name: "Ancillary Product Support & Operations (B2B)", mission: "Improves customer performance and operational efficiency through data insights.", resp: ["Analyses daily performance data for recommendations", "Supports Product and Tech with analysis and QA", "Takes ownership of customer performance reporting", "Tracks product metrics against quality standards", "Collaborates cross-functionally on improvements"] },
    ],
  },
  "Process, Quality & Delivery": {
    mission: "Ensures efficient and reliable execution",
    color: C.aqua,
    roles: [
      { name: "IT Service Management", mission: "Ensures governance and operational resilience through ITSM policies aligned to best practice.", resp: ["Applies ITSM policies and drives continuous improvement", "Manages the end-to-end incident lifecycle", "Provides on-call support and stakeholder communication", "Leads problem management initiatives", "Oversees change management with risk evaluation", "Produces incident reports using data analysis"] },
      { name: "Process & Implementation", mission: "Measures Customer Service process effectiveness and implements sustainable improvements.", resp: ["Maps, designs and improves Customer Service processes", "Owns agent workflows and Knowledge Base content", "Monitors process adherence and drives corrective actions", "Aligns processes across teams, sites and countries", "Supports tools used by Customer Service agents"] },
      { name: "Supply Connectivity and Operation", mission: "Ensures supply process effectiveness combining connectivity expertise with automation.", resp: ["Analyses connectivity metrics and provider performance", "Manages technical integrations for providers", "Oversees connectivity workflows and integration health", "Drives process automation and troubleshooting", "Maintains runbooks and SOPs"] },
      { name: "Program Management", mission: "Manages alignment between strategy and execution across a portfolio of projects.", resp: ["Integrates functional processes with cross-functional teams", "Manages organisational changes across product lines", "Identifies, launches and executes strategic initiatives", "Facilitates programme events and release planning", "Escalates and resolves impediments and risks"] },
      { name: "Project Management", mission: "Ensures planning and monitoring of high-impact strategic projects.", resp: ["Leads large-scale projects across products and functions", "Develops comprehensive project plans", "Monitors progress and synchronises stakeholders", "Evaluates results against success criteria", "Communicates status, risks and milestones"] },
    ],
  },
  Technology: {
    mission: "Builds the company's capabilities",
    color: C.sunset,
    roles: [
      { name: "Application Engineer", mission: "Builds and manages applications and processes that empower the business through automation and low-code.", resp: ["Manages and enhances core applications across departments", "Optimises and automates business processes", "Develops scalable solutions aligned to requirements", "Ensures system integrations and robust data flows", "Translates business requirements into technical deliverables"] },
      { name: "End User Service", mission: "Ensures employees can effectively use IT systems, software and hardware.", resp: ["Manages software environments and provides technical assistance", "Executes user account and access management", "Oversees hardware and asset management", "Authors technical documentation and SOPs", "Monitors support queues for timely resolution"] },
      { name: "Data Store Engineer", mission: "Designs, operates and evolves secure, scalable and reliable data infrastructure.", resp: ["Designs and maintains data infrastructure across environments", "Advises teams on data modelling and query optimisation", "Manages replicas and high-availability configurations", "Implements security best practices and compliance", "Develops automation and self-healing mechanisms"] },
      { name: "Network Engineer", mission: "Ensures effectiveness and improvement of the global network infrastructure.", resp: ["Designs and maintains LAN, WAN and VoIP connectivity", "Deploys security solutions including firewalls", "Monitors performance and troubleshoots outages", "Executes hardware and software upgrades", "Coordinates with vendors on new technologies"] },
      { name: "Service Reliability", mission: "Ensures round-the-clock stability through monitoring, triage and resolution.", resp: ["Monitors production alerts across observability tools", "Performs initial troubleshooting and escalation", "Uses log analysis to investigate issues", "Follows and maintains runbooks", "Uses AI and automation to improve efficiency"] },
      { name: "Site Reliability Engineer", mission: "Provides a secure, scalable platform with resilience and self-service at the core.", resp: ["Designs and maintains platforms and infrastructure", "Implements security best practices", "Uses AI to predict, detect and remediate issues", "Architects automation to scale systems", "Builds and manages CI/CD pipelines"] },
      { name: "Security Engineer", mission: "Detects, responds to and reduces security threats across environments.", resp: ["Maintains visibility across the attack surface", "Identifies, prioritises and tracks vulnerabilities", "Defines detection coverage and alerting rules", "Leads operational response to security incidents", "Operationalises threat intelligence"] },
      { name: "Engineering Manager", mission: "Drives delivery of high-quality technology outcomes balancing excellence with people growth.", resp: ["Manages career growth, expectations and performance", "Ensures delivery predictability and risk management", "Escalates blockers and manages dependencies", "Fosters psychological safety and trust", "Embeds an AI-first mindset and AI-assisted tools", "Drives talent acquisition and hiring"] },
      { name: "Software Architect", mission: "Manages and evolves architectural solutions that are scalable and resilient.", resp: ["Provides architectural guidance for programmes and platforms", "Defines and enforces architectural principles and patterns", "Identifies emerging technologies and assesses relevance", "Facilitates cross-domain integration", "Provides architectural consulting and mentorship"] },
      { name: "Software Engineer", mission: "Builds, delivers and maintains high-performance products for internal and external customers.", resp: ["Designs, writes and tests maintainable code", "Balances technical costs and build-vs-buy trade-offs", "Translates requirements into technical specifications", "Monitors performance and resolves reliability concerns", "Leverages AI-assisted development tools for coding and debugging", "Adopts an AI-first mindset to optimise the lifecycle"] },
    ],
  },
  Service: {
    mission: "Service enablement and operational excellence",
    color: C.sunrays,
    roles: [
      { name: "Customer Operations Support", mission: "Enables consistent and well-coordinated Customer Service delivery.", resp: ["Coordinates daily delivery across CS teams and vendors", "Manages escalations and cross-team resolutions", "Coordinates responses to technical incidents", "Supports airline platforms and systems", "Monitors performance and drives corrective actions"] },
      { name: "Technical Training", mission: "Provides technical training and knowledge documentation to empower resources.", resp: ["Designs training materials and instructional assets", "Organises the training plan across sites and vendors", "Delivers technical training to agents and trainers", "Maintains the knowledge base as a single source of truth", "Evaluates training effectiveness and refines content"] },
      { name: "Quality Assurance", mission: "Measures and improves Customer Service quality through evaluation and feedback.", resp: ["Evaluates interactions through quality scorecards", "Ensures consistent application of quality standards", "Monitors CSAT and NPS to identify risks", "Manages the Voice of the Customer framework", "Quantifies operational and financial impact of errors"] },
      { name: "Customer Service", mission: "Ensures seamless customer support across markets, products and channels.", resp: ["Supports customers across multiple channels post-booking", "Handles changes, cancellations, refunds and enquiries", "Manages high-complexity and sensitive cases", "Identifies pain points and process gaps", "Collaborates across Front, Back and Escalated Care"] },
      { name: "Business Trip", mission: "Manages the corporate traveller journey across the booking process.", resp: ["Processes business travel requests per policy", "Executes flight and accommodation bookings", "Organises complex itineraries for VIP clients", "Resolves urgent travel disruptions", "Maintains records of travel spend"] },
      { name: "Office & Facility Management", mission: "Delivers safe and efficient workplace operations.", resp: ["Manages daily office and reception operations", "Coordinates facility services including maintenance and security", "Ensures meeting rooms are functional and equipped", "Supports workplace safety and compliance", "Coordinates with external vendors"] },
    ],
  },
  Data: {
    mission: "Data-driven insights and intelligence",
    color: C.aqua,
    roles: [
      { name: "Data Scientist", mission: "Bridges business objectives and machine learning solutions.", resp: ["Conducts pattern discovery using ML and statistics", "Communicates findings to drive decisions", "Develops and deploys ML models", "Designs high-quality datasets for training", "Optimises algorithms for production"] },
      { name: "Data Analyst", mission: "Bridges business and data engineering, leveraging AI to accelerate analysis.", resp: ["Ensures metrics reflect business objectives", "Gathers data using AI-assisted querying to minimise extraction time", "Integrates AI tools across the analytical lifecycle", "Maintains quality control over AI-generated outputs", "Draws prescriptive product and business conclusions", "Presents findings to drive decisions"] },
      { name: "AI Automation Engineer", mission: "Designs and operates scalable AI-driven automation solutions.", resp: ["Designs AI-driven automation using GenAI and ML", "Integrates external AI services with internal systems via APIs", "Develops data pipelines for AI models", "Engineers NLP and Generative AI solutions", "Designs autonomous AI agents to orchestrate processes", "Optimises prompts and retrains models"] },
      { name: "Business Analyst", mission: "Bridges business, data and technology to translate needs into solutions.", resp: ["Elicits and documents business requirements", "Conducts gap analysis and maps processes", "Builds business cases for initiatives", "Designs functional specifications and user stories", "Drives automation initiatives and continuous improvement"] },
      { name: "Process Automation Analyst", mission: "Identifies and redesigns automation opportunities with AI, RPA and Low-code.", resp: ["Analyses workflows using Lean and BPMN", "Translates business needs into automation requirements", "Defines success metrics such as ROI", "Facilitates change management for automated solutions", "Trains peers on self-service automation tools"] },
      { name: "Digital Analyst", mission: "Manages governance and implementation of digital tracking tools.", resp: ["Designs tracking solutions for web and app", "Manages tag management systems", "Builds automated data pipelines and models", "Monitors data quality and tracking governance", "Troubleshoots tracking discrepancies"] },
      { name: "Data Engineer", mission: "Translates requirements into scalable data architectures, leveraging AI-assisted tools.", resp: ["Designs and maintains reliable, scalable data assets", "Owns data delivery across reporting and analytics", "Ensures data quality, leveraging AI to automate workflows", "Develops and optimises ETL/ELT pipelines", "Uses AI-assisted development to improve code quality"] },
      { name: "Data Governance", mission: "Ensures data consistency and integrity through governance practices.", resp: ["Establishes data access policies and standards", "Empowers clear data ownership models", "Maintains data lineage standards", "Sets data quality monitoring frameworks", "Integrates GDPR standards into governance"] },
      { name: "Data Architect", mission: "Designs and evolves a scalable, high-performance Data Platform.", resp: ["Designs and maintains the Cloud Data Platform", "Monitors and optimises platform resources and cost", "Defines security protocols across the platform", "Drives architectural choices and trade-offs", "Ensures architectures support enterprise AI initiatives"] },
      { name: "Machine Learning Engineer", mission: "Enables production-ready ML solutions and core SDKs.", resp: ["Solves problems with design patterns and clean code", "Designs real-time data pipelines", "Develops production-ready ML pipelines and SDKs", "Focuses on automation, CI/CD and model deployment", "Implements monitoring for model health and drift"] },
      { name: "Machine Learning Scientist", mission: "Applies state-of-the-art ML and operations research to business problems.", resp: ["Conducts advanced ML research", "Develops sophisticated algorithms", "Designs end-to-end ML pipelines", "Evaluates latest academic and industry research", "Prototypes and validates experimental models"] },
    ],
  },
};

const LEVELS = [
  { id: "BT", label: "Business / Technical Support", desc: "Specialised technical, support or administrative work executed to established procedures." },
  { id: "P", label: "Professional", desc: "Individual or project-based work, emphasis on discipline expertise over managing people." },
  { id: "M", label: "Managerial", desc: "Accountable for managing people, setting direction and deploying resources." },
];

function Pill({ children, bg, color }) {
  return (
    <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: bg, color }}>
      {children}
    </span>
  );
}

export default function App() {
  const [group, setGroup] = useState(null);
  const [role, setRole] = useState(null);
  const [level, setLevel] = useState("P");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  const allRoles = useMemo(() => {
    const out = [];
    Object.entries(FRAMEWORK).forEach(([g, data]) => {
      data.roles.forEach((r) => out.push({ ...r, group: g, color: data.color }));
    });
    return out;
  }, []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allRoles.filter((r) => r.name.toLowerCase().includes(q) || r.group.toLowerCase().includes(q)).slice(0, 8);
  }, [query, allRoles]);

  const generate = async () => {
    if (!role) return;
    setLoading(true);
    setError(null);
    setPlan(null);
    const prompt = `You are an AI capability coach for lastminute.com. Build a concise, practical AI development plan for an employee in this role, grounded strictly in their real responsibilities. Calibrate depth to the career band.

ROLE: ${role.name}
JOB FAMILY GROUP: ${role.group} (${FRAMEWORK[role.group].mission})
CAREER BAND: ${LEVELS.find((l) => l.id === level).label}
MISSION: ${role.mission}
RESPONSIBILITIES:
${role.resp.map((r) => "- " + r).join("\n")}

Respond ONLY with valid JSON, no preamble, no markdown fences. Use British English, no em dashes. Be specific to the responsibilities above, not generic. Schema:
{
  "reshaping": "2-3 sentences on how AI is reshaping THIS role specifically",
  "skillAreas": [{"area": "short name", "priority": "High|Medium|Low", "why": "one sentence tied to a responsibility"}],
  "tools": [{"name": "AI tool or technique", "useCase": "concrete task from the responsibilities it supports"}],
  "timeline": [{"phase": "Weeks 1-4", "actions": ["action", "action"]}, {"phase": "Month 2", "actions": ["action"]}, {"phase": "Month 3", "actions": ["action"]}],
  "starterPrompts": ["a prompt they could try today", "another"]
}
Provide 3-4 skillAreas, 3-4 tools, 3 timeline phases, 2-3 starterPrompts.`;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      const text = data.content.filter((i) => i.type === "text").map((i) => i.text).join("\n");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setPlan(parsed);
    } catch (e) {
      setError("Could not generate the plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setGroup(null);
    setRole(null);
    setQuery("");
    setPlan(null);
    setError(null);
  };

  const priorityColor = (p) => {
    if (p === "High") return C.pink;
    if (p === "Medium") return C.sunrays;
    return C.aqua;
  };

  return (
    <div className="min-h-screen w-full" style={{ background: C.lava, fontFamily: "'Ubuntu', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');`}</style>

      <div className="max-w-3xl mx-auto px-5 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.pink }}>
              <Sparkles size={20} color={C.white} />
            </div>
            <span className="text-sm tracking-wide font-light" style={{ color: C.aqua }}>lastminute.com · Learning & Talent Development</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: C.white }}>
            AI Upskilling Planner
          </h1>
          <p className="mt-2 text-base font-light" style={{ color: "#cbb8d6" }}>
            Pick your role from the Career Journey Framework and get a development plan for putting AI to work, mapped to what you actually do.
          </p>
        </div>

        {!plan && (
          <div className="mb-6">
            <div className="flex items-center gap-2 rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Search size={18} color={C.aqua} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search any role or job family..."
                className="bg-transparent outline-none w-full text-sm"
                style={{ color: C.white }}
              />
            </div>
            {searchResults.length > 0 && (
              <div className="mt-2 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {searchResults.map((r) => (
                  <button
                    key={r.name}
                    onClick={() => { setGroup(r.group); setRole(r); setQuery(""); }}
                    className="w-full text-left px-4 py-3 flex items-center justify-between hover:opacity-80 transition"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div>
                      <div className="text-sm font-medium" style={{ color: C.white }}>{r.name}</div>
                      <div className="text-xs" style={{ color: "#a892b5" }}>{r.group}</div>
                    </div>
                    <ChevronRight size={16} color={C.pink} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {!group && !plan && (
          <div>
            <div className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#a892b5" }}>Step 1 — Choose a job family group</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(FRAMEWORK).map(([g, data]) => (
                <button
                  key={g}
                  onClick={() => setGroup(g)}
                  className="text-left p-4 rounded-2xl transition hover:scale-[1.02]"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: data.color }} />
                    <span className="font-bold text-sm" style={{ color: C.white }}>{g}</span>
                  </div>
                  <div className="text-xs font-light" style={{ color: "#bda6c9" }}>{data.mission}</div>
                  <div className="text-xs mt-2" style={{ color: "#a892b5" }}>{data.roles.length} roles</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {group && !role && !plan && (
          <div>
            <button onClick={() => setGroup(null)} className="flex items-center gap-1 text-sm mb-4" style={{ color: C.aqua }}>
              <ArrowLeft size={15} /> All groups
            </button>
            <div className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#a892b5" }}>Step 2 — {group} · choose your role</div>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {FRAMEWORK[group].roles.map((r) => (
                <button
                  key={r.name}
                  onClick={() => setRole({ ...r, group, color: FRAMEWORK[group].color })}
                  className="text-left px-4 py-3 rounded-xl flex items-center justify-between transition hover:opacity-90"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <span className="text-sm font-medium pr-2" style={{ color: C.white }}>{r.name}</span>
                  <ChevronRight size={15} color={FRAMEWORK[group].color} />
                </button>
              ))}
            </div>
          </div>
        )}

        {role && !plan && (
          <div>
            <button onClick={() => setRole(null)} className="flex items-center gap-1 text-sm mb-4" style={{ color: C.aqua }}>
              <ArrowLeft size={15} /> {group} roles
            </button>
            <div className="p-5 rounded-2xl mb-5" style={{ background: C.sand }}>
              <Pill bg={role.color} color={C.white}>{role.group}</Pill>
              <h2 className="text-2xl font-bold mt-3" style={{ color: C.lava }}>{role.name}</h2>
              <p className="text-sm mt-1 mb-3" style={{ color: "#5a4a63" }}>{role.mission}</p>
              <div className="text-xs uppercase tracking-wider font-medium mb-2" style={{ color: "#8a7593" }}>Responsibilities</div>
              <ul className="space-y-1.5">
                {role.resp.map((r, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: "#3d2f45" }}>
                    <span style={{ color: role.color }}>›</span> {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#a892b5" }}>Step 3 — Career band</div>
            <div className="grid sm:grid-cols-3 gap-2.5 mb-6">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  className="text-left p-3 rounded-xl transition"
                  style={{
                    background: level === l.id ? "rgba(242,0,125,0.15)" : "rgba(255,255,255,0.05)",
                    border: level === l.id ? `1.5px solid ${C.pink}` : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="font-bold text-sm" style={{ color: C.white }}>{l.label}</div>
                  <div className="text-xs mt-1 font-light" style={{ color: "#bda6c9" }}>{l.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={generate}
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition hover:opacity-90"
              style={{ background: C.pink, color: C.white }}
            >
              {loading ? <><Loader2 size={18} className="animate-spin" /> Building your plan...</> : <><Sparkles size={18} /> Generate development plan</>}
            </button>
            {error && <p className="text-sm mt-3 text-center" style={{ color: C.sunrays }}>{error}</p>}
          </div>
        )}

        {plan && role && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <Pill bg={role.color} color={C.white}>{role.group} · {LEVELS.find((l) => l.id === level).label}</Pill>
                <h2 className="text-2xl font-bold mt-2" style={{ color: C.white }}>{role.name}</h2>
              </div>
              <button onClick={reset} className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl shrink-0" style={{ background: "rgba(255,255,255,0.08)", color: C.aqua }}>
                <RotateCcw size={14} /> New
              </button>
            </div>

            <div className="p-5 rounded-2xl mb-4" style={{ background: "linear-gradient(135deg, #441f72, #1e0023)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} color={C.sunrays} />
                <span className="text-xs uppercase tracking-wider font-medium" style={{ color: C.sunrays }}>How AI is reshaping this role</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: C.white }}>{plan.reshaping}</p>
            </div>

            <div className="p-5 rounded-2xl mb-4" style={{ background: C.sand }}>
              <div className="flex items-center gap-2 mb-3">
                <Target size={16} color={C.pink} />
                <span className="text-xs uppercase tracking-wider font-medium" style={{ color: "#8a7593" }}>Skills to develop</span>
              </div>
              <div className="space-y-2.5">
                {plan.skillAreas?.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full mt-0.5 shrink-0" style={{ background: priorityColor(s.priority), color: C.white }}>{s.priority}</span>
                    <div>
                      <div className="font-bold text-sm" style={{ color: C.lava }}>{s.area}</div>
                      <div className="text-sm" style={{ color: "#5a4a63" }}>{s.why}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl mb-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Wrench size={16} color={C.aqua} />
                <span className="text-xs uppercase tracking-wider font-medium" style={{ color: C.aqua }}>Tools & techniques to try</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {plan.tools?.map((t, i) => (
                  <div key={i} className="p-3 rounded-xl" style={{ background: "rgba(42,190,185,0.1)" }}>
                    <div className="font-bold text-sm" style={{ color: C.white }}>{t.name}</div>
                    <div className="text-xs mt-1" style={{ color: "#bda6c9" }}>{t.useCase}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl mb-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-2 mb-3">
                <CalendarClock size={16} color={C.sunrays} />
                <span className="text-xs uppercase tracking-wider font-medium" style={{ color: C.sunrays }}>Your 90-day path</span>
              </div>
              <div className="space-y-3">
                {plan.timeline?.map((t, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="shrink-0 w-1 rounded-full" style={{ background: role.color }} />
                    <div>
                      <div className="font-bold text-sm mb-1" style={{ color: C.white }}>{t.phase}</div>
                      <ul className="space-y-1">
                        {t.actions?.map((a, j) => (
                          <li key={j} className="text-sm flex gap-2" style={{ color: "#cbb8d6" }}>
                            <span style={{ color: role.color }}>·</span> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl" style={{ background: C.sand }}>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquareText size={16} color={C.pink} />
                <span className="text-xs uppercase tracking-wider font-medium" style={{ color: "#8a7593" }}>Prompts to try today</span>
              </div>
              <div className="space-y-2">
                {plan.starterPrompts?.map((p, i) => (
                  <div key={i} className="p-3 rounded-xl text-sm italic" style={{ background: "rgba(242,0,125,0.08)", color: "#3d2f45" }}>
                    "{p}"
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-10 text-xs font-light" style={{ color: "#6b5673" }}>
          Grounded in the lastminute.com Career Journey Framework
        </div>
      </div>
    </div>
  );
}
