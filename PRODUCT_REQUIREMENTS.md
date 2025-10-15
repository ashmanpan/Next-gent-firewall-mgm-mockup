# NextGen Firewall Management System - Product Requirements Document (PRD)

**Version:** 2.0
**Date:** October 15, 2025
**Document Owner:** Product Management & Engineering Team
**Status:** APPROVED FOR DEVELOPMENT

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Objectives](#2-product-vision--objectives)
3. [Current System Overview](#3-current-system-overview)
4. [Scope & Boundaries](#4-scope--boundaries)
5. [System Architecture](#5-system-architecture)
6. [Detailed Feature Requirements](#6-detailed-feature-requirements)
7. [AI Agents Catalog](#7-ai-agents-catalog)
8. [MCP Server Specifications](#8-mcp-server-specifications)
9. [Database Architecture](#9-database-architecture)
10. [API & Integration Requirements](#10-api--integration-requirements)
11. [Security & Compliance](#11-security--compliance)
12. [User Interface Requirements](#12-user-interface-requirements)
13. [Deployment Architecture](#13-deployment-architecture)
14. [Technical Stack](#14-technical-stack)
15. [Success Metrics & KPIs](#15-success-metrics--kpis)
16. [Implementation Roadmap](#16-implementation-roadmap)
17. [Appendices](#17-appendices)

---

## 1. Executive Summary

### 1.1 Product Overview

The NextGen Firewall Management System is an AI-powered, centralized platform for managing Cisco FTD/FMC firewall infrastructure at enterprise scale. The solution combines real-time monitoring, predictive analytics, automated configuration management, and intelligent decision-making capabilities to deliver a comprehensive security operations platform.

### 1.2 Business Value

- **Operational Efficiency**: Reduce manual firewall management tasks by 70%
- **Proactive Issue Detection**: Identify and resolve issues before they impact operations
- **Security Posture**: Maintain compliance with industry best practices automatically
- **Cost Reduction**: Reduce TAC escalations by 60% through automated RCA
- **Risk Mitigation**: Validate configuration changes with AI-powered impact analysis

### 1.3 Target Users

- **Network Operations Center (NOC)** - 24x7 monitoring and incident response
- **Security Operations Center (SOC)** - Threat detection and security policy management
- **Network Engineers** - Configuration management and troubleshooting
- **Security Architects** - Policy design and compliance validation
- **IT Management** - Reporting and compliance oversight

---

## 2. Product Vision & Objectives

### 2.1 Vision Statement

"To create an autonomous, AI-driven firewall management platform that transforms reactive network security operations into proactive, intelligent, and self-optimizing infrastructure management."

### 2.2 Core Objectives

1. **Real-Time Monitoring**: 360-degree visibility across all FTD/FMC devices
2. **Predictive Analytics**: Forecast issues 5-15 minutes before they occur
3. **Automated Operations**: Reduce manual interventions through intelligent automation
4. **Configuration Intelligence**: AI-powered config analysis and optimization
5. **Centralized Logging**: Single pane of glass for all firewall logs and syslogs
6. **Compliance Assurance**: Continuous validation against security best practices

---

## 3. Current System Overview

### 3.1 Existing Features (Mockups)

The current prototype includes the following dashboard components:

#### 3.1.1 Protocol CPU Monitoring
- Real-time CPU tracking for RTSP, SNMP, HTTPS/DPI, SSH protocols
- Predictive analytics for CPU spike detection (5-15 min lead time)
- Top CPU-contributing source identification
- Threshold-based alerting

#### 3.1.2 Zone Flow Analytics
- Zone-to-zone traffic visualization
- Top talker identification with bandwidth attribution
- Anomaly detection for unusual traffic patterns
- Session tracking per security zone

#### 3.1.3 Proactive Log Collection
- Autonomous showtech collection triggered by anomalies
- Pre-RCA data aggregation
- AI-powered log analysis
- TAC-ready report generation

#### 3.1.4 Interface Utilization Validation
- Multi-source validation (FTD + Switch SNMP)
- AI reconciliation engine for accuracy
- Discrepancy detection with root cause analysis
- 24-hour trend visualization

#### 3.1.5 Session Analytics
- Top session tracking with source/destination details
- Real-time bandwidth and byte accounting
- Application-layer visibility
- User and department attribution

#### 3.1.6 CPU Source/Destination Monitor
- Multi-dimensional CPU analytics
- Source AND destination tracking
- Multi-source validation (FMC API, SNMP, NetFlow)
- 96% confidence scoring

#### 3.1.7 FMC Showtech Automation
- Automated collection via FMC REST API
- Scheduled and event-triggered capture
- AI-powered issue detection and categorization
- Critical findings with actionable recommendations

#### 3.1.8 AI Agent Console
- Multi-agent investigation workflows
- Real-time agent collaboration display
- Autonomous problem-solving demonstrations
- Integration with Claude AI for conversational support

### 3.2 Technology Stack (Current)

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **UI Components**: Lucide React icons, Recharts for visualizations
- **AI Integration**: AWS Bedrock (Claude Sonnet 4.5)
- **Deployment**: AWS Amplify, Lambda functions
- **API**: RESTful endpoints via AWS API Gateway

---

## 4. Scope & Boundaries

### 4.1 In Scope

#### Phase 1: Core Infrastructure (Q1 2026)
- Central syslog collection system
- Log parsing and enrichment engine
- Time-series database for logs
- Knowledge base and RAG database implementation
- MCP servers for SSH, SNMP, Syslog, FMS/FMC integration

#### Phase 2: Configuration Intelligence (Q2 2026)
- Configuration analysis agent (10-section scoring)
- Best practices validation engine
- Recommendation agent for config optimization
- Configuration change history and versioning

#### Phase 3: Autonomous Configuration Management (Q3 2026)
- Intent-based configuration generation
- Human-in-the-loop approval workflows
- Dual authentication system
- Impact analysis engine
- Risk profiling system
- Scheduled deployment manager

#### Phase 4: Advanced Analytics & Optimization (Q4 2026)
- Predictive maintenance
- Capacity planning automation
- Compliance reporting and auditing
- Advanced threat correlation

### 4.2 Out of Scope

- Firewall hardware provisioning
- Physical network topology management
- Non-Cisco firewall platforms (initial release)
- SD-WAN management
- Load balancer management

---

## 5. System Architecture

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Next.js UI   │  │  Mobile App  │  │   CLI Tool   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  REST API    │  │  GraphQL API │  │  WebSocket   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                   AI Agent Orchestration                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Master Reasoning Agent (Coordinator)          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────┐│
│  │Data Coll│ │Topology │ │   RCA   │ │ Remediation│ │Config││
│  │  Agent  │ │  Agent  │ │  Agent  │ │   Agent    │ │Agent ││
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └──────┘│
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                      MCP Server Layer                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │SSH Server│  │SNMP Coll │  │  Syslog  │  │FMC API   │   │
│  │  (MCP)   │  │  (MCP)   │  │  Server  │  │ Gateway  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │  TimescaleDB │  │   Pinecone   │     │
│  │ (Relational) │  │ (Time-Series)│  │  (Vector DB) │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   MongoDB    │  │    Redis     │  │      S3      │     │
│  │ (Knowledge   │  │   (Cache)    │  │   (Blob      │     │
│  │     Base)    │  │              │  │   Storage)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                    Infrastructure Layer                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────┐│
│  │   FTD   │ │   FTD   │ │   FMC   │ │ Switch  │ │Syslog││
│  │Device 1 │ │Device 2 │ │ Manager │ │ (SNMP)  │ │Server││
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └──────┘│
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Component Descriptions

#### 5.2.1 Presentation Layer
- **Next.js UI**: Primary web-based interface
- **Mobile App**: iOS/Android app for on-the-go monitoring (future)
- **CLI Tool**: Command-line interface for automation scripts

#### 5.2.2 API Gateway Layer
- **REST API**: Traditional request/response endpoints
- **GraphQL API**: Flexible data querying for complex dashboards
- **WebSocket**: Real-time updates for live monitoring

#### 5.2.3 AI Agent Orchestration
- **Master Reasoning Agent**: Coordinates all sub-agents
- **Specialized Agents**: Domain-specific intelligence (detailed in Section 7)

#### 5.2.4 MCP Server Layer
- **SSH MCP Server**: Execute CLI commands on FTD devices
- **SNMP Collector**: Poll SNMP metrics from devices and switches
- **Syslog Server**: Centralized log collection
- **FMC API Gateway**: Interface with Firepower Management Center

#### 5.2.5 Data Layer
- **PostgreSQL**: Structured data (users, devices, configurations)
- **TimescaleDB**: Time-series data (metrics, logs, events)
- **Pinecone**: Vector embeddings for RAG
- **MongoDB**: Unstructured data (knowledge base, documents)
- **Redis**: Caching and real-time data
- **S3**: Blob storage (showtechs, backups, reports)

---

## 6. Detailed Feature Requirements

### 6.1 Central Logging & Syslog Management System

#### 6.1.1 Functional Requirements

**FR-LOG-001**: Centralized Syslog Collection
- **Description**: System SHALL collect syslogs from all managed FTD devices
- **Acceptance Criteria**:
  - Support syslog over TCP/UDP/TLS
  - Handle minimum 10,000 logs/second per device
  - Support syslog formats: BSD (RFC 3164), IETF (RFC 5424)
  - Auto-discovery of syslog sources
  - Configurable log retention (default: 90 days)

**FR-LOG-002**: Log Parsing & Enrichment
- **Description**: System SHALL parse and enrich all incoming logs
- **Acceptance Criteria**:
  - Parse Cisco FTD-specific log formats
  - Extract key fields: timestamp, severity, facility, message, device_id, source_ip, dest_ip, protocol, action
  - Enrich with geo-location data (source/dest IPs)
  - Enrich with device metadata (hostname, zone, model, version)
  - Normalize timestamps to UTC
  - Calculate derived fields (duration, bytes transferred, session count)

**FR-LOG-003**: Log Indexing & Search
- **Description**: System SHALL provide fast log search capabilities
- **Acceptance Criteria**:
  - Full-text search across all log fields
  - Support complex queries (AND, OR, NOT, wildcards)
  - Search response time < 3 seconds for queries spanning 24 hours
  - Support saved searches and search templates
  - Export search results (CSV, JSON, PDF)

**FR-LOG-004**: Real-Time Log Streaming
- **Description**: System SHALL support real-time log tailing
- **Acceptance Criteria**:
  - WebSocket-based streaming to UI
  - Configurable filters for streaming
  - Support multiple concurrent streaming sessions
  - Maximum lag < 1 second from log generation to UI display

**FR-LOG-005**: AI-Powered Log Monitoring
- **Description**: System SHALL continuously analyze logs using AI
- **Acceptance Criteria**:
  - Anomaly detection (statistical + ML-based)
  - Pattern recognition (attack signatures, misconfigurations)
  - Correlation engine (multi-device event correlation)
  - Automated alert generation
  - Alert suppression and de-duplication

#### 6.1.2 Non-Functional Requirements

**NFR-LOG-001**: Performance
- Process 100,000 logs/second aggregate across all devices
- Log ingestion latency < 500ms
- Search latency < 3 seconds for 24-hour queries

**NFR-LOG-002**: Scalability
- Support 1,000+ managed devices
- Horizontal scaling of log collectors
- Auto-scaling based on log volume

**NFR-LOG-003**: Reliability
- 99.9% uptime for log collection
- Zero log loss (buffering during outages)
- Automatic failover for log collectors

---

### 6.2 Knowledge Base & RAG Database System

#### 6.2.1 Functional Requirements

**FR-KB-001**: Knowledge Base Repository
- **Description**: System SHALL maintain a comprehensive knowledge base
- **Acceptance Criteria**:
  - Store Cisco FTD/FMC documentation (admin guides, release notes, CLI references)
  - Store troubleshooting guides and KB articles
  - Store configuration templates and best practices
  - Store historical incident reports and RCA documents
  - Support versioning of documents
  - Full-text search across all documents

**FR-KB-002**: RAG (Retrieval-Augmented Generation) Database
- **Description**: System SHALL implement vector-based semantic search
- **Acceptance Criteria**:
  - Convert all KB documents to vector embeddings (1536 dimensions)
  - Store embeddings in Pinecone vector database
  - Support semantic similarity search
  - Return top-k relevant documents (k=5 default)
  - Cache frequently accessed embeddings in Redis
  - Update embeddings when documents are modified

**FR-KB-003**: Intelligent Document Retrieval
- **Description**: System SHALL retrieve relevant context for AI agents
- **Acceptance Criteria**:
  - Hybrid search (keyword + semantic)
  - Query expansion using synonyms and related terms
  - Re-ranking based on relevance scores
  - Filter by document type, date, and source
  - Support multi-language queries (English primary, others future)

**FR-KB-004**: Knowledge Base Curation
- **Description**: System SHALL support KB management
- **Acceptance Criteria**:
  - Upload documents (PDF, DOCX, TXT, MD, HTML)
  - Automatic text extraction and chunking
  - Manual tagging and categorization
  - Approval workflow for new documents
  - Deduplication of content
  - Scheduled updates from Cisco support portal

#### 6.2.2 Data Requirements

**DR-KB-001**: Knowledge Base Content
```
Documents to Include:
1. Cisco FTD Configuration Guides (all versions)
2. Cisco FMC Administration Guides
3. CLI Command References
4. MIB References (SNMP)
5. Syslog Message Catalogs
6. Best Practices Documents
7. Troubleshooting Flowcharts
8. Release Notes and Bug Lists
9. Security Advisories
10. Internal Runbooks and SOPs
```

**DR-KB-002**: RAG Database Schema
```
Collection: kb_documents
Fields:
  - doc_id: UUID
  - title: String
  - content: Text
  - chunks: Array<String>  (chunked content for RAG)
  - doc_type: Enum (guide, reference, troubleshooting, bestpractice)
  - version: String (Cisco software version if applicable)
  - source: String (URL or file path)
  - tags: Array<String>
  - created_at: Timestamp
  - updated_at: Timestamp
  - embedding_id: String (reference to Pinecone)

Collection: kb_embeddings (Pinecone)
Fields:
  - id: String (chunk_id)
  - values: Array<Float> (1536 dimensions)
  - metadata:
      - doc_id: UUID
      - chunk_index: Integer
      - chunk_text: String (first 500 chars)
      - doc_type: String
      - version: String
```

---

### 6.3 Configuration Analysis System

#### 6.3.1 Configuration Analysis Agent (10-Section Scoring)

**FR-CONFIG-001**: Automated Configuration Retrieval
- **Description**: System SHALL automatically retrieve configs from all managed devices
- **Acceptance Criteria**:
  - Retrieve running config via SSH (show running-config)
  - Retrieve startup config via SSH (show startup-config)
  - Retrieve FMC policy configurations via API
  - Store configs in version control (Git)
  - Detect configuration drift (running vs startup)
  - Schedule daily config backups

**FR-CONFIG-002**: Configuration Parsing & Analysis
- **Description**: System SHALL parse and analyze firewall configurations
- **Acceptance Criteria**:
  - Parse Cisco FTD CLI configuration syntax
  - Extract key configuration elements:
    - Interfaces and zones
    - Access control policies
    - NAT rules
    - VPN configurations
    - Routing tables
    - SNMP settings
    - Logging configurations
    - User accounts and authentication
    - High availability settings
    - Performance tuning parameters
  - Build configuration dependency graph
  - Detect conflicting rules
  - Identify unused objects and rules

**FR-CONFIG-003**: Best Practices Scoring (10 Sections)

System SHALL evaluate configurations across 10 security sections:

**Section 1: Access Control Policies (Score: 0-100)**
- Rules:
  - Deny-by-default policy configured (10 points)
  - No "permit any any" rules (15 points)
  - Rules are ordered from most specific to least specific (10 points)
  - All rules have descriptions (10 points)
  - Unused rules identified and flagged (10 points)
  - Shadowed rules detected (10 points)
  - Rules use object groups (not inline addresses) (10 points)
  - Logging enabled on all deny rules (10 points)
  - No overly permissive rules (source/dest > /24) (10 points)
  - Access policies reviewed within last 90 days (5 points)

**Section 2: Network Segmentation & Zones (Score: 0-100)**
- Rules:
  - Minimum 3 security zones configured (10 points)
  - DMZ zone exists and is properly configured (15 points)
  - Management zone isolated from production (15 points)
  - Inter-zone policies explicitly defined (15 points)
  - Zone-based firewall policies enabled (15 points)
  - No direct internet access from internal zones without inspection (15 points)
  - Guest network isolation (if applicable) (10 points)
  - VLAN segmentation aligns with security zones (5 points)

**Section 3: NAT & Translation Policies (Score: 0-100)**
- Rules:
  - NAT policies documented and reviewed (10 points)
  - No overlapping NAT rules (15 points)
  - Static NAT used only where necessary (10 points)
  - Dynamic PAT pools configured for outbound traffic (10 points)
  - NAT hairpinning disabled (if not required) (10 points)
  - NAT table utilization < 80% (15 points)
  - Identity NAT documented with justification (10 points)
  - Twice NAT used sparingly (10 points)
  - NAT logging enabled for troubleshooting (10 points)

**Section 4: VPN Configuration (Score: 0-100)**
- Rules:
  - Strong encryption algorithms (AES-256, SHA-256) (20 points)
  - Perfect Forward Secrecy (PFS) enabled (15 points)
  - IKEv2 used instead of IKEv1 (15 points)
  - Certificate-based authentication preferred over PSK (15 points)
  - VPN split tunneling policy defined (10 points)
  - Dead Peer Detection (DPD) configured (10 points)
  - VPN redundancy configured (if HA required) (10 points)
  - Remote access VPN MFA enabled (5 points)

**Section 5: Logging & Monitoring (Score: 0-100)**
- Rules:
  - Centralized syslog server configured (20 points)
  - Logging level appropriate (informational or higher) (10 points)
  - Connection logging enabled for allowed traffic (15 points)
  - Deny rules log to syslog (15 points)
  - SNMP v3 configured (v1/v2c disabled) (15 points)
  - NetFlow/NSEL enabled for traffic analysis (10 points)
  - Log buffering configured (5 points)
  - Debug logging disabled in production (10 points)

**Section 6: High Availability & Redundancy (Score: 0-100)**
- Rules:
  - HA pair configured (if required) (25 points)
  - Stateful failover enabled (20 points)
  - HA health monitoring configured (15 points)
  - Failover interface dedicated (10 points)
  - HA failover tested within last 90 days (15 points)
  - Redundant uplinks configured (10 points)
  - HA preemption disabled (5 points)

**Section 7: Authentication & Authorization (Score: 0-100)**
- Rules:
  - Local admin account count ≤ 2 (10 points)
  - AAA server (RADIUS/TACACS+) configured (20 points)
  - Role-based access control (RBAC) implemented (15 points)
  - Privilege levels defined (15 points)
  - Password policy enforced (complexity, age, history) (15 points)
  - Idle timeout configured (< 15 minutes) (10 points)
  - Console and VTY authentication required (10 points)
  - SSH key-based authentication enabled (5 points)

**Section 8: Intrusion Prevention & Threat Detection (Score: 0-100)**
- Rules:
  - IPS/IDS enabled on all interfaces (20 points)
  - Intrusion policy set to Security Over Connectivity or Balanced (15 points)
  - Snort rules updated within last 7 days (15 points)
  - File policy configured for malware detection (15 points)
  - SSL/TLS inspection enabled (10 points)
  - URL filtering enabled (10 points)
  - DNS security enabled (10 points)
  - Advanced Malware Protection (AMP) enabled (5 points)

**Section 9: Performance & Resource Management (Score: 0-100)**
- Rules:
  - CPU utilization < 70% (average) (20 points)
  - Memory utilization < 85% (15 points)
  - Connection table utilization < 80% (15 points)
  - NAT table utilization < 80% (10 points)
  - QoS policies configured (if required) (10 points)
  - Traffic shaping policies defined (10 points)
  - Hardware offload enabled (if supported) (10 points)
  - Unused features/services disabled (10 points)

**Section 10: Compliance & Governance (Score: 0-100)**
- Rules:
  - Configuration change management process documented (15 points)
  - Configuration backups automated (daily minimum) (15 points)
  - Config change audit trail maintained (15 points)
  - Security policy review schedule defined (10 points)
  - Compliance with industry standards (PCI-DSS, HIPAA, etc.) (20 points)
  - Firewall firmware version is current (within 2 major releases) (10 points)
  - Security advisories reviewed and patched (10 points)
  - Documentation up-to-date (network diagrams, policy docs) (5 points)

**FR-CONFIG-004**: Scoring Report Generation
- **Acceptance Criteria**:
  - Generate overall score (average of 10 sections)
  - Generate per-section scores with color coding:
    - 90-100: Green (Excellent)
    - 75-89: Yellow (Good)
    - 60-74: Orange (Needs Improvement)
    - < 60: Red (Critical)
  - Generate detailed findings for each failed check
  - Provide remediation guidance for each issue
  - Track score trends over time
  - Support comparative analysis (device-to-device, site-to-site)
  - Export reports (PDF, HTML, JSON)

---

### 6.4 Recommendation Agent System

#### 6.4.1 Functional Requirements

**FR-RECOM-001**: Configuration Optimization Engine
- **Description**: System SHALL generate config optimization recommendations
- **Acceptance Criteria**:
  - Analyze current configuration
  - Compare against best practices (from Section 6.3)
  - Identify optimization opportunities:
    - Rule consolidation (merge similar rules)
    - Object group creation (replace repeated addresses)
    - Rule reordering (optimize hit counts)
    - Unused object cleanup
    - Performance tuning suggestions
  - Rank recommendations by impact (high, medium, low)
  - Estimate benefits (security improvement, performance gain, compliance)

**FR-RECOM-002**: Intelligent Recommendation Prioritization
- **Description**: System SHALL prioritize recommendations
- **Acceptance Criteria**:
  - Severity-based prioritization:
    - P0: Critical security vulnerabilities
    - P1: High-impact performance issues
    - P2: Compliance violations
    - P3: Best practice deviations
    - P4: Optimization opportunities
  - Consider dependencies between recommendations
  - Group related recommendations
  - Estimate implementation effort (time, risk)

**FR-RECOM-003**: Configuration Change Generation
- **Description**: System SHALL generate executable configuration changes
- **Acceptance Criteria**:
  - Generate Cisco CLI commands for remediation
  - Generate FMC API calls for policy changes
  - Include rollback commands
  - Validate syntax before presenting to user
  - Support dry-run mode (preview without applying)
  - Generate change summary and impact report

**FR-RECOM-004**: Recommendation Feedback Loop
- **Description**: System SHALL learn from user feedback
- **Acceptance Criteria**:
  - Track recommendation acceptance/rejection rates
  - Collect user feedback (helpful/not helpful)
  - Adjust recommendation engine based on feedback
  - Identify false positives
  - Improve accuracy over time using ML

---

### 6.5 Intent-Based Configuration Generation

#### 6.5.1 Functional Requirements

**FR-INTENT-001**: Natural Language Intent Parsing
- **Description**: System SHALL accept configuration intents in natural language
- **Acceptance Criteria**:
  - Support plain English configuration requests
  - Examples:
    - "Allow HTTPS traffic from DMZ web servers to the internet"
    - "Block all traffic from 10.50.0.0/16 to database zone"
    - "Create a VPN tunnel to AWS VPC 172.31.0.0/16"
    - "Enable IPS on all external-facing interfaces"
  - Extract key elements:
    - Action (allow, deny, enable, disable, create, modify, delete)
    - Source (IP, network, zone, object group)
    - Destination (IP, network, zone, object group)
    - Service (protocol, port, application)
    - Direction (inbound, outbound, bidirectional)
    - Additional context (logging, schedule, priority)

**FR-INTENT-002**: Intent Validation & Clarification
- **Description**: System SHALL validate and clarify ambiguous intents
- **Acceptance Criteria**:
  - Validate intent against existing policies
  - Detect conflicts with existing rules
  - Identify missing information
  - Request clarifications via conversational AI:
    - "Which web servers in the DMZ? (web-srv-01, web-srv-02, or all?)"
    - "Should this rule allow HTTP as well, or only HTTPS?"
    - "Should this rule apply to all devices or specific sites?"
  - Suggest related configurations:
    - "Would you also like to enable logging for this rule?"
    - "Should we create a corresponding NAT rule?"

**FR-INTENT-003**: Configuration Generation from Intent
- **Description**: System SHALL generate configuration from validated intent
- **Acceptance Criteria**:
  - Generate Cisco CLI commands
  - Generate FMC policy API calls
  - Include all necessary supporting configurations:
    - Object creation (network objects, service objects)
    - Policy rules
    - NAT rules (if required)
    - Logging configuration
    - Comments and descriptions
  - Follow naming conventions
  - Maintain idempotency (safe to run multiple times)

**FR-INTENT-004**: Multi-Device Configuration Orchestration
- **Description**: System SHALL apply configurations across multiple devices
- **Acceptance Criteria**:
  - Identify target devices based on intent
  - Generate device-specific configurations
  - Handle device capability differences
  - Order configuration steps correctly (dependencies)
  - Support phased rollout (device-by-device)
  - Track deployment status per device

---

### 6.6 Human-in-the-Loop (HITL) Approval System

#### 6.6.1 Functional Requirements

**FR-HITL-001**: Approval Workflow Engine
- **Description**: System SHALL implement approval workflows for configuration changes
- **Acceptance Criteria**:
  - Support multiple approval levels:
    - Level 1: Network Engineer (for low-risk changes)
    - Level 2: Senior Engineer + Security Team (for medium-risk changes)
    - Level 3: Architect + CISO + Change Board (for high-risk changes)
  - Risk-based approval routing
  - Approval delegation during off-hours
  - Approval expiration (changes require re-approval after 24 hours)
  - Emergency bypass (with full audit trail)

**FR-HITL-002**: Change Review Interface
- **Description**: System SHALL provide comprehensive change review UI
- **Acceptance Criteria**:
  - Display change summary:
    - Intent description
    - Affected devices
    - Configuration changes (diff format)
    - Impact analysis results
    - Risk assessment
    - Estimated downtime (if any)
  - Show AI-generated recommendations
  - Display similar past changes (and their outcomes)
  - Provide rollback plan
  - Allow inline comments and discussions
  - Support approval with conditions

**FR-HITL-003**: Approval Decision Tracking
- **Description**: System SHALL track all approval decisions
- **Acceptance Criteria**:
  - Record approver identity
  - Record approval timestamp
  - Record decision (approved, rejected, conditional, deferred)
  - Record justification comments
  - Support rejection with feedback (for AI learning)
  - Maintain immutable audit log

**FR-HITL-004**: Notification System
- **Description**: System SHALL notify stakeholders at each workflow stage
- **Acceptance Criteria**:
  - Email notifications
  - Slack/Teams integrations
  - In-app notifications
  - SMS for critical approvals
  - Escalation notifications (if approval delayed)
  - Deployment completion notifications

---

### 6.7 Dual Authentication System

#### 6.7.1 Functional Requirements

**FR-AUTH-001**: Primary Authentication
- **Description**: System SHALL support multiple authentication methods
- **Acceptance Criteria**:
  - Username/password (with password complexity requirements)
  - SSO via SAML 2.0 (Okta, Azure AD, etc.)
  - LDAP/Active Directory integration
  - OAuth 2.0 / OIDC
  - Session management (timeout after 15 min inactivity)

**FR-AUTH-002**: Multi-Factor Authentication (MFA)
- **Description**: System SHALL require MFA for critical operations
- **Acceptance Criteria**:
  - Support MFA methods:
    - TOTP (Google Authenticator, Authy)
    - Push notifications (Duo, Okta Verify)
    - SMS (fallback only)
    - Hardware tokens (YubiKey, RSA SecurID)
  - Require MFA for:
    - Configuration deployments
    - User management
    - System settings changes
    - Access to production environments
  - Remember device for 30 days (configurable)
  - Backup codes for MFA recovery

**FR-AUTH-003**: Dual Authorization (Two-Person Integrity)
- **Description**: System SHALL require dual authorization for high-risk changes
- **Acceptance Criteria**:
  - High-risk changes require two approvers:
    - Production firewall rule changes
    - VPN configuration changes
    - HA failover triggers
    - Bulk policy changes
  - Approvers must be from different teams (separation of duties)
  - Approvers cannot approve their own changes
  - Both approvers must authenticate within 1-hour window
  - Audit log of both approvals

**FR-AUTH-004**: Role-Based Access Control (RBAC)
- **Description**: System SHALL implement granular RBAC
- **Acceptance Criteria**:
  - Predefined roles:
    - **Viewer**: Read-only access to dashboards and logs
    - **Operator**: View + trigger investigations, collect showtechs
    - **Engineer**: Operator + create config changes (requires approval)
    - **Approver**: Engineer + approve changes (cannot approve own)
    - **Admin**: Full access including user management
    - **Auditor**: Read-only access + audit log viewing
  - Custom roles with granular permissions
  - Device-level access control (restrict by site/region)
  - Approval bypass for emergency accounts (with audit)

---

### 6.8 Impact Analysis Engine

#### 6.8.1 Functional Requirements

**FR-IMPACT-001**: Configuration Change Impact Analysis
- **Description**: System SHALL analyze impact of proposed configuration changes
- **Acceptance Criteria**:
  - Analyze affected components:
    - Impacted firewall rules (shadowing, conflicts)
    - Affected traffic flows (sessions that will be dropped/allowed)
    - Dependent configurations (NAT, routing, VPN)
    - Redundancy impact (HA implications)
  - Estimate impact scope:
    - Number of affected sessions
    - Number of affected users
    - Bandwidth impact
    - Applications affected
  - Identify potential issues:
    - Configuration conflicts
    - Policy violations
    - Performance degradation risks
    - Security gaps

**FR-IMPACT-002**: Traffic Simulation
- **Description**: System SHALL simulate traffic flow with proposed changes
- **Acceptance Criteria**:
  - Replay historical traffic against new config
  - Identify sessions that will change behavior:
    - Currently allowed → will be denied
    - Currently denied → will be allowed
    - Currently routed path A → will be routed path B
  - Estimate performance impact:
    - CPU utilization change
    - Connection table usage change
    - Latency impact
  - Generate traffic flow diagrams (before/after)

**FR-IMPACT-003**: Dependency Analysis
- **Description**: System SHALL map configuration dependencies
- **Acceptance Criteria**:
  - Build dependency graph:
    - Rules → Object groups → Network objects
    - NAT rules → ACLs
    - Interfaces → Zones → Policies
    - VPN → Crypto maps → ACLs
  - Identify cascading impacts
  - Detect orphaned objects
  - Warn about breaking changes

**FR-IMPACT-004**: Compliance Impact Assessment
- **Description**: System SHALL assess compliance impact
- **Acceptance Criteria**:
  - Check against compliance policies:
    - PCI-DSS requirements
    - HIPAA requirements
    - SOC 2 controls
    - Custom compliance policies
  - Identify compliance violations
  - Generate compliance deviation report
  - Require additional approvals for compliance-impacting changes

---

### 6.9 Risk Profiling System

#### 6.9.1 Functional Requirements

**FR-RISK-001**: Change Risk Scoring
- **Description**: System SHALL calculate risk score for each configuration change
- **Acceptance Criteria**:
  - Risk factors (weighted scoring):
    - **Change Scope** (30%):
      - Single device, single rule: 1 point
      - Multiple devices: 3 points
      - Multiple sites: 5 points
      - Global policy change: 10 points
    - **Impact Severity** (25%):
      - Non-production: 1 point
      - Staging/DR: 3 points
      - Production (off-peak): 5 points
      - Production (peak hours): 10 points
    - **Historical Failure Rate** (20%):
      - No similar changes failed: 0 points
      - 1-2 similar changes failed: 5 points
      - 3+ similar changes failed: 10 points
    - **Complexity** (15%):
      - Simple rule add/delete: 1 point
      - Rule modification: 3 points
      - Multi-step change: 5 points
      - Cascading dependencies: 10 points
    - **Reversibility** (10%):
      - Easy rollback: 0 points
      - Manual rollback required: 5 points
      - Cannot rollback: 10 points
  - Total Risk Score (0-100):
    - **Low Risk** (0-30): Auto-approve (single engineer)
    - **Medium Risk** (31-60): Require senior engineer approval
    - **High Risk** (61-85): Require dual approval + change window
    - **Critical Risk** (86-100): Require CAB approval + maintenance window

**FR-RISK-002**: Risk Mitigation Recommendations
- **Description**: System SHALL recommend risk mitigation strategies
- **Acceptance Criteria**:
  - Suggest safer alternatives:
    - Phased rollout instead of all-at-once
    - Test in DR environment first
    - Schedule during maintenance window
    - Enable extra logging for first 24 hours
  - Recommend rollback plans
  - Suggest pre-deployment testing
  - Identify required communication (to stakeholders)

**FR-RISK-003**: Historical Risk Analysis
- **Description**: System SHALL learn from past changes
- **Acceptance Criteria**:
  - Track change success/failure rates
  - Identify patterns in failed changes
  - Correlate risk scores with actual outcomes
  - Adjust risk model based on historical data
  - Highlight devices with high failure rates
  - Identify risky time windows (peak hours, holidays)

**FR-RISK-004**: Real-Time Risk Monitoring
- **Description**: System SHALL monitor risk during deployment
- **Acceptance Criteria**:
  - Monitor key metrics during change:
    - CPU/memory utilization
    - Connection drop rate
    - Latency increases
    - Error counters
    - HA status
  - Automatic rollback triggers:
    - CPU > 90% for 3 minutes
    - Connection drop rate > 5%
    - Device becomes unreachable
    - HA failover occurs
  - Alert deployment engineer immediately
  - Provide real-time dashboards during change

---

### 6.10 Scheduled Deployment Manager

#### 6.10.1 Functional Requirements

**FR-DEPLOY-001**: Deployment Scheduling
- **Description**: System SHALL support scheduled configuration deployments
- **Acceptance Criteria**:
  - Schedule deployment for future date/time
  - Support maintenance windows:
    - Predefined windows (every Sunday 2-6 AM)
    - Ad-hoc windows (next Saturday 10 PM - 2 AM)
    - Emergency windows (immediate with approvals)
  - Integrate with organization's change calendar
  - Prevent overlapping deployments (same device)
  - Send reminders before deployment (24h, 1h, 15min)

**FR-DEPLOY-002**: Pre-Deployment Validation
- **Description**: System SHALL validate readiness before deployment
- **Acceptance Criteria**:
  - Pre-deployment checks (1 hour before):
    - Device reachability
    - Current CPU/memory baseline
    - Config backup successful
    - Approvals still valid
    - No ongoing incidents
    - Required stakeholders available
  - Abort deployment if checks fail
  - Notify stakeholders of abort reason
  - Suggest next available window

**FR-DEPLOY-003**: Phased Deployment Support
- **Description**: System SHALL support phased rollouts
- **Acceptance Criteria**:
  - Deploy to devices in phases:
    - Phase 1: Non-production devices
    - Phase 2: 10% of production (canary)
    - Phase 3: 50% of production
    - Phase 4: 100% of production
  - Configurable phase duration (e.g., 2 hours between phases)
  - Automatic progression if no issues detected
  - Manual approval required for next phase (if configured)
  - Automatic rollback if issues detected in phase

**FR-DEPLOY-004**: Deployment Execution
- **Description**: System SHALL execute deployments reliably
- **Acceptance Criteria**:
  - Execution workflow:
    1. Pre-change backup
    2. Apply configuration (via SSH or FMC API)
    3. Verify configuration applied correctly
    4. Monitor for 15 minutes (configurable)
    5. Mark deployment as successful or failed
  - Handle connection failures (retry 3 times)
  - Detect partial deployments
  - Automatic rollback on failure
  - Generate deployment report

**FR-DEPLOY-005**: Post-Deployment Validation
- **Description**: System SHALL validate deployment success
- **Acceptance Criteria**:
  - Validation checks:
    - Configuration matches expected state
    - Device reachable and stable
    - CPU/memory within normal range
    - No error messages in logs
    - Traffic flowing as expected
    - HA status normal (if applicable)
  - Soak period monitoring (24 hours)
  - Alert on any anomalies during soak
  - Generate health report after soak

**FR-DEPLOY-006**: Rollback Management
- **Description**: System SHALL support configuration rollback
- **Acceptance Criteria**:
  - Automatic rollback triggers:
    - Deployment failure (device unreachable after config)
    - Validation failure (config mismatch)
    - Risk threshold exceeded (CPU/memory spike)
    - Manual abort by operator
  - Rollback methods:
    - Restore from backup (if available)
    - Revert configuration (opposite CLI commands)
    - FMC policy revert
  - Rollback verification
  - Alert stakeholders of rollback
  - Root cause analysis after rollback

---

## 7. AI Agents Catalog

### 7.1 Agent Hierarchy

```
Master Reasoning Agent (Coordinator)
│
├── I/O Agent (Input/Output Handler)
├── Data Collection Agent
├── Topology Agent
├── Root Cause Analysis (RCA) Agent
├── Remediation Agent
├── Anomaly Detection Agent
├── Configuration Analysis Agent
├── Recommendation Agent
├── Intent Parser Agent
├── Impact Analysis Agent
├── Risk Assessment Agent
└── Deployment Orchestration Agent
```

### 7.2 Agent Specifications

#### 7.2.1 Master Reasoning Agent

**Purpose**: Orchestrate all sub-agents, coordinate investigations, make high-level decisions

**Responsibilities**:
- Receive alerts and investigation requests
- Determine which agents to invoke
- Coordinate agent execution (sequential or parallel)
- Aggregate results from multiple agents
- Make go/no-go decisions
- Escalate to humans when necessary
- Learn from outcomes to improve orchestration

**Inputs**:
- Alerts from monitoring systems
- User investigation requests
- Scheduled tasks
- Agent results

**Outputs**:
- Agent invocation commands
- Consolidated reports
- Escalation notifications
- Workflow status updates

**Technologies**:
- AWS Bedrock (Claude Sonnet 4.5)
- LangChain for agent orchestration
- ReAct (Reasoning + Acting) framework

---

#### 7.2.2 I/O Agent (Input/Output Handler)

**Purpose**: Handle all external inputs and format outputs

**Responsibilities**:
- Receive incoming alerts from monitoring systems
- Parse alert payloads
- Normalize data formats
- Queue tasks for Master Agent
- Format outputs for different channels (UI, email, Slack, etc.)
- Manage real-time streaming to UI

**Inputs**:
- Alerts from Prometheus, Grafana, CloudWatch
- Syslogs
- SNMP traps
- User requests from UI

**Outputs**:
- Normalized alert objects
- Formatted reports
- Real-time status updates

**Technologies**:
- Python FastAPI for API handling
- Apache Kafka for message queuing
- WebSocket for real-time streaming

---

#### 7.2.3 Data Collection Agent

**Purpose**: Gather diagnostic data from multiple sources

**Responsibilities**:
- Collect showtechs via FMC API
- Execute CLI commands via SSH MCP server
- Poll SNMP metrics
- Retrieve logs from central syslog
- Query NetFlow data
- Retrieve configuration backups
- Aggregate data from multiple devices
- Store collected data in S3

**Inputs**:
- Device list
- Data collection requests
- Time ranges

**Outputs**:
- Collected data (raw and structured)
- Data collection status
- S3 object references

**Technologies**:
- Python scripts
- Paramiko (SSH)
- pysnmp (SNMP)
- AWS S3 SDK

---

#### 7.2.4 Topology Agent

**Purpose**: Map network topology and traffic flows

**Responsibilities**:
- Discover network topology (Layer 2 and Layer 3)
- Map device interconnections
- Identify traffic paths
- Map security zones
- Track interface mappings (FTD ↔ Switch ports)
- Visualize network diagrams
- Correlate topology with traffic data

**Inputs**:
- CDP/LLDP neighbor data
- Routing tables
- ARP tables
- NetFlow data
- Configuration files

**Outputs**:
- Topology graphs
- Traffic flow maps
- Zone-to-zone matrices
- Device relationship data

**Technologies**:
- NetworkX (graph library)
- Graphviz for visualization
- Neo4j (graph database)

---

#### 7.2.5 Root Cause Analysis (RCA) Agent

**Purpose**: Identify root causes of issues

**Responsibilities**:
- Analyze symptoms and correlate with known issues
- Search knowledge base for similar incidents
- Use RAG to retrieve relevant troubleshooting steps
- Apply diagnostic flowcharts
- Calculate confidence scores
- Generate RCA reports
- Learn from historical incidents

**Inputs**:
- Collected diagnostic data
- Alert context
- Historical incident data
- Knowledge base documents

**Outputs**:
- Root cause hypothesis
- Confidence score (0-100%)
- Evidence supporting conclusion
- Similar past incidents

**Technologies**:
- AWS Bedrock (Claude)
- Pinecone (RAG)
- XGBoost (ML models for pattern matching)

---

#### 7.2.6 Remediation Agent

**Purpose**: Propose and execute remediation actions

**Responsibilities**:
- Generate remediation plans
- Estimate fix time and impact
- Prioritize remediation steps
- Generate CLI commands or API calls
- Execute low-risk remediations automatically (if configured)
- Generate TAC escalation reports
- Track remediation outcomes

**Inputs**:
- RCA results
- Device configurations
- Best practices database
- Historical remediation data

**Outputs**:
- Remediation plans (step-by-step)
- CLI commands
- FMC API calls
- TAC-ready reports

**Technologies**:
- AWS Bedrock (Claude)
- Ansible for automation
- Python scripts

---

#### 7.2.7 Anomaly Detection Agent

**Purpose**: Detect unusual patterns in metrics and logs

**Responsibilities**:
- Monitor real-time metrics (CPU, memory, bandwidth, sessions)
- Analyze log patterns
- Detect statistical anomalies (Z-score, IQR)
- Detect behavioral anomalies (ML-based)
- Correlate anomalies across devices
- Generate anomaly alerts
- Suppress false positives

**Inputs**:
- Time-series metrics
- Log streams
- Historical baselines
- Alert rules

**Outputs**:
- Anomaly alerts
- Anomaly scores
- Affected devices
- Anomaly visualizations

**Technologies**:
- Prometheus for metrics
- TimescaleDB for storage
- Python (scikit-learn, TensorFlow) for ML
- Isolation Forest, LSTM models

---

#### 7.2.8 Configuration Analysis Agent

**Purpose**: Analyze firewall configurations for compliance and best practices

**Responsibilities**:
- Parse Cisco FTD configurations
- Evaluate against 10-section scoring framework (Section 6.3)
- Detect misconfigurations
- Identify security gaps
- Calculate best practices scores
- Track score trends
- Generate detailed findings reports

**Inputs**:
- Device configurations (running-config, startup-config)
- FMC policy exports
- Best practices rules database
- Compliance policy definitions

**Outputs**:
- Overall score (0-100)
- Section scores (10 sections)
- Detailed findings
- Remediation recommendations
- Compliance status

**Technologies**:
- Python (custom parsing logic)
- Cisco pyATS/Genie
- Rule engine (Drools or custom)

---

#### 7.2.9 Recommendation Agent

**Purpose**: Generate intelligent configuration optimization recommendations

**Responsibilities**:
- Analyze current configurations
- Identify optimization opportunities
- Rank recommendations by impact
- Generate configuration changes
- Estimate benefits (security, performance, compliance)
- Learn from user feedback

**Inputs**:
- Configuration analysis results
- Performance metrics
- Compliance requirements
- Historical change data

**Outputs**:
- Prioritized recommendations
- Estimated impact
- CLI commands for implementation
- Rollback commands

**Technologies**:
- AWS Bedrock (Claude)
- Reinforcement Learning (for feedback loop)

---

#### 7.2.10 Intent Parser Agent

**Purpose**: Parse natural language configuration intents

**Responsibilities**:
- Parse natural language requests
- Extract configuration intent (action, source, dest, service)
- Validate intent against policies
- Detect ambiguities
- Request clarifications
- Translate intent to configuration

**Inputs**:
- Natural language text
- Current configurations
- Policy database

**Outputs**:
- Structured intent object
- Clarifying questions
- Configuration draft

**Technologies**:
- AWS Bedrock (Claude)
- NLP libraries (spaCy, NLTK)
- Few-shot learning with examples

---

#### 7.2.11 Impact Analysis Agent

**Purpose**: Analyze impact of proposed configuration changes

**Responsibilities**:
- Simulate traffic flow with new config
- Identify affected sessions/users
- Detect conflicts and dependencies
- Estimate performance impact
- Assess compliance impact
- Generate impact reports

**Inputs**:
- Proposed configuration changes
- Current configurations
- Historical traffic data
- Compliance policies

**Outputs**:
- Impact score (low, medium, high, critical)
- Affected components list
- Traffic simulation results
- Conflict warnings

**Technologies**:
- Traffic replay engine
- Network simulator (GNS3 integration or custom)
- Dependency graph analysis

---

#### 7.2.12 Risk Assessment Agent

**Purpose**: Calculate risk scores for configuration changes

**Responsibilities**:
- Calculate risk scores (0-100)
- Apply risk factors (scope, severity, history, complexity, reversibility)
- Recommend risk mitigation
- Learn from past change outcomes
- Adjust risk model dynamically

**Inputs**:
- Impact analysis results
- Change details
- Historical failure data
- Device health metrics

**Outputs**:
- Risk score (0-100)
- Risk level (low, medium, high, critical)
- Risk factors breakdown
- Mitigation recommendations

**Technologies**:
- Rule-based scoring
- ML models (Random Forest, Gradient Boosting)
- Time-series analysis

---

#### 7.2.13 Deployment Orchestration Agent

**Purpose**: Orchestrate configuration deployments across devices

**Responsibilities**:
- Schedule deployments
- Execute pre-deployment checks
- Apply configurations to devices
- Monitor deployment progress
- Validate post-deployment
- Trigger rollbacks if needed
- Coordinate phased rollouts

**Inputs**:
- Approved change requests
- Deployment schedules
- Device health status

**Outputs**:
- Deployment status updates
- Success/failure notifications
- Rollback triggers
- Deployment reports

**Technologies**:
- Apache Airflow (workflow orchestration)
- Ansible (configuration management)
- Terraform (infrastructure as code)

---

## 8. MCP Server Specifications

### 8.1 MCP (Model Context Protocol) Overview

MCP servers provide standardized interfaces for AI agents to interact with external systems. Each MCP server exposes tools that agents can invoke.

### 8.2 MCP Server Catalog

#### 8.2.1 SSH MCP Server

**Purpose**: Execute CLI commands on FTD devices via SSH

**Tools Exposed**:

1. **execute_command**
   - **Description**: Execute a single CLI command
   - **Parameters**:
     - `device_id` (string): Device identifier
     - `command` (string): CLI command to execute
     - `timeout` (int, optional): Command timeout in seconds (default: 30)
   - **Returns**:
     - `stdout` (string): Command output
     - `stderr` (string): Error output (if any)
     - `exit_code` (int): Exit code (0 = success)

2. **execute_commands**
   - **Description**: Execute multiple CLI commands in sequence
   - **Parameters**:
     - `device_id` (string): Device identifier
     - `commands` (array of strings): List of CLI commands
     - `stop_on_error` (bool, optional): Stop if any command fails (default: true)
   - **Returns**:
     - Array of results (one per command)

3. **get_running_config**
   - **Description**: Retrieve running configuration
   - **Parameters**:
     - `device_id` (string): Device identifier
     - `section` (string, optional): Config section (e.g., "interface", "access-list")
   - **Returns**:
     - `config` (string): Configuration text

4. **get_device_info**
   - **Description**: Get device system information
   - **Parameters**:
     - `device_id` (string): Device identifier
   - **Returns**:
     - `hostname` (string)
     - `model` (string)
     - `version` (string)
     - `serial` (string)
     - `uptime` (string)

**Implementation**:
- Language: Python
- Libraries: Paramiko (SSH), asyncio
- Authentication: SSH keys (preferred) or username/password
- Connection pooling: Maintain persistent connections
- Error handling: Retry logic, connection timeouts

**Security**:
- Store SSH keys in AWS Secrets Manager
- Rotate credentials every 90 days
- Audit all commands executed
- Rate limiting (max 100 commands/min per device)

---

#### 8.2.2 SNMP Collector MCP Server

**Purpose**: Poll SNMP metrics from FTD devices and switches

**Tools Exposed**:

1. **get_metric**
   - **Description**: Get a single SNMP metric
   - **Parameters**:
     - `device_id` (string): Device identifier
     - `oid` (string): SNMP OID
     - `community` (string, optional): SNMP community (if SNMPv2c)
   - **Returns**:
     - `value` (variant): Metric value
     - `type` (string): Data type (integer, string, counter, gauge)

2. **get_interface_stats**
   - **Description**: Get interface statistics
   - **Parameters**:
     - `device_id` (string): Device identifier
     - `interface_name` (string): Interface name (e.g., "GigabitEthernet0/0")
   - **Returns**:
     - `in_octets` (integer)
     - `out_octets` (integer)
     - `in_errors` (integer)
     - `out_errors` (integer)
     - `in_discards` (integer)
     - `out_discards` (integer)
     - `speed` (integer): Interface speed in bps
     - `status` (string): "up" or "down"

3. **get_cpu_memory**
   - **Description**: Get CPU and memory utilization
   - **Parameters**:
     - `device_id` (string): Device identifier
   - **Returns**:
     - `cpu_usage` (float): CPU percentage (0-100)
     - `memory_used` (integer): Memory used in bytes
     - `memory_total` (integer): Total memory in bytes
     - `memory_usage` (float): Memory percentage (0-100)

4. **bulk_poll**
   - **Description**: Poll multiple metrics in bulk
   - **Parameters**:
     - `device_id` (string): Device identifier
     - `oids` (array of strings): List of OIDs to poll
   - **Returns**:
     - Array of {oid, value, type}

**Implementation**:
- Language: Python
- Libraries: pysnmp, aiosnmp
- Protocols: SNMPv2c, SNMPv3 (preferred)
- Polling frequency: Configurable (default: every 60 seconds)
- Bulk operations: Use SNMP GetBulk for efficiency

**Security**:
- Use SNMPv3 with authentication and encryption
- Store credentials in AWS Secrets Manager
- Restrict SNMP access by source IP
- Monitor for SNMP abuse

---

#### 8.2.3 Syslog Collector MCP Server

**Purpose**: Collect and parse syslogs from FTD devices

**Tools Exposed**:

1. **search_logs**
   - **Description**: Search logs by criteria
   - **Parameters**:
     - `device_id` (string, optional): Filter by device
     - `severity` (string, optional): Filter by severity (emergency, alert, critical, error, warning, notice, info, debug)
     - `message_pattern` (string, optional): Regex pattern for message
     - `start_time` (timestamp): Start of time range
     - `end_time` (timestamp): End of time range
     - `limit` (int, optional): Max results (default: 100)
   - **Returns**:
     - Array of log entries

2. **get_recent_logs**
   - **Description**: Get most recent logs
   - **Parameters**:
     - `device_id` (string, optional): Filter by device
     - `count` (int, optional): Number of logs (default: 100)
   - **Returns**:
     - Array of log entries

3. **stream_logs**
   - **Description**: Stream logs in real-time
   - **Parameters**:
     - `device_id` (string, optional): Filter by device
     - `severity` (string, optional): Filter by severity
   - **Returns**:
     - WebSocket stream of log entries

4. **parse_log**
   - **Description**: Parse a raw syslog message
   - **Parameters**:
     - `raw_message` (string): Raw syslog message
   - **Returns**:
     - `timestamp` (timestamp)
     - `severity` (string)
     - `facility` (string)
     - `device_id` (string)
     - `message` (string)
     - `parsed_fields` (object): Extracted fields (IPs, ports, actions, etc.)

**Implementation**:
- Language: Python
- Libraries: syslog-ng, Logstash (for parsing)
- Protocols: Syslog over TCP/UDP/TLS
- Storage: TimescaleDB for time-series log data
- Retention: 90 days default (configurable)

**Parsing Rules**:
- Use Grok patterns for Cisco FTD logs
- Extract fields:
  - Source/Dest IP and Port
  - Protocol
  - Action (permit/deny)
  - Interface
  - NAT translations
  - User information
  - Application

**Security**:
- Use syslog over TLS
- Validate syslog source IPs
- Rate limiting (prevent log flooding attacks)

---

#### 8.2.4 FMC API Gateway MCP Server

**Purpose**: Interface with Cisco Firepower Management Center (FMC) REST API

**Tools Exposed**:

1. **get_devices**
   - **Description**: List all managed devices
   - **Parameters**: None
   - **Returns**:
     - Array of device objects (id, name, model, version, status)

2. **get_device_details**
   - **Description**: Get detailed info for a device
   - **Parameters**:
     - `device_id` (string): Device UUID
   - **Returns**:
     - Device details object

3. **get_access_policies**
   - **Description**: List all access control policies
   - **Parameters**: None
   - **Returns**:
     - Array of policy objects

4. **get_policy_rules**
   - **Description**: Get rules for a specific policy
   - **Parameters**:
     - `policy_id` (string): Policy UUID
   - **Returns**:
     - Array of rule objects

5. **create_network_object**
   - **Description**: Create a network object
   - **Parameters**:
     - `name` (string): Object name
     - `value` (string): IP address or network (CIDR)
     - `type` (string): "Host" or "Network"
   - **Returns**:
     - Created object with UUID

6. **create_access_rule**
   - **Description**: Create an access control rule
   - **Parameters**:
     - `policy_id` (string): Policy UUID
     - `name` (string): Rule name
     - `action` (string): "ALLOW", "BLOCK", "TRUST"
     - `source` (object): Source objects
     - `destination` (object): Destination objects
     - `service` (object): Service/port objects
     - `position` (int, optional): Rule position
   - **Returns**:
     - Created rule with UUID

7. **deploy_config**
   - **Description**: Deploy configuration to devices
   - **Parameters**:
     - `device_ids` (array of strings): Device UUIDs
   - **Returns**:
     - Deployment job ID

8. **get_deployment_status**
   - **Description**: Check deployment status
   - **Parameters**:
     - `job_id` (string): Deployment job ID
   - **Returns**:
     - Status: "QUEUED", "DEPLOYING", "DEPLOYED", "FAILED"
     - Progress percentage
     - Error messages (if any)

9. **collect_showtech**
   - **Description**: Trigger showtech collection
   - **Parameters**:
     - `device_id` (string): Device UUID
   - **Returns**:
     - Job ID

10. **download_showtech**
    - **Description**: Download collected showtech
    - **Parameters**:
      - `job_id` (string): Showtech job ID
    - **Returns**:
      - S3 URL for download

**Implementation**:
- Language: Python
- Libraries: requests, aiohttp (async)
- Authentication: FMC API tokens (auto-refresh)
- API Version: FMC 7.x (6.x compatible)
- Rate limiting: Respect FMC API limits (120 req/min)

**Security**:
- Store FMC credentials in AWS Secrets Manager
- Use HTTPS only
- Validate SSL certificates
- Audit all API calls

---

#### 8.2.5 Firewall Device MCP Server (SSH + SNMP Combined)

**Purpose**: Unified interface for interacting with FTD devices

**Tools Exposed**:
- Combines tools from SSH MCP Server and SNMP Collector MCP Server
- Adds high-level convenience methods:

1. **health_check**
   - **Description**: Perform comprehensive health check
   - **Parameters**:
     - `device_id` (string): Device identifier
   - **Returns**:
     - `overall_status` (string): "healthy", "warning", "critical"
     - `cpu_usage` (float)
     - `memory_usage` (float)
     - `interface_status` (object): Status of all interfaces
     - `ha_status` (string, optional): HA pair status
     - `issues` (array): List of detected issues

2. **backup_config**
   - **Description**: Backup device configuration to S3
   - **Parameters**:
     - `device_id` (string): Device identifier
   - **Returns**:
     - `s3_url` (string): S3 location of backup
     - `timestamp` (timestamp): Backup timestamp

3. **restore_config**
   - **Description**: Restore configuration from backup
   - **Parameters**:
     - `device_id` (string): Device identifier
     - `backup_s3_url` (string): S3 location of backup
   - **Returns**:
     - Success/failure status

---

## 9. Database Architecture

### 9.1 Database Inventory

| Database | Purpose | Technology | Cloud Service |
|----------|---------|------------|---------------|
| **Relational DB** | Structured data (users, devices, configs) | PostgreSQL 15 | AWS RDS |
| **Time-Series DB** | Metrics, logs, events | TimescaleDB (PostgreSQL extension) | AWS RDS or self-hosted on EC2 |
| **Vector DB** | RAG embeddings | Pinecone | Pinecone Cloud |
| **Document DB** | Knowledge base, unstructured data | MongoDB | AWS DocumentDB or MongoDB Atlas |
| **Cache** | Real-time data, session management | Redis | AWS ElastiCache |
| **Blob Storage** | Showtechs, backups, reports | S3 | AWS S3 |

### 9.2 Database Schemas

#### 9.2.1 PostgreSQL (Relational Database)

**Tables**:

```sql
-- Users and Authentication
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),  -- NULL if SSO user
    role VARCHAR(50) NOT NULL,  -- Viewer, Operator, Engineer, Approver, Admin, Auditor
    mfa_enabled BOOLEAN DEFAULT false,
    mfa_secret VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Devices
CREATE TABLE devices (
    device_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hostname VARCHAR(255) NOT NULL,
    ip_address INET NOT NULL,
    device_type VARCHAR(50),  -- FTD, FMC
    model VARCHAR(100),
    software_version VARCHAR(50),
    serial_number VARCHAR(100) UNIQUE,
    site VARCHAR(100),
    region VARCHAR(100),
    ha_role VARCHAR(20),  -- active, standby, standalone
    ha_peer_id UUID REFERENCES devices(device_id),
    fmc_id UUID,  -- Reference to managing FMC
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_seen TIMESTAMP
);

-- Configuration Backups
CREATE TABLE config_backups (
    backup_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID REFERENCES devices(device_id),
    backup_type VARCHAR(50),  -- running-config, startup-config, fmc-policy
    config_text TEXT,
    config_hash VARCHAR(64),  -- SHA256 hash for change detection
    s3_url VARCHAR(500),
    size_bytes INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(user_id)
);

-- Configuration Change Requests
CREATE TABLE change_requests (
    request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    intent TEXT,  -- Natural language intent (if applicable)
    requested_by UUID REFERENCES users(user_id),
    requested_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50),  -- draft, pending_approval, approved, rejected, scheduled, deploying, deployed, failed, rolled_back
    risk_score INTEGER,  -- 0-100
    risk_level VARCHAR(20),  -- low, medium, high, critical
    approval_level INTEGER,  -- 1, 2, 3
    scheduled_at TIMESTAMP,
    deployed_at TIMESTAMP,
    notes TEXT
);

-- Change Request Devices (many-to-many)
CREATE TABLE change_request_devices (
    request_id UUID REFERENCES change_requests(request_id),
    device_id UUID REFERENCES devices(device_id),
    config_changes TEXT,  -- CLI commands or JSON
    PRIMARY KEY (request_id, device_id)
);

-- Change Approvals
CREATE TABLE change_approvals (
    approval_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES change_requests(request_id),
    approver_id UUID REFERENCES users(user_id),
    approval_level INTEGER,  -- 1, 2, 3
    decision VARCHAR(20),  -- approved, rejected, conditional, deferred
    comments TEXT,
    approved_at TIMESTAMP DEFAULT NOW(),
    mfa_verified BOOLEAN DEFAULT false
);

-- Deployment History
CREATE TABLE deployments (
    deployment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES change_requests(request_id),
    device_id UUID REFERENCES devices(device_id),
    status VARCHAR(50),  -- pending, in_progress, success, failed, rolled_back
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    error_message TEXT,
    rollback_performed BOOLEAN DEFAULT false,
    deployed_by UUID REFERENCES users(user_id)
);

-- Best Practices Scoring
CREATE TABLE config_scores (
    score_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID REFERENCES devices(device_id),
    scored_at TIMESTAMP DEFAULT NOW(),
    overall_score INTEGER,  -- 0-100
    section_1_score INTEGER,  -- Access Control
    section_2_score INTEGER,  -- Network Segmentation
    section_3_score INTEGER,  -- NAT
    section_4_score INTEGER,  -- VPN
    section_5_score INTEGER,  -- Logging
    section_6_score INTEGER,  -- High Availability
    section_7_score INTEGER,  -- Authentication
    section_8_score INTEGER,  -- Intrusion Prevention
    section_9_score INTEGER,  -- Performance
    section_10_score INTEGER, -- Compliance
    findings JSONB  -- Detailed findings per section
);

-- Recommendations
CREATE TABLE recommendations (
    recommendation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID REFERENCES devices(device_id),
    generated_at TIMESTAMP DEFAULT NOW(),
    priority VARCHAR(10),  -- P0, P1, P2, P3, P4
    category VARCHAR(100),  -- Security, Performance, Compliance, Optimization
    title VARCHAR(500),
    description TEXT,
    remediation TEXT,  -- CLI commands or steps
    estimated_effort VARCHAR(50),  -- Low, Medium, High
    estimated_impact VARCHAR(50),  -- Low, Medium, High
    status VARCHAR(50),  -- new, accepted, rejected, implemented, dismissed
    user_feedback TEXT,
    feedback_at TIMESTAMP
);

-- Audit Logs
CREATE TABLE audit_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    action VARCHAR(100),  -- login, logout, config_change, approval, deployment, etc.
    resource_type VARCHAR(100),  -- device, user, config, etc.
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

#### 9.2.2 TimescaleDB (Time-Series Database)

**Hypertables**:

```sql
-- Device Metrics
CREATE TABLE device_metrics (
    time TIMESTAMP NOT NULL,
    device_id UUID NOT NULL,
    metric_name VARCHAR(100) NOT NULL,  -- cpu_usage, memory_usage, connection_count, etc.
    value DOUBLE PRECISION,
    unit VARCHAR(50),  -- percent, bytes, count
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
);

-- Convert to hypertable
SELECT create_hypertable('device_metrics', 'time');

-- Interface Metrics
CREATE TABLE interface_metrics (
    time TIMESTAMP NOT NULL,
    device_id UUID NOT NULL,
    interface_name VARCHAR(100) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,  -- in_octets, out_octets, errors, etc.
    value BIGINT,
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
);

SELECT create_hypertable('interface_metrics', 'time');

-- Syslog Events
CREATE TABLE syslog_events (
    time TIMESTAMP NOT NULL,
    device_id UUID NOT NULL,
    severity VARCHAR(20),  -- emergency, alert, critical, error, warning, notice, info, debug
    facility VARCHAR(50),
    message TEXT,
    source_ip INET,
    dest_ip INET,
    source_port INTEGER,
    dest_port INTEGER,
    protocol VARCHAR(20),
    action VARCHAR(20),  -- permit, deny
    interface VARCHAR(100),
    user_name VARCHAR(100),
    application VARCHAR(100),
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
);

SELECT create_hypertable('syslog_events', 'time');

-- Create indexes for fast queries
CREATE INDEX idx_syslog_device_time ON syslog_events (device_id, time DESC);
CREATE INDEX idx_syslog_severity ON syslog_events (severity, time DESC);
CREATE INDEX idx_syslog_source_ip ON syslog_events (source_ip, time DESC);
CREATE INDEX idx_syslog_dest_ip ON syslog_events (dest_ip, time DESC);

-- Retention policy (delete data older than 90 days)
SELECT add_retention_policy('syslog_events', INTERVAL '90 days');
SELECT add_retention_policy('device_metrics', INTERVAL '180 days');
SELECT add_retention_policy('interface_metrics', INTERVAL '180 days');
```

---

#### 9.2.3 MongoDB (Knowledge Base)

**Collections**:

```javascript
// kb_documents
{
  _id: ObjectId,
  doc_id: UUID,
  title: String,
  content: String,  // Full document text
  chunks: [String],  // Chunked text for RAG (500-1000 tokens per chunk)
  doc_type: String,  // guide, reference, troubleshooting, bestpractice, runbook
  source: String,  // URL or file path
  version: String,  // Cisco software version (if applicable)
  tags: [String],
  metadata: {
    author: String,
    published_date: Date,
    updated_date: Date,
    word_count: Number,
    page_count: Number
  },
  created_at: Date,
  updated_at: Date,
  embedding_ids: [String]  // References to Pinecone vectors
}

// Indexes
db.kb_documents.createIndex({ doc_type: 1, version: 1 });
db.kb_documents.createIndex({ tags: 1 });
db.kb_documents.createIndex({ "$**": "text" });  // Full-text search
```

```javascript
// incident_history
{
  _id: ObjectId,
  incident_id: UUID,
  title: String,
  description: String,
  devices_affected: [UUID],
  symptoms: [String],
  root_cause: String,
  resolution_steps: [String],
  resolution_time_minutes: Number,
  severity: String,  // low, medium, high, critical
  category: String,  // performance, connectivity, security, configuration
  occurred_at: Date,
  resolved_at: Date,
  rca_report_url: String,  // S3 URL
  lessons_learned: String,
  related_incidents: [UUID]  // Similar incidents
}

// Indexes
db.incident_history.createIndex({ devices_affected: 1 });
db.incident_history.createIndex({ occurred_at: -1 });
db.incident_history.createIndex({ category: 1 });
```

---

#### 9.2.4 Pinecone (Vector Database)

**Index Configuration**:

```python
# Index name: firewall-kb
# Dimensions: 1536 (OpenAI text-embedding-ada-002 or AWS Bedrock Titan Embeddings)
# Metric: cosine similarity
# Pod type: p1.x1 (starter), p1.x2 (production)

# Vector format
{
  "id": "chunk_<doc_id>_<chunk_index>",
  "values": [0.123, -0.456, ...],  # 1536 dimensions
  "metadata": {
    "doc_id": "UUID",
    "doc_title": "Cisco FTD CLI Configuration Guide",
    "doc_type": "guide",
    "chunk_index": 5,
    "chunk_text": "First 500 chars of chunk...",
    "version": "7.2",
    "tags": ["configuration", "cli", "ftd"]
  }
}
```

**Query Example**:

```python
# Query: "How to troubleshoot high CPU on FTD?"
query_vector = embed_text("How to troubleshoot high CPU on FTD?")
results = index.query(
    vector=query_vector,
    top_k=5,
    include_metadata=True,
    filter={"doc_type": {"$in": ["troubleshooting", "guide"]}}
)
```

---

#### 9.2.5 Redis (Cache)

**Data Structures**:

```
# Session management
Key: session:<session_id>
Type: Hash
Fields: user_id, username, role, login_time, last_activity
TTL: 15 minutes (refresh on activity)

# Device health cache
Key: device:<device_id>:health
Type: Hash
Fields: cpu_usage, memory_usage, status, last_update
TTL: 60 seconds

# Real-time metrics
Key: metrics:<device_id>:<metric_name>
Type: Time Series (Redis TimeSeries module)
Values: Timestamp + Value pairs

# Query result cache
Key: query:<hash>
Type: String (JSON)
TTL: 5 minutes

# Agent workflow state
Key: workflow:<workflow_id>
Type: Hash
Fields: status, current_agent, results, start_time
TTL: 1 hour
```

---

## 10. API & Integration Requirements

### 10.1 REST API Specification

**Base URL**: `https://api.firewall-mgmt.company.com/v1`

**Authentication**: Bearer token (JWT)

**Endpoints**:

#### 10.1.1 Authentication

```
POST /auth/login
Request: { username, password }
Response: { access_token, refresh_token, expires_in }

POST /auth/mfa/verify
Request: { token, mfa_code }
Response: { access_token }

POST /auth/logout
Request: { refresh_token }
Response: { success }
```

#### 10.1.2 Devices

```
GET /devices
Query params: site, region, status
Response: [{ device_id, hostname, ip_address, status, ... }]

GET /devices/{device_id}
Response: { device_id, hostname, interfaces, ha_status, ... }

GET /devices/{device_id}/health
Response: { cpu, memory, connections, interfaces, status }

GET /devices/{device_id}/config
Response: { running_config, startup_config, last_backup }

POST /devices/{device_id}/backup
Response: { backup_id, s3_url }
```

#### 10.1.3 Monitoring

```
GET /metrics/{device_id}
Query params: metric_name, start_time, end_time, interval
Response: [{ timestamp, value }, ...]

GET /logs/search
Query params: device_id, severity, message_pattern, start_time, end_time, limit
Response: [{ timestamp, device_id, severity, message, ... }, ...]

GET /logs/stream
WebSocket endpoint for real-time log streaming
```

#### 10.1.4 Configuration Management

```
GET /config/scores/{device_id}
Response: { overall_score, section_scores, findings }

GET /recommendations/{device_id}
Response: [{ recommendation_id, priority, title, description, remediation }, ...]

POST /recommendations/{recommendation_id}/feedback
Request: { feedback: "accepted" | "rejected", comments }
Response: { success }
```

#### 10.1.5 Change Management

```
POST /changes
Request: { title, description, intent, device_ids }
Response: { request_id, status }

GET /changes/{request_id}
Response: { request_id, title, status, approvals, risk_score, ... }

POST /changes/{request_id}/approve
Request: { mfa_code }
Response: { success, approval_id }

POST /changes/{request_id}/deploy
Request: { scheduled_at }
Response: { deployment_id }

GET /changes/{request_id}/impact
Response: { impact_score, affected_components, simulation_results }
```

#### 10.1.6 AI Agents

```
POST /agents/investigate
Request: { scenario_type, device_id, context }
Response: { workflow_id }

GET /agents/workflow/{workflow_id}
Response: { status, current_agent, steps, results }

POST /agents/chat
Request: { message, conversation_history }
Response: { response, sources }
```

### 10.2 GraphQL API

**Endpoint**: `https://api.firewall-mgmt.company.com/graphql`

**Schema Sample**:

```graphql
type Query {
  devices(site: String, region: String): [Device!]!
  device(id: ID!): Device
  configScore(deviceId: ID!): ConfigScore
  changeRequests(status: String): [ChangeRequest!]!
}

type Mutation {
  createChangeRequest(input: ChangeRequestInput!): ChangeRequest!
  approveChange(requestId: ID!, mfaCode: String!): Approval!
  deployChange(requestId: ID!, scheduledAt: DateTime): Deployment!
}

type Subscription {
  deviceMetrics(deviceId: ID!): MetricUpdate!
  logStream(deviceId: ID, severity: String): LogEntry!
  workflowUpdates(workflowId: ID!): WorkflowStep!
}

type Device {
  id: ID!
  hostname: String!
  ipAddress: String!
  model: String
  version: String
  health: HealthStatus!
  config: Config
  scores: ConfigScore
  recommendations: [Recommendation!]!
}

type HealthStatus {
  status: String!
  cpuUsage: Float!
  memoryUsage: Float!
  uptime: Int!
}
```

### 10.3 WebSocket API

**Real-Time Channels**:

1. **Device Metrics Stream**
   - Channel: `/ws/metrics/{device_id}`
   - Data: { timestamp, metric_name, value }

2. **Log Stream**
   - Channel: `/ws/logs`
   - Filters: device_id, severity
   - Data: { timestamp, device_id, severity, message, ... }

3. **Workflow Updates**
   - Channel: `/ws/workflow/{workflow_id}`
   - Data: { agent_name, status, message, findings }

4. **Deployment Progress**
   - Channel: `/ws/deployment/{deployment_id}`
   - Data: { device_id, status, progress_percent, message }

### 10.4 Third-Party Integrations

#### 10.4.1 Slack Integration

- **Notifications**: Send alerts, approval requests, deployment status
- **Bot Commands**: Trigger investigations, approve changes
- **OAuth**: User authentication

#### 10.4.2 Microsoft Teams Integration

- **Adaptive Cards**: Rich notifications with action buttons
- **Bot**: Interactive chat for queries and approvals
- **OAuth**: User authentication

#### 10.4.3 ServiceNow Integration

- **Incident Management**: Auto-create incidents for critical alerts
- **Change Management**: Sync change requests with ServiceNow
- **CMDB**: Sync device inventory

#### 10.4.4 Jira Integration

- **Issue Tracking**: Create Jira tickets for recommendations
- **Change Tracking**: Link change requests to Jira epics/stories
- **API**: Jira REST API v3

#### 10.4.5 PagerDuty Integration

- **Alerting**: Trigger PagerDuty incidents for critical events
- **On-Call**: Integrate with on-call schedules
- **API**: PagerDuty Events API v2

---

## 11. Security & Compliance

### 11.1 Security Requirements

#### 11.1.1 Authentication & Authorization

**REQ-SEC-001**: Multi-Factor Authentication (MFA)
- MUST enforce MFA for all users
- MUST support TOTP, push notifications, hardware tokens
- MUST require MFA for critical operations

**REQ-SEC-002**: Role-Based Access Control (RBAC)
- MUST implement granular RBAC
- MUST support least privilege principle
- MUST audit all access attempts

**REQ-SEC-003**: Session Management
- MUST expire sessions after 15 minutes of inactivity
- MUST invalidate sessions on logout
- MUST limit concurrent sessions per user

#### 11.1.2 Data Protection

**REQ-SEC-004**: Encryption at Rest
- MUST encrypt all databases (AES-256)
- MUST encrypt S3 objects (SSE-S3 or SSE-KMS)
- MUST encrypt sensitive fields (passwords, secrets)

**REQ-SEC-005**: Encryption in Transit
- MUST use TLS 1.3 for all API calls
- MUST use SSH for device connections
- MUST use secure WebSocket (WSS)

**REQ-SEC-006**: Secrets Management
- MUST store secrets in AWS Secrets Manager
- MUST rotate secrets every 90 days
- MUST audit secret access

#### 11.1.3 Network Security

**REQ-SEC-007**: Network Segmentation
- MUST isolate production from non-production
- MUST use private subnets for databases
- MUST use security groups and NACLs

**REQ-SEC-008**: API Security
- MUST implement rate limiting (100 req/min per user)
- MUST validate all inputs
- MUST sanitize outputs (prevent XSS)
- MUST protect against SQL injection

#### 11.1.4 Audit & Logging

**REQ-SEC-009**: Audit Logging
- MUST log all user actions
- MUST log all configuration changes
- MUST log all deployments
- MUST log all approvals
- MUST retain audit logs for 1 year

**REQ-SEC-010**: Log Integrity
- MUST use write-once storage (S3 with object lock)
- MUST prevent log tampering
- MUST alert on log deletion attempts

### 11.2 Compliance Requirements

#### 11.2.1 Standards

**SOC 2 Type II**
- Implement security controls
- Annual third-party audit
- Continuous monitoring

**ISO 27001**
- Information Security Management System (ISMS)
- Risk assessment framework
- Incident response procedures

**PCI-DSS** (if applicable)
- Network segmentation
- Access control
- Encryption
- Logging and monitoring

#### 11.2.2 Compliance Features

**REQ-COMP-001**: Configuration Compliance
- MUST validate configs against compliance policies
- MUST generate compliance reports
- MUST alert on compliance violations

**REQ-COMP-002**: Change Management Compliance
- MUST require approvals for production changes
- MUST document all changes
- MUST maintain change history

**REQ-COMP-003**: Access Control Compliance
- MUST review access permissions quarterly
- MUST revoke access for terminated users within 24 hours
- MUST enforce separation of duties

---

## 12. User Interface Requirements

### 12.1 Dashboard Requirements

#### 12.1.1 Overview Dashboard

**Components**:
- System health summary (all devices)
- Active alerts count
- Recent deployments
- AI agent activity
- Quick actions

#### 12.1.2 Device Dashboards

**Existing** (from mockups):
1. Protocol Monitor
2. Zone Flow Analytics
3. Log Collection
4. Interface Validation
5. Session Analytics
6. CPU Analytics
7. FMC Showtech
8. AI Agent Console

**New Dashboards** (to be built):

9. **Configuration Compliance Dashboard**
   - Overall compliance score (average across devices)
   - Per-device compliance scores (10-section breakdown)
   - Trending compliance over time
   - Top non-compliant devices
   - Recommendations summary

10. **Change Management Dashboard**
    - Pending approvals
    - Scheduled deployments
    - Deployment history
    - Risk distribution (low, medium, high, critical)
    - Approval workflows

11. **Impact Analysis Dashboard**
    - Traffic simulation results
    - Affected components
    - Risk assessment
    - Dependency graphs

12. **Recommendation Dashboard**
    - Prioritized recommendations (by device)
    - Recommendation acceptance rates
    - Implementation tracking
    - Estimated benefits

### 12.2 User Workflows

#### 12.2.1 Configuration Change Workflow

1. User enters intent (natural language or form)
2. System parses intent and requests clarifications
3. System generates configuration
4. User reviews proposed changes
5. System performs impact analysis
6. System calculates risk score
7. System routes for approval (based on risk)
8. Approvers review and approve/reject
9. System schedules deployment
10. System executes deployment
11. System validates post-deployment
12. System sends completion notification

#### 12.2.2 Incident Investigation Workflow

1. Alert triggered (anomaly detected)
2. User clicks "Investigate with AI"
3. AI Agent Console opens with investigation type
4. Master Agent orchestrates investigation
5. UI displays real-time agent activity
6. Agents collect data, analyze, and identify root cause
7. System presents findings and recommendations
8. User accepts recommendation or escalates to TAC
9. System tracks remediation outcome

### 12.3 Mobile Responsiveness

**REQ-UI-001**: Responsive Design
- MUST support mobile devices (iOS, Android)
- MUST support tablets
- MUST adapt layout for screen sizes

**REQ-UI-002**: Mobile-Friendly Features
- Touch-friendly buttons (min 44x44 px)
- Swipe gestures for navigation
- Simplified dashboards for mobile

### 12.4 Accessibility

**REQ-UI-003**: WCAG 2.1 Level AA Compliance
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast (4.5:1 minimum)
- Alt text for images
- Accessible forms

---

## 13. Deployment Architecture

### 13.1 AWS Infrastructure

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CloudFront CDN                              │
│                    (Global Edge Locations)                           │
└─────────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────────┐
│                         Route 53 (DNS)                               │
└─────────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────────┐
│                  Application Load Balancer (ALB)                     │
└─────────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────────────┐       ┌───────────────┐     ┌───────────────┐
│   Frontend    │       │   API Gateway │     │  WebSocket    │
│  (Amplify)    │       │   (Lambda)    │     │   Server      │
│  Static Site  │       │               │     │   (ECS)       │
└───────────────┘       └───────────────┘     └───────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
        │  AI Agents    │ │  MCP Servers  │ │  Background   │
        │  (ECS Fargate)│ │  (ECS Fargate)│ │  Workers      │
        │               │ │               │ │  (Lambda)     │
        └───────────────┘ └───────────────┘ └───────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────────────┐       ┌───────────────┐     ┌───────────────┐
│  PostgreSQL   │       │  TimescaleDB  │     │  ElastiCache  │
│  (RDS)        │       │  (RDS/EC2)    │     │  (Redis)      │
└───────────────┘       └───────────────┘     └───────────────┘
        │                       │                       │
        │               ┌───────────────┐       ┌───────────────┐
        │               │  DocumentDB   │       │      S3       │
        │               │  (MongoDB)    │       │  (Backups,    │
        │               └───────────────┘       │   Reports)    │
        │                                       └───────────────┘
        │
┌───────────────────────────────────────────────────────────────────┐
│                    External Services                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │  Bedrock │  │ Pinecone │  │  Secrets │  │ CloudWatch│         │
│  │  (AI)    │  │ (Vector) │  │  Manager │  │ (Logging) │         │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │
└───────────────────────────────────────────────────────────────────┘
```

### 13.2 Compute Resources

| Component | Service | Instance Type | Scaling |
|-----------|---------|---------------|---------|
| Frontend | AWS Amplify | N/A (CDN) | Auto |
| API Gateway | AWS API Gateway + Lambda | N/A (serverless) | Auto |
| AI Agents | ECS Fargate | 4 vCPU, 8 GB RAM | Horizontal (2-10 tasks) |
| MCP Servers | ECS Fargate | 2 vCPU, 4 GB RAM | Horizontal (2-20 tasks) |
| WebSocket | ECS Fargate | 2 vCPU, 4 GB RAM | Horizontal (2-10 tasks) |
| Background Workers | Lambda | 1024 MB memory | Auto (concurrency: 100) |

### 13.3 Database Sizing

| Database | Service | Instance Type | Storage | IOPS |
|----------|---------|---------------|---------|------|
| PostgreSQL | RDS | db.r6g.xlarge (4 vCPU, 32 GB RAM) | 500 GB GP3 | 3,000 |
| TimescaleDB | RDS or EC2 | db.r6g.2xlarge (8 vCPU, 64 GB RAM) | 2 TB GP3 | 12,000 |
| Redis | ElastiCache | cache.r6g.large (2 vCPU, 13.07 GB RAM) | N/A (in-memory) | N/A |
| DocumentDB | DocumentDB | db.r6g.large (2 vCPU, 16 GB RAM) | 200 GB | 3,000 |
| S3 | S3 | N/A (object storage) | Unlimited | N/A |

### 13.4 High Availability

**REQ-HA-001**: Multi-AZ Deployment
- Deploy across 3 Availability Zones
- Use ALB for load balancing
- Use RDS Multi-AZ for databases

**REQ-HA-002**: Auto-Scaling
- Scale ECS tasks based on CPU/memory
- Scale Lambda based on concurrency
- Scale read replicas for databases

**REQ-HA-003**: Disaster Recovery
- Daily automated backups (RDS, S3)
- Cross-region replication (S3)
- RPO: 1 hour
- RTO: 4 hours

### 13.5 Monitoring & Observability

**Tools**:
- **CloudWatch**: Metrics, logs, alarms
- **X-Ray**: Distributed tracing
- **Prometheus + Grafana**: Custom metrics and dashboards
- **ELK Stack**: Centralized logging (optional, alternative to CloudWatch)

**Key Metrics**:
- API latency (p50, p95, p99)
- Error rates
- Agent execution time
- Database query performance
- Cache hit rates
- Deployment success rates

---

## 14. Technical Stack

### 14.1 Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework, SSR/SSG |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| Recharts | 2.x | Data visualization |
| Lucide React | Latest | Icons |
| TanStack Query | 5.x | Data fetching |
| Zustand | 4.x | State management |
| React Hook Form | 7.x | Form handling |
| Zod | 3.x | Schema validation |

### 14.2 Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.11+ | Primary backend language |
| FastAPI | 0.104+ | REST API framework |
| Pydantic | 2.x | Data validation |
| SQLAlchemy | 2.x | ORM |
| Alembic | 1.x | Database migrations |
| Celery | 5.x | Background task queue |
| LangChain | 0.1+ | AI agent orchestration |
| Paramiko | 3.x | SSH client |
| pysnmp | 5.x | SNMP client |
| boto3 | Latest | AWS SDK |

### 14.3 AI/ML

| Technology | Purpose |
|------------|---------|
| AWS Bedrock (Claude Sonnet 4.5) | Primary LLM for agents |
| Pinecone | Vector database for RAG |
| OpenAI Embeddings (or AWS Titan Embeddings) | Text embeddings |
| scikit-learn | ML models (anomaly detection) |
| XGBoost | Gradient boosting models |
| TensorFlow/PyTorch | Deep learning (optional) |

### 14.4 Infrastructure

| Technology | Purpose |
|------------|---------|
| Terraform | Infrastructure as Code |
| Docker | Containerization |
| AWS ECS Fargate | Container orchestration |
| AWS Lambda | Serverless functions |
| AWS RDS | Managed databases |
| AWS S3 | Object storage |
| AWS Secrets Manager | Secrets management |
| AWS CloudWatch | Monitoring |
| GitHub Actions | CI/CD |

---

## 15. Success Metrics & KPIs

### 15.1 Operational Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **System Uptime** | 99.9% | Monthly |
| **API Latency (p95)** | < 500ms | Real-time |
| **Log Ingestion Lag** | < 1 second | Real-time |
| **Alert Resolution Time** | < 5 minutes (automated) | Per incident |
| **Configuration Deployment Success Rate** | > 98% | Per deployment |
| **Rollback Rate** | < 5% | Per deployment |

### 15.2 User Productivity Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Time to Investigate Incident** | < 10 minutes | Per incident |
| **Time to Create Configuration Change** | < 5 minutes | Per change |
| **Manual Config Steps Eliminated** | > 70% | Quarterly |
| **TAC Escalations Reduced** | > 60% | Quarterly |
| **Configuration Compliance Score** | > 85% | Monthly |

### 15.3 AI/ML Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Anomaly Detection Accuracy** | > 95% | Monthly (with user feedback) |
| **RCA Confidence Score** | > 90% | Per investigation |
| **Recommendation Acceptance Rate** | > 60% | Monthly |
| **Intent Parsing Accuracy** | > 90% | Per intent |
| **Impact Analysis Accuracy** | > 85% | Per change (validated post-deployment) |

### 15.4 Business Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Cost per Managed Device** | < $50/month | Monthly |
| **Incident Response Cost Savings** | > $200K/year | Annually |
| **Configuration Error Rate** | < 2% | Quarterly |
| **Compliance Audit Pass Rate** | 100% | Per audit |

---

## 16. Implementation Roadmap

### 16.1 Phase 1: Core Infrastructure (Q1 2026)

**Duration**: 3 months

**Deliverables**:
- Central syslog collection system
- Log parsing and enrichment engine
- TimescaleDB deployment and schema
- PostgreSQL database setup
- MCP servers (SSH, SNMP, Syslog, FMC)
- Basic monitoring dashboards (existing mockups)

**Team**:
- 2 Backend Engineers
- 1 DevOps Engineer
- 1 Database Engineer

**Success Criteria**:
- Collect 100,000 logs/second
- Parse logs with < 1 second latency
- MCP servers operational for all devices
- Basic dashboards functional

---

### 16.2 Phase 2: Configuration Intelligence (Q2 2026)

**Duration**: 3 months

**Deliverables**:
- Knowledge base setup (MongoDB)
- RAG database (Pinecone)
- Configuration analysis agent (10-section scoring)
- Best practices validation engine
- Recommendation agent
- Configuration Compliance Dashboard

**Team**:
- 2 AI/ML Engineers
- 2 Backend Engineers
- 1 Frontend Engineer

**Success Criteria**:
- Score all devices against 10 sections
- Generate recommendations with > 60% acceptance rate
- Knowledge base contains 500+ documents
- RAG retrieval accuracy > 85%

---

### 16.3 Phase 3: Autonomous Configuration Management (Q3 2026)

**Duration**: 4 months

**Deliverables**:
- Intent-based config generation
- Human-in-the-loop approval system
- Dual authentication implementation
- Impact analysis engine
- Risk profiling system
- Scheduled deployment manager
- Change Management Dashboard
- Impact Analysis Dashboard

**Team**:
- 2 AI/ML Engineers
- 3 Backend Engineers
- 2 Frontend Engineers
- 1 Security Engineer

**Success Criteria**:
- Intent parsing accuracy > 90%
- Configuration deployment success rate > 98%
- Risk scoring accuracy > 85%
- Zero unauthorized deployments

---

### 16.4 Phase 4: Advanced Analytics & Optimization (Q4 2026)

**Duration**: 3 months

**Deliverables**:
- Predictive maintenance models
- Capacity planning automation
- Advanced threat correlation
- Compliance reporting automation
- Performance optimization

**Team**:
- 2 AI/ML Engineers
- 2 Backend Engineers
- 1 Data Scientist

**Success Criteria**:
- Predict issues 15 minutes in advance (80% accuracy)
- Automate capacity planning with 90% accuracy
- Generate compliance reports automatically

---

### 16.5 Implementation Timeline

```
Q1 2026          Q2 2026          Q3 2026          Q4 2026          Q1 2027
│                │                │                │                │
├─ Phase 1 ──────┤                │                │                │
                 ├─ Phase 2 ──────┤                │                │
                                  ├─ Phase 3 ──────────────────────┤
                                                   ├─ Phase 4 ──────┤
                                                                    │
                                                              GA Release
```

---

## 17. Appendices

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| **FTD** | Cisco Firepower Threat Defense - Next-generation firewall |
| **FMC** | Cisco Firepower Management Center - Centralized management platform |
| **MCP** | Model Context Protocol - Standardized interface for AI agents |
| **RAG** | Retrieval-Augmented Generation - AI technique combining retrieval and generation |
| **RCA** | Root Cause Analysis |
| **TAC** | Technical Assistance Center (Cisco support) |
| **HITL** | Human-in-the-Loop - Requiring human approval/oversight |
| **Showtech** | Diagnostic output bundle from Cisco devices |

### Appendix B: Reference Documents

1. Cisco FTD Configuration Guide (v7.2)
2. Cisco FMC REST API Guide (v7.2)
3. Cisco Syslog Message Reference
4. SNMP MIB References (CISCO-FIREWALL-MIB)
5. AWS Bedrock Developer Guide
6. Pinecone Documentation
7. TimescaleDB Best Practices

### Appendix C: Assumptions

1. All FTD devices are running version 7.0 or later
2. FMC is accessible via API (REST API enabled)
3. Network connectivity between management platform and devices (SSH, SNMP, Syslog)
4. AWS infrastructure is available and approved
5. Budget allocated for cloud services and third-party APIs
6. Security approvals obtained for AI/ML usage

### Appendix D: Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| AI model hallucinations | High | Medium | Implement confidence scoring, human review for critical changes |
| Configuration deployment failures | High | Low | Pre-deployment validation, automatic rollback, phased rollouts |
| Scalability bottlenecks | Medium | Medium | Load testing, auto-scaling, performance optimization |
| Security vulnerabilities | High | Low | Security audits, penetration testing, code reviews |
| Compliance violations | High | Low | Continuous compliance monitoring, automated checks |
| Vendor API changes (Cisco FMC) | Medium | Medium | API versioning, compatibility testing, abstraction layer |
| Third-party service outages (AWS, Pinecone) | Medium | Low | Multi-region deployment, fallback mechanisms |

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Manager | _______________ | _______________ | _______________ |
| Engineering Lead | _______________ | _______________ | _______________ |
| Security Architect | _______________ | _______________ | _______________ |
| Operations Manager | _______________ | _______________ | _______________ |

---

**END OF DOCUMENT**

*This Product Requirements Document is a living document and will be updated as requirements evolve and new insights are gained during development.*
