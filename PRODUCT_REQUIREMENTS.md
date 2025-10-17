# Cisco Security AI Powered Management Center - Product Requirements Document

**Version:** 2.2
**Date:** October 16, 2025
**Status:** APPROVED FOR DEVELOPMENT
**Live Demo**: <https://ai-firewall-mgmt.ciscoaidemo.com/>

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Objectives](#2-product-vision--objectives)
3. [Scope & Boundaries](#3-scope--boundaries)
4. [System Architecture](#4-system-architecture)
5. [Core Features (Summary)](#5-core-features-summary)
6. [AI Agents](#6-ai-agents)
7. [MCP Server Specifications](#7-mcp-server-specifications)
8. [Database Architecture](#8-database-architecture)
9. [Identity & Access Management (IAM)](#9-identity--access-management-iam)
10. [API & Integration Requirements](#10-api--integration-requirements)
11. [Technical Stack](#11-technical-stack)
12. [Implementation Phases](#12-implementation-phases)
13. [Appendices](#appendices)

---

## 1. Executive Summary

The Cisco Security AI Powered Management Center is an AI-powered platform for managing Cisco FTD/FMC firewall infrastructure. It combines real-time monitoring, predictive analytics, automated configuration management, and intelligent decision-making.

**Live Demo**: Access the working prototype at <https://ai-firewall-mgmt.ciscoaidemo.com/>

**Key Benefits:**
- Reduce manual firewall management tasks by 70%
- Identify and resolve issues proactively
- Maintain compliance automatically
- Reduce TAC escalations by 60% through automated RCA
- Validate configuration changes with AI-powered impact analysis

**Target Users:** NOC, SOC, Network Engineers, Security Architects, IT Management

---

## 2. Product Vision & Objectives

**Vision:** Create an autonomous, AI-driven firewall management platform that transforms reactive network security operations into proactive, intelligent, and self-optimizing infrastructure management.

**Core Objectives:**
1. Real-time monitoring with 360-degree visibility
2. Predictive analytics (forecast issues 5-15 minutes in advance)
3. Automated operations with intelligent automation
4. AI-powered configuration analysis and optimization
5. Centralized logging and syslog management
6. Continuous compliance validation

---

## 3. Scope & Boundaries

### 3.1 In Scope

#### Phase 1: Core Infrastructure (Q1 2026)
- Central syslog collection system (10,000 logs/second per device)
- Log parsing and enrichment engine with geo-location data
- TimescaleDB for time-series log storage
- Knowledge base and RAG database implementation (Pinecone)
- MCP servers for SSH, SNMP, Syslog, and FMC API integration
- Basic UI dashboards for monitoring and log search
- Master Reasoning Agent and Data Collection Agent

#### Phase 2: Configuration Intelligence (Q2 2026)
- Configuration Analysis Agent with 10-section scoring system
- Best practices validation engine
- Recommendation Agent for configuration optimization
- Configuration backup and versioning system
- Compliance reporting dashboard
- Configuration change history tracking

#### Phase 3: Autonomous Configuration Management (Q3 2026)
- Intent-based configuration generation from natural language
- Human-in-the-loop (HITL) approval workflows
- Multi-level authorization and MFA for critical operations
- Impact Analysis Agent for change assessment
- Risk Assessment Agent with 0-100 scoring
- Scheduled deployment manager with rollback capability
- Deployment orchestration and phased rollouts

#### Phase 4: Advanced Analytics & Optimization (Q4 2026)
- Anomaly Detection Agent with ML models
- Predictive maintenance (5-15 minute advance warnings)
- Capacity planning automation
- Compliance reporting and continuous auditing
- Advanced threat correlation across multiple data sources
- Performance optimization recommendations

### 3.2 Out of Scope

**Hardware & Physical Infrastructure:**
- Firewall hardware provisioning and procurement
- Physical network cabling and topology management
- Data center facilities management

**Non-Cisco Platforms:**

- Palo Alto Networks firewalls
- Fortinet FortiGate devices
- Check Point firewalls
- Any other third-party firewall vendors

**Other Network Components:**

- SD-WAN configuration and management
- Load balancer management
- Router and switch configuration (non-security related)
- Wireless access point management

**Future Considerations:**

- Mobile application (planned for 2027)
- Advanced ML model training interface
- Integration with additional Cisco security products (Umbrella, Secure Endpoint)

---

## 4. System Architecture

**Current Implementation**: View the live system at <https://ai-firewall-mgmt.ciscoaidemo.com/>

```text
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│                  ┌──────────────┐                           │
│                  │ Next.js UI   │                           │
│                  │ (Web Portal) │                           │
│                  └──────────────┘                           │
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
│  │   MongoDB    │  │    Redis     │  │    MinIO     │     │
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

**Key Components:**

1. **Presentation Layer**:
   - **Next.js Web UI**: Primary user interface for dashboards, configuration, and management
   - **Reference**: See live demo at <https://ai-firewall-mgmt.ciscoaidemo.com/>
   - **Future**: Mobile app (planned for 2027, out of scope for initial release)

2. **API Gateway Layer**:
   - **REST API**: Standard HTTP API for CRUD operations
   - **GraphQL API**: Flexible query API for complex data retrieval
   - **WebSocket**: Real-time bidirectional communication for live updates

3. **AI Agent Orchestration**:
   - **Master Reasoning Agent**: Central coordinator for all AI agents
   - **Specialized Agents**: Domain-specific agents (12 agents total)
   - **LangChain**: Agent orchestration framework
   - **LLM Provider**: Claude Sonnet 4.5 for reasoning (deployment method TBD by development agency)

4. **MCP Server Layer**:
   - **SSH MCP Server**: Direct device CLI access and command execution
   - **SNMP MCP Server**: Metrics collection (CPU, memory, bandwidth, interface stats)
   - **Syslog Server**: Centralized log collection and parsing
   - **FMC API Gateway**: Firepower Management Center REST API integration

5. **Data Layer**:
   - **PostgreSQL**: Relational data (users, devices, configurations, approvals)
   - **TimescaleDB**: Time-series data (logs, metrics, performance data)
   - **Vector Database**: Embeddings for semantic search (vendor TBD by development agency)
   - **MongoDB**: Knowledge base documents and unstructured data
   - **Redis**: Caching, real-time data, session management
   - **MinIO**: S3-compatible blob storage (showtechs, config backups, reports)
   - **Splunk Enterprise**: Centralized log management

6. **Infrastructure Layer**:
   - **FTD Devices**: Cisco Firepower Threat Defense firewalls
   - **FMC Manager**: Firepower Management Center
   - **Network Devices**: Switches (SNMP sources for validation)
   - **Syslog Sources**: External syslog servers and appliances

---

## 5. Core Features (Summary)

### 5.1 Central Logging & Syslog Management

- Collect syslogs from all managed FTD devices (10,000 logs/second per device)
- Parse and enrich logs with geo-location and device metadata
- Fast search capabilities (< 3 seconds for 24-hour queries)
- Real-time log streaming to UI (< 1 second lag)
- AI-powered anomaly detection and correlation
- **Proactive Log Collection**: Automated log collection without manual intervention

### 5.2 Automated Showtech Collection

**FMC Showtech Collection**:

- Automated collection from Firepower Management Center (FMC)
- Centralized diagnostic gathering via FMC REST API
- Scheduled collection (daily, weekly, on-demand)
- Event-triggered collection (on errors, failures, anomalies)
- Automatic upload to MinIO storage with versioning
- Retention policy: 1 year (configurable)

**Predictive Showtech Collection**:

- **AI-driven proactive collection**: System auto-collects showtech data in anticipation of predicted issues
- **Trigger conditions**:
  - Predicted CPU spikes (5-15 minutes advance warning)
  - Predicted memory leaks
  - Predicted interface failures
  - Predicted connection exhaustion
  - Anomalous traffic patterns detected
- **Pre-RCA data aggregation**: Showtech collected before issue occurs for faster root cause analysis
- **Storage**: Showtechs stored with incident context (timestamp, predicted issue, device ID, prediction confidence)
- **Notification**: Alert sent to operators when showtech is auto-collected with prediction details

**Showtech Features**:

- **Collection Methods**:
  - Via SSH (execute `show tech-support` command)
  - Via FMC REST API (centralized collection)
  - Selective showtech (specific modules: routing, firewall, VPN, interfaces)
- **Storage in MinIO**:
  - **All showtech outputs stored in MinIO object storage**
  - Bucket: `firewall-mgmt-data/showtechs/{device_id}/{timestamp}/`
  - File format: Plain text (`.txt`) and compressed (`.tar.gz`)
  - Retention: 1 year (configurable)
  - Automatic lifecycle management (archive to cold storage)
  - Searchable via metadata (device ID, timestamp, collection reason, prediction context)
- **Parsing & Analysis**:
  - Extract key diagnostic information
  - Highlight errors and warnings
  - Cross-reference with known issues in knowledge base
  - AI-powered issue detection and categorization
- **TAC-Ready Reports**:
  - Generate formatted reports ready for Cisco TAC submission
  - Include device info, logs, configurations, and diagnostic output
  - Automatic sanitization (remove sensitive data)
  - Direct download from MinIO via pre-signed URLs
- **Integration with RCA Agent**:
  - Showtech data automatically fed to Root Cause Analysis agent
  - AI analyzes showtech for issue patterns
  - Recommendations generated with remediation steps
  - Historical showtech comparison for trend analysis

### 5.3 Knowledge Base & RAG System

- Store Cisco documentation, troubleshooting guides, best practices
- Vector-based semantic search (vector database vendor TBD by development agency)
- Hybrid search (keyword + semantic)
- Automatic document updates from Cisco support portal
- Context retrieval for AI agents

### 5.4 Configuration Analysis

- Automatic configuration retrieval from devices (daily backups)
- Parse and analyze firewall configurations
- Evaluate against security best practices
- Score configurations across key areas:
  - Access control policies
  - Network segmentation
  - NAT policies
  - VPN configuration
  - Logging & monitoring
  - High availability
  - Authentication
  - Intrusion prevention
  - Performance & resource management
  - Compliance & governance
- Generate reports with remediation guidance

### 5.5 Recommendation Engine

- Analyze current configurations
- Generate optimization recommendations (rule consolidation, object cleanup, etc.)
- Prioritize by severity (P0-P4)
- Generate executable CLI commands and FMC API calls
- Include rollback commands
- Learn from user feedback

### 5.6 Intent-Based Configuration

- Accept natural language configuration requests
- Parse intents and extract key elements (action, source, destination, service)
- Validate and clarify ambiguous intents
- Generate device configurations from validated intents
- Support multi-device orchestration

### 5.7 Approval Workflow & Authorization

- Multi-level approval workflows based on risk
- Comprehensive change review UI with impact analysis
- Track all approval decisions with audit trail
- MFA for critical operations (Cisco Duo)
- Dual authorization for high-risk changes
- Role-based access control (Viewer, Operator, Engineer, Approver, Admin, Auditor)

### 5.8 Impact Analysis

- Analyze affected components and traffic flows
- Simulate traffic with proposed changes
- Map configuration dependencies
- Assess compliance impact
- Generate before/after comparisons

### 5.9 Risk Profiling

- Calculate risk scores for configuration changes (0-100)
- Risk factors: change scope, impact severity, historical failure rate, complexity, reversibility
- Recommend risk mitigation strategies
- Learn from past changes
- Monitor risk during deployment with automatic rollback triggers

### 5.10 Deployment Management

- Schedule deployments for maintenance windows
- Pre-deployment validation (device reachability, backups, approvals)
- Support phased rollouts (canary → production)
- Automatic rollback on failure
- Deployment audit trail

---

## 6. AI Agents

**Key Agents:**

1. **Master Reasoning Agent**: Orchestrates all sub-agents and coordinates investigations
2. **Data Collection Agent**: Gathers diagnostic data (showtechs, CLI commands, SNMP, logs)
3. **Topology Agent**: Maps network topology and traffic flows
4. **RCA Agent**: Identifies root causes using RAG and historical data
5. **Remediation Agent**: Proposes and executes remediation actions
6. **Anomaly Detection Agent**: Detects unusual patterns using ML
7. **Configuration Analysis Agent**: Evaluates configs against best practices
8. **Recommendation Agent**: Generates optimization recommendations
9. **Intent Parser Agent**: Parses natural language configuration requests
10. **Impact Analysis Agent**: Simulates and assesses change impact
11. **Risk Assessment Agent**: Calculates risk scores for changes
12. **Deployment Orchestration Agent**: Manages configuration deployments

**Agent Technologies:**

- **LLM Strategy**: Multi-LLM approach with task-specific model selection
  - **General Reasoning**: Claude Sonnet 4.5 or equivalent (deployment method TBD by development agency)
  - **Security-Specific**: **Cisco Foundation-sec-8b** (Cisco Foundation AI security model)
  - **Additional LLMs**: Development agency may propose additional specialized models for specific tasks
- **Orchestration**: LangChain for multi-LLM agent workflows
- **Vector Search**: Vector database for RAG (vendor TBD by development agency)
- **ML Libraries**: Python (scikit-learn, TensorFlow, PyTorch)

---

## 7. MCP Server Specifications

### 7.1 MCP (Model Context Protocol) Overview

MCP servers provide standardized interfaces for AI agents to interact with external systems. Each MCP server exposes tools that agents can invoke to gather data, execute commands, and interact with the firewall infrastructure.

**Benefits of MCP Architecture**:
- Standardized tool interface for AI agents
- Separation of concerns (agents vs. infrastructure access)
- Reusable across different agent workflows
- Secure credential management
- Audit trail for all operations

### 7.2 SSH MCP Server

**Purpose**: Execute CLI commands on FTD devices via SSH

**Tools Exposed**:

1. **execute_command**
   - Execute single CLI command on FTD device
   - Parameters: `device_id`, `command`, `timeout`
   - Returns: `stdout`, `stderr`, `exit_code`
   - Example: `show version`, `show running-config`

2. **execute_commands**
   - Execute multiple CLI commands in sequence
   - Parameters: `device_id`, `commands[]`, `stop_on_error`
   - Returns: Array of results (one per command)
   - Use case: Collect multiple diagnostics (showtech-like data)

3. **get_running_config**
   - Retrieve running configuration
   - Parameters: `device_id`, `section` (optional)
   - Returns: Configuration text
   - Supports section filtering (e.g., "interface", "access-list")

4. **get_device_info**
   - Get device system information
   - Parameters: `device_id`
   - Returns: `hostname`, `model`, `version`, `serial`, `uptime`

**Implementation Details**:
- **Language**: Python
- **Libraries**: Paramiko (SSH), asyncio
- **Authentication**: SSH keys (preferred) or username/password
- **Connection Pooling**: Maintain persistent connections to reduce latency
- **Error Handling**: Retry logic, connection timeouts, graceful failure

**Security**:

- Store SSH keys in secure vault (HashiCorp Vault or similar - TBD by development agency)
- Rotate credentials every 90 days
- Audit all commands executed
- Rate limiting: max 100 commands/min per device
- Restrict command execution to read-only by default (config changes require approval workflow)

### 7.3 SNMP Collector MCP Server

**Purpose**: Poll SNMP metrics from FTD devices and network switches

**Tools Exposed**:

1. **get_metric**
   - Get single SNMP metric by OID
   - Parameters: `device_id`, `oid`, `community` (optional)
   - Returns: `value`, `type` (integer, string, counter, gauge)

2. **get_interface_stats**
   - Get interface statistics
   - Parameters: `device_id`, `interface_name`
   - Returns: `in_octets`, `out_octets`, `in_errors`, `out_errors`, `in_discards`, `out_discards`, `speed`, `status`

3. **get_cpu_memory**
   - Get CPU and memory utilization
   - Parameters: `device_id`
   - Returns: `cpu_usage` (%), `memory_used`, `memory_total`, `memory_usage` (%)

4. **bulk_poll**
   - Poll multiple metrics in bulk (efficient)
   - Parameters: `device_id`, `oids[]`
   - Returns: Array of {oid, value, type}
   - Uses SNMP GetBulk for efficiency

**Implementation Details**:
- **Language**: Python
- **Libraries**: pysnmp, aiosnmp
- **Protocols**: SNMPv2c, SNMPv3 (preferred)
- **Polling Frequency**: Configurable (default: every 60 seconds)
- **Bulk Operations**: Use SNMP GetBulk for efficiency

**Security**:

- Use SNMPv3 with authentication and encryption
- Store credentials in secure vault (TBD by development agency)
- Restrict SNMP access by source IP (firewall rules)
- Monitor for SNMP abuse (excessive polling)

### 7.4 Syslog Collector MCP Server

**Purpose**: Collect, parse, and search syslogs from FTD devices

**Tools Exposed**:

1. **search_logs**
   - Search logs by criteria
   - Parameters: `device_id`, `severity`, `message_pattern`, `start_time`, `end_time`, `limit`
   - Returns: Array of log entries
   - Supports regex pattern matching

2. **get_recent_logs**
   - Get most recent logs
   - Parameters: `device_id`, `count` (default: 100)
   - Returns: Array of log entries (sorted by timestamp DESC)

3. **stream_logs**
   - Stream logs in real-time
   - Parameters: `device_id`, `severity` (optional filter)
   - Returns: WebSocket stream of log entries
   - Use case: Real-time monitoring dashboards

4. **parse_log**
   - Parse a raw syslog message
   - Parameters: `raw_message`
   - Returns: Parsed fields (`timestamp`, `severity`, `facility`, `device_id`, `message`, `parsed_fields`)
   - Extracted fields: Source/Dest IP, ports, protocol, action, interface, NAT info, user, application

**Implementation Details**:
- **Language**: Python
- **Libraries**: Splunk SDK for Python, syslog-ng, regex
- **Protocols**: Syslog over TCP/UDP/TLS (RFC 3164, RFC 5424)
- **Storage**: Splunk Enterprise for centralized log management
- **Retention**: 90 days (hot), 1 year (warm), 7 years (cold)
- **Integration**: Splunk HTTP Event Collector (HEC) for log ingestion

**Parsing Rules**:
- Use Grok patterns for Cisco FTD logs
- Extract structured fields from unstructured log messages
- Enrich with geo-location data (IP → City, Country)
- Enrich with device metadata (device_id → hostname, site, region)

**Security**:
- Use syslog over TLS for encryption
- Validate syslog source IPs (whitelist)
- Rate limiting (prevent log flooding attacks)
- Sanitize log content before storage

### 7.5 FMC API MCP Server

**Purpose**: Interact with Firepower Management Center (FMC) REST API

### 7.6 Data Collection Tools Required on MCP Servers

**CRITICAL**: These tools/components must be installed and configured on the MCP servers to collect data from Cisco FTD/FMC devices.

#### 7.6.1 SSH Data Collection Tools

**Tools Required**:

1. **Paramiko (Python Library)**
   - SSH client for executing CLI commands on FTD devices
   - Installation: `pip install paramiko`
   - Purpose: Execute commands like `show version`, `show tech-support`, `show running-config`

2. **AsyncSSH (Python Library)**
   - Async SSH client for concurrent connections to multiple devices
   - Installation: `pip install asyncssh`
   - Purpose: Parallel command execution across device fleet

3. **SSH Key Management**
   - Tool: `ssh-keygen` (Linux built-in)
   - Purpose: Generate and manage SSH keys for passwordless authentication
   - Key type: RSA 4096-bit or ED25519

4. **Command Output Parser**
   - Tool: TextFSM or Cisco pyATS
   - Installation: `pip install textfsm` or `pip install pyats`
   - Purpose: Parse structured data from CLI command outputs
   - Use case: Convert `show interface` output to structured JSON

**Data Collected via SSH**:

- Device information (hostname, model, version, serial, uptime)
- Running configuration (complete firewall config)
- Showtech diagnostics (full diagnostic bundle)
- Interface statistics
- Routing tables
- Connection counts
- CPU/memory usage (as backup to SNMP)
- Logging status
- HA failover status

**Collection Frequency**:

- Device info: Every 24 hours
- Running config: Every 24 hours (or on-demand before changes)
- Showtech: On-demand or when anomaly detected
- Interface stats: Every 5 minutes (as backup to SNMP)
- Real-time diagnostics: On-demand for troubleshooting

---

#### 7.6.2 SNMP Data Collection Tools

**Tools Required**:

1. **Net-SNMP Suite**
   - Tools: `snmpget`, `snmpwalk`, `snmpbulkwalk`
   - Installation: `apt-get install snmp snmpd libsnmp-dev` (Ubuntu/Debian)
   - Purpose: Test SNMP connectivity and query devices manually

2. **PySNMP (Python Library)**
   - SNMP library for programmatic queries
   - Installation: `pip install pysnmp`
   - Purpose: Poll SNMP OIDs from FTD devices in Python

3. **Async SNMP (Python Library)**
   - Installation: `pip install aiosnmp`
   - Purpose: Concurrent SNMP polling for multiple devices

4. **SNMP MIB Compiler**
   - Tool: `smidump`, `libsmi`
   - Installation: `apt-get install libsmi2-dev`
   - Purpose: Compile Cisco MIBs to use with SNMP tools

5. **Cisco MIB Files**
   - Download from: Cisco.com (requires CCO account)
   - Location: `/usr/share/snmp/mibs/`
   - Required MIBs:
     - CISCO-FIREWALL-MIB
     - CISCO-MEMORY-POOL-MIB
     - CISCO-PROCESS-MIB
     - CISCO-ENHANCED-MEMPOOL-MIB
     - CISCO-ENTITY-SENSOR-MIB

**Data Collected via SNMP**:

- **Device Metrics** (every 30-60 seconds):
  - CPU utilization (per core and aggregate)
  - Memory usage (used, free, total)
  - Disk usage
  - Temperature sensors
  - Fan speeds

- **Interface Metrics** (every 60 seconds):
  - In/Out octets (bytes transferred)
  - In/Out packets
  - In/Out errors
  - In/Out discards
  - Interface status (up/down)
  - Interface speed
  - Duplex mode

- **Connection Metrics** (every 60 seconds):
  - Active connection count
  - Connection rate (new connections per second)
  - Connection table utilization

- **Protocol Metrics** (every 60 seconds):
  - TCP connections
  - UDP sessions
  - ICMP statistics
  - IP forwarding stats

**Collection Frequency**:

- High-frequency metrics (CPU, memory): Every 30 seconds
- Interface metrics: Every 60 seconds
- Connection metrics: Every 60 seconds
- Low-frequency metrics (temperature, disk): Every 5 minutes

**Storage**:

- All SNMP metrics stored in **TimescaleDB** (time-series database)
- Retention: 2 years
- Compression after 7 days

---

#### 7.6.3 Syslog Collection Tools

**Tools Required**:

1. **Splunk Universal Forwarder** (Optional - if using Splunk forwarder model)
   - Installation: Download from Splunk
   - Purpose: Forward syslogs from MCP server to Splunk indexer
   - Use case: If MCP server receives syslogs first, then forwards to Splunk

2. **Syslog-ng** (Alternative to Splunk forwarder)
   - Installation: `apt-get install syslog-ng`
   - Purpose: Receive syslogs from FTD devices, parse, and forward to Splunk
   - Config: `/etc/syslog-ng/syslog-ng.conf`

3. **Rsyslog** (Alternative)
   - Installation: `apt-get install rsyslog`
   - Purpose: Lightweight syslog receiver
   - Config: `/etc/rsyslog.conf`

4. **Logstash** (Alternative)
   - Installation: Part of Elastic Stack
   - Purpose: Receive, parse, and forward logs
   - Use case: If more complex parsing/enrichment needed before Splunk

5. **Python Syslog Parser**
   - Library: `python-grok` or custom regex parser
   - Installation: `pip install python-grok`
   - Purpose: Parse Cisco FTD syslog format and extract fields

6. **Splunk HTTP Event Collector (HEC) Client**
   - Library: `splunk-sdk` for Python
   - Installation: `pip install splunk-sdk`
   - Purpose: Send parsed logs to Splunk via HEC API

**Data Collected via Syslog**:

- **Connection Logs**:
  - Built/Teardown connections
  - Source/Destination IP and ports
  - Protocol, action (permit/deny)
  - Bytes transferred, duration
  - User information (if available)
  - Application identification

- **Security Logs**:
  - IPS/IDS alerts
  - Malware detection events
  - URL filtering events
  - File reputation events
  - SSL/TLS inspection logs

- **System Logs**:
  - Device startup/shutdown
  - Configuration changes
  - HA failover events
  - Interface up/down events
  - Authentication events (login/logout)
  - VPN tunnel status

- **Error Logs**:
  - Critical errors
  - Warnings
  - Debug messages (if enabled)

**Syslog Processing Pipeline**:

```
FTD Device → (Syslog TCP/UDP/TLS) → MCP Syslog Collector → Parse & Enrich → Splunk HEC → Splunk Enterprise
```

**Collection Volume**:

- 10,000 - 50,000 logs per second per device
- Parse and forward in near real-time (< 1 second lag)

**Storage**:

- All syslogs stored in **Splunk Enterprise**
- Retention: 90 days (hot), 1 year (warm), 7 years (cold)

---

#### 7.6.4 FMC API Data Collection Tools

**Tools Required**:

1. **HTTP Client Library (Python)**
   - Library: `requests` or `aiohttp`
   - Installation: `pip install requests aiohttp`
   - Purpose: Make REST API calls to FMC

2. **FMC REST API SDK** (if available from Cisco)
   - Check Cisco DevNet for official SDK
   - Purpose: Simplified FMC API interactions

3. **JSON Parser**
   - Library: `json` (Python built-in)
   - Purpose: Parse FMC API responses

4. **OAuth2 Token Manager**
   - Library: Custom implementation or `requests-oauthlib`
   - Purpose: Manage FMC API token lifecycle (30-minute expiration)

**Data Collected via FMC API**:

- **Device Inventory**:
  - All managed FTD devices
  - Device name, IP, model, version
  - Registration status
  - Health status

- **Access Control Policies**:
  - Policy names and IDs
  - Policy rules (source, dest, service, action)
  - Rule hit counts
  - Policy deployment status

- **Network Objects**:
  - Network object definitions
  - Network groups
  - Port objects
  - Service objects

- **NAT Policies**:
  - NAT rules
  - NAT object mappings

- **VPN Configurations**:
  - Site-to-site VPN tunnels
  - Remote access VPN policies

- **Deployment Status**:
  - Pending deployments
  - Deployment history
  - Deployment errors

**Collection Frequency**:

- Device inventory: Every 5 minutes
- Policy configurations: Every 15 minutes (or on-demand)
- Deployment status: Every 1 minute (when deployment in progress)
- Objects: Every 1 hour (or on-demand)

**Storage**:

- Device inventory: **PostgreSQL** (updated on each poll)
- Policy configs: **PostgreSQL** + **MinIO** (versioned backups)
- Historical data: **PostgreSQL** (change tracking)

---

#### 7.6.5 Configuration Backup Tools

**Tools Required**:

1. **Git (Version Control)**
   - Installation: `apt-get install git`
   - Purpose: Track configuration changes over time
   - Location: `/opt/firewall-configs/`

2. **Diff Tool**
   - Tool: `diff`, `diff3`, or Python `difflib`
   - Purpose: Compare configuration versions

3. **MinIO Client (mc)**
   - Installation: Download from MinIO
   - Purpose: Upload config backups to MinIO object storage
   - Commands: `mc cp`, `mc ls`

4. **Compression Tool**
   - Tool: `gzip`, `bzip2`, or Python `gzip`
   - Purpose: Compress large config files before storage

**Data Collected**:

- Running configurations (daily snapshots)
- Startup configurations
- Configuration diffs (changes between versions)
- FMC policy exports (JSON format)

**Collection Frequency**:

- Daily automated backups (2 AM)
- Pre-change backups (before any deployment)
- Post-change backups (after deployment)
- On-demand backups (manual trigger)

**Storage**:

- **Git repository**: Local version control
- **MinIO**: Long-term backup storage
- **PostgreSQL**: Metadata (backup timestamp, file hash, device ID)

**Retention**:

- 7 years (compliance requirement)

---

#### 7.6.6 Predictive Showtech Collection Tools

**Tools Required**:

1. **Anomaly Detection Agent**
   - ML model that predicts CPU spikes, memory leaks, failures
   - Framework: scikit-learn, TensorFlow, or PyTorch
   - Purpose: Trigger showtech collection before issues occur

2. **SSH Automation (Paramiko)**
   - Execute `show tech-support` command automatically
   - Store output to MinIO

3. **Showtech Parser**
   - Tool: Custom Python parser or Cisco pyATS
   - Purpose: Extract key diagnostics from showtech output

**Triggered Collection**:

When anomaly detection agent predicts an issue (5-15 minutes advance):

1. AI predicts CPU spike → Trigger showtech collection
2. SSH to FTD device: `show tech-support`
3. Collect full diagnostic output
4. Upload to MinIO with context (device ID, prediction, timestamp)
5. Alert NOC team: "Showtech auto-collected for predicted CPU spike"
6. Feed showtech to RCA agent for analysis

**Storage**:

- **MinIO**: `/showtechs/{device_id}/{timestamp}/showtech-output.txt`
- **All showtech files permanently stored** (no automatic deletion without manual intervention)
- Compressed versions: `/showtechs/{device_id}/{timestamp}/showtech-output.tar.gz`
- Metadata in **PostgreSQL** (device ID, timestamp, collection reason, file size, MinIO path)
- Lifecycle policy: Move to cold storage after 90 days (still accessible)

**Retention**:

- 1 year in hot storage (fast access)
- Archive to cold storage after 1 year (slower access but preserved)
- Total retention: 7 years (compliance alignment)

---

### 7.7 MCP Server Infrastructure Summary

**Hardware Requirements per MCP Server**:

- **CPU**: 4-8 cores
- **RAM**: 16-32 GB
- **Storage**: 500 GB SSD (for local cache and logs)
- **Network**: 10 Gbps NIC

**Software Stack on Each MCP Server**:

```
Operating System: Ubuntu 22.04 LTS
Python: 3.10+
Docker: 24.0+
Kubernetes: 1.28+ (if using K8s deployment)

Python Libraries:
- paramiko (SSH)
- asyncssh (Async SSH)
- pysnmp (SNMP)
- aiosnmp (Async SNMP)
- requests (HTTP/API)
- aiohttp (Async HTTP)
- splunk-sdk (Splunk integration)
- textfsm / pyats (CLI parsing)
- langchain (Agent framework)

System Tools:
- net-snmp (SNMP client)
- syslog-ng or rsyslog (Syslog receiver)
- git (Version control)
- minio-client (Object storage client)
- vault (Secrets management - TBD by dev agency)
```

**Data Flow Summary**:

```
┌─────────────────────────────────────────────────────────────┐
│                    MCP Servers (4 servers)                   │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ SSH Collector│  │SNMP Collector│  │Syslog Collect│     │
│  │              │  │              │  │              │     │
│  │ paramiko     │  │ pysnmp       │  │ syslog-ng    │     │
│  │ asyncssh     │  │ aiosnmp      │  │ splunk-sdk   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         ▲                  ▲                  ▲             │
│         │                  │                  │             │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          │ SSH              │ SNMP             │ Syslog
          │ TCP 22           │ UDP 161          │ TCP/UDP 514
          │                  │                  │
┌─────────┴──────────────────┴──────────────────┴─────────────┐
│                    Cisco FTD Devices (Fleet)                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │  FTD 1  │ │  FTD 2  │ │  FTD 3  │ │  FTD N  │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                              │
│              Managed by: FMC (Firepower Management Center)  │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │ HTTPS API (TCP 443)
                           │
                    ┌──────┴─────┐
                    │ FMC API    │
                    │ Collector  │
                    │ (MCP)      │
                    └────────────┘
```

**Collected Data Destinations**:

- **SSH Command Outputs** → PostgreSQL (metadata) + MinIO (full outputs)
- **SNMP Metrics** → TimescaleDB (time-series)
- **Syslogs** → Splunk Enterprise (indexed logs)
- **FMC API Data** → PostgreSQL (configs) + MinIO (backups)
- **Config Backups** → Git (version control) + MinIO (long-term storage)
- **Showtechs** → **MinIO (ALL show tech-support outputs stored permanently)**
  - Scheduled showtechs
  - Predictive showtechs (AI-triggered)
  - Manual showtechs (on-demand)
  - Event-triggered showtechs (on errors/failures)
  - Retention: 7 years (hot storage → cold storage after 1 year)

---

### 7.8 Development Agency Deliverables

The development agency must provide:

1. **MCP Server Installation Scripts**
   - Automated installation of all required tools
   - Docker/Kubernetes deployment manifests
   - Configuration templates

2. **Data Collection Scripts**
   - Python scripts for SSH, SNMP, Syslog, API collection
   - Scheduling configuration (cron or Kubernetes CronJobs)
   - Error handling and retry logic

3. **Monitoring & Alerting**
   - Prometheus metrics for collection health
   - Grafana dashboards for collection status
   - Alerts for collection failures

4. **Documentation**
   - Installation guide
   - Configuration guide
   - Troubleshooting guide
   - Data flow diagrams

---

**Tools Exposed**:

1. **get_devices**
   - List all managed devices
   - Parameters: None
   - Returns: Array of devices with status

2. **get_policies**
   - Get access control policies
   - Parameters: `policy_id` (optional)
   - Returns: Policy configuration

3. **get_objects**
   - Get network/service objects
   - Parameters: `object_type` (network, service, port)
   - Returns: Array of objects

4. **deploy_config**
   - Deploy configuration to devices
   - Parameters: `device_ids[]`, `force_deploy`
   - Returns: Deployment task ID

5. **get_deployment_status**
   - Check deployment status
   - Parameters: `task_id`
   - Returns: Status (pending, in_progress, success, failed)

**Implementation Details**:
- **Language**: Python
- **Libraries**: requests, aiohttp
- **Authentication**: FMC API token (OAuth-like)
- **API Version**: FMC 7.0+ REST API
- **Rate Limiting**: Respect FMC API rate limits (120 requests/min)

**Security**:

- Store FMC credentials in secure vault (TBD by development agency)
- Use HTTPS only (TLS 1.2+)
- Token refresh logic (tokens expire after 30 minutes)
- Audit all API calls

---

## 8. Database Architecture

### 8.1 Database Inventory

| Database | Purpose | Technology | Deployment | Retention |
|----------|---------|------------|------------|-----------|
| **Relational DB** | Structured data (users, devices, configs, approvals) | PostgreSQL 15 | On-premises | Indefinite |
| **Time-Series DB** | Device metrics, performance data | TimescaleDB (PostgreSQL extension) | On-premises | 2 years (metrics) |
| **Log Management** | Centralized logging, syslog collection, search & analysis | Splunk Enterprise | On-premises | 90 days (hot), 1 year (warm), 7 years (cold) |
| **Vector DB** | RAG embeddings for semantic search | **Vector Database** (vendor TBD by development agency) | On-premises | Indefinite |
| **Document DB** | Knowledge base, unstructured data | MongoDB | On-premises | Indefinite |
| **Cache** | Real-time data, session management | Redis | On-premises | Transient (TTL-based) |
| **Blob Storage** | Showtechs, backups, reports, configs | MinIO | On-premises | 7 years (compliance) |

**Note on Vector Database**: The specific vector database technology (e.g., Qdrant, Milvus, Weaviate, pgvector) should be proposed by the development agency with justification for their choice based on:

- Performance requirements (search latency < 500ms)
- Scalability (100,000+ documents)
- On-premises deployment support
- Integration with existing infrastructure
- Licensing and support model

### 8.2 PostgreSQL Schema (Relational Database)

**Core Tables**:

#### 8.2.1 Users & Authentication
```sql
users (user_id, username, email, password_hash, role, mfa_enabled, mfa_secret, created_at, last_login, is_active)
```
- Roles: Viewer, Operator, Engineer, Approver, Admin, Auditor
- MFA support: TOTP-based (Google Authenticator, Authy)

#### 8.2.2 Devices
```sql
devices (device_id, hostname, ip_address, device_type, model, software_version, serial_number, site, region, ha_role, ha_peer_id, fmc_id, created_at, last_seen)
```
- Device types: FTD, FMC
- HA roles: active, standby, standalone

#### 8.2.3 Configuration Backups
```sql
config_backups (backup_id, device_id, backup_type, config_text, config_hash, minio_url, size_bytes, created_at, created_by)
```
- Backup types: running-config, startup-config, fmc-policy
- SHA256 hash for change detection
- MinIO object storage for backup files

#### 8.2.4 Change Management
```sql
change_requests (request_id, title, description, intent, requested_by, requested_at, status, risk_score, risk_level, approval_level, scheduled_at, deployed_at)
change_request_devices (request_id, device_id, config_changes)
change_approvals (approval_id, request_id, approver_id, approval_level, decision, comments, approved_at, mfa_verified)
deployments (deployment_id, request_id, device_id, status, started_at, completed_at, error_message, rollback_performed)
```

#### 8.2.5 Configuration Scoring & Recommendations
```sql
config_scores (score_id, device_id, scored_at, overall_score, section_1_score...section_10_score, findings)
recommendations (recommendation_id, device_id, generated_at, priority, category, title, description, remediation, estimated_effort, status, user_feedback)
```

#### 8.2.6 Audit Logs
```sql
audit_logs (log_id, user_id, action, resource_type, resource_id, details, ip_address, user_agent, created_at)
```
- Immutable audit trail (WORM storage)
- Retention: 7 years (compliance requirement)

### 8.3 TimescaleDB Schema (Time-Series Database)

**Hypertables** (optimized for time-series queries):

#### 8.3.1 Device Metrics
```sql
device_metrics (time, device_id, metric_name, value, unit)
```
- Metrics: cpu_usage, memory_usage, connection_count, disk_usage, etc.
- Retention: 2 years
- Compression: Enable after 7 days

#### 8.3.2 Interface Metrics
```sql
interface_metrics (time, device_id, interface_name, metric_name, value)
```
- Metrics: in_octets, out_octets, in_errors, out_errors, in_discards, out_discards

#### 8.3.3 Syslog Events (Splunk)

**Note**: Syslog events are now stored and indexed in Splunk Enterprise instead of TimescaleDB for advanced log analysis capabilities.

**Splunk Index Configuration**:

- **Index Name**: `cisco_ftd_logs`
- **Source Type**: `cisco:ftd:syslog`
- **Retention**: Hot (90 days) → Warm (1 year) → Cold (7 years)
- **Parsed Fields**: timestamp, severity, facility, device_id, message, source_ip, dest_ip, protocol, action, interface, user, application

**Benefits of Splunk**:

- Advanced search and correlation capabilities
- Real-time alerting and dashboards
- Machine learning for anomaly detection
- Native integration with Cisco security products
- Enterprise-grade scalability

### 8.4 Vector Database Schema

**Note**: Development agency to propose specific vector database solution (e.g., Qdrant, Milvus, Weaviate, pgvector, Chroma).

**Required Index Configuration**:

- **Dimension**: 1536 (for standard embeddings from LLM provider)
- **Metric**: Cosine similarity
- **Collections/Namespaces**:
  - `cisco_docs` - Official Cisco documentation
  - `kb_articles` - Knowledge base articles
  - `troubleshooting` - Troubleshooting guides
  - `incidents` - Historical incident reports

**Required Metadata Fields**:

- `doc_id`: Unique document identifier
- `doc_type`: documentation, kb_article, troubleshooting_guide, incident_report
- `title`: Document title
- `category`: Category/tag
- `product`: FTD, FMC, etc.
- `version`: Software version (e.g., "7.0", "7.2")
- `url`: Source URL (if applicable)
- `last_updated`: Timestamp

**Performance Requirements**:

- Search latency: < 500ms for top-5 results
- Support for 100,000+ documents
- Hybrid search capability (vector + keyword)
- On-premises deployment
- High availability and backup support

### 8.5 MongoDB Schema (Document Database)

**Collections**:

#### 8.5.1 Knowledge Base Documents
```json
{
  "_id": ObjectId,
  "doc_id": "string",
  "title": "string",
  "content": "string (full text)",
  "doc_type": "documentation | kb_article | troubleshooting_guide",
  "category": "string",
  "product": "FTD | FMC",
  "version": "string",
  "url": "string",
  "tags": ["array"],
  "created_at": ISODate,
  "updated_at": ISODate
}
```

#### 8.5.2 Agent Workflow History
```json
{
  "_id": ObjectId,
  "workflow_id": "string",
  "scenario_type": "cpu_spike | memory_leak | connectivity_issue",
  "device_id": "string",
  "started_at": ISODate,
  "completed_at": ISODate,
  "status": "in_progress | completed | failed",
  "steps": [
    {
      "agent": "string",
      "action": "string",
      "inputs": {},
      "outputs": {},
      "started_at": ISODate,
      "completed_at": ISODate
    }
  ],
  "findings": {},
  "recommendations": []
}
```

### 8.6 Redis Schema (Cache)

**Key Patterns**:
- `session:{session_id}` - User session data (TTL: 30 minutes)
- `device:health:{device_id}` - Latest device health (TTL: 60 seconds)
- `metrics:latest:{device_id}:{metric_name}` - Latest metric value (TTL: 60 seconds)
- `rate_limit:{user_id}:{endpoint}` - API rate limiting (TTL: 60 seconds)
- `embedding_cache:{doc_id}` - Cached embeddings (TTL: 24 hours)

### 8.7 MinIO Bucket Structure

**Bucket Organization**:
```
minio://firewall-mgmt-data/
├── config-backups/
│   └── {device_id}/
│       └── {timestamp}/
│           └── running-config.txt
├── showtechs/
│   └── {device_id}/
│       └── {timestamp}/
│           ├── showtech-output.txt          (full showtech log)
│           ├── showtech-output.tar.gz       (compressed version)
│           └── metadata.json                (collection context)
├── reports/
│   └── config-scores/
│       └── {device_id}/
│           └── {date}/
│               └── score-report.pdf
└── deployments/
    └── {request_id}/
        └── deployment-log.json
```

**Lifecycle Policies**:

- Config backups: Retain for 7 years, archive to cold storage after 1 year
- **Showtechs: Retain for 7 years** (hot storage 1 year → cold storage 6 years)
  - **ALL showtech outputs permanently stored in MinIO**
  - Automatic compression after 7 days (convert `.txt` to `.tar.gz`)
  - Move to cold storage tier after 1 year (slower access, lower cost)
  - Indexed in PostgreSQL for fast search by device ID, timestamp, collection reason
  - No automatic deletion - manual intervention required for cleanup
- Reports: Retain for 2 years
- Deployment logs: Retain for 7 years (compliance)

**MinIO Features**:

- S3-compatible API for easy migration
- Versioning enabled for all buckets
- Encryption at rest (AES-256)
- Access control via IAM policies
- Self-hosted or cloud deployment options

---

## 9. Identity & Access Management (IAM)

### 9.1 User Management

**Overview**: Comprehensive user lifecycle management with role-based access control, multi-factor authentication, and audit trails.

**User Lifecycle**:

1. **User Provisioning**
   - Admin-initiated user creation
   - Automated provisioning via LDAP/Active Directory sync
   - Self-service registration (with admin approval)
   - Bulk user import (CSV/API)

2. **User Profile Management**
   - Personal information (name, email, phone)
   - Department and reporting structure
   - **Timezone Preferences**: User-defined timezone selection
     - Default: IST (Indian Standard Time - UTC+5:30)
     - Support for all global timezones
     - Auto-detect browser timezone on login
     - All timestamps displayed in user's selected timezone
   - Locale preferences (language, date format, number format)
   - Profile picture and display name

3. **User Deprovisioning**
   - Immediate account disable/lock
   - Scheduled account expiration
   - Grace period for data retention
   - Automatic cleanup of orphaned sessions and tokens

**User Roles & Permissions**:

| Role | Permissions | Use Case |
|------|-------------|----------|
| **Viewer** | Read-only access to dashboards, logs, configurations | NOC monitoring, read-only auditors |
| **Operator** | Viewer + initiate low-risk changes, acknowledge alerts | NOC operators, junior engineers |
| **Engineer** | Operator + create/modify configurations, run diagnostics | Network/security engineers |
| **Approver** | Engineer + approve medium/high-risk changes | Senior engineers, team leads |
| **Admin** | Full access + user management, system configuration | IT admins, platform administrators |
| **Auditor** | Read-only + full audit log access, compliance reports | Security auditors, compliance team |

**Permission Matrix**:

| Resource | Viewer | Operator | Engineer | Approver | Admin | Auditor |
|----------|--------|----------|----------|----------|-------|---------|
| View Dashboards | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| View Configurations | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Search Logs | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Create Low-Risk Changes | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ |
| Create Medium-Risk Changes | ✗ | ✗ | ✓ | ✓ | ✓ | ✗ |
| Create High-Risk Changes | ✗ | ✗ | ✓ | ✓ | ✓ | ✗ |
| Approve Changes | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ |
| Deploy Changes | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ |
| Manage Users | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| View Audit Logs | Limited | Limited | Limited | Limited | ✓ | ✓ |
| System Configuration | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |

### 9.2 Multi-Factor Authentication (MFA) with Cisco Duo

**Overview**: Mandatory MFA for all users with Cisco Duo Security integration for enhanced authentication.

**Cisco Duo Integration**:

- **Primary MFA Provider**: Cisco Duo Security (Cisco-owned product)
- **Supported Methods**:
  - Duo Push (push notification to Duo Mobile app)
  - Duo Passcode (6-digit OTP from Duo Mobile)
  - Phone Call (automated voice call with PIN)
  - SMS Passcode (backup method)
  - Hardware Tokens (TOTP-compatible: YubiKey, RSA SecurID)

**MFA Enrollment**:

1. **Mandatory Enrollment**: All users must enroll in Duo within 24 hours of account creation
2. **Enrollment Flow**:
   - User logs in with username/password
   - System redirects to Duo enrollment page
   - User downloads Duo Mobile app (iOS/Android)
   - User scans QR code to link device
   - User completes test authentication
   - Admin approves enrollment (optional, configurable)

3. **Backup Methods**: Users must configure at least 2 authentication methods (e.g., Duo Push + SMS)

**MFA Policy Configuration**:

- **Login MFA**: Required for all logins (web UI, API, CLI)
- **Critical Operations MFA**:
  - Approve high-risk configuration changes
  - Deploy configuration changes
  - User management actions (create, delete, role changes)
  - System configuration changes
  - Audit log access

- **MFA Grace Period**: 8-hour session (configurable), re-authentication required after
- **Trusted Devices**: Remember device for 30 days (optional, configurable per role)
- **Offline Access Token**: Backup codes for emergency access (10 single-use codes)

**Duo Security Features**:

- **Adaptive Authentication**: Risk-based MFA prompts based on:
  - Login location (geo-location)
  - Device trust level
  - Network (corporate vs. external)
  - User behavior patterns
  - Time of day

- **Device Health Checks**:
  - OS version and patch level
  - Disk encryption status
  - Screen lock enabled
  - Biometric authentication support

- **Fraud Prevention**:
  - Anomalous login detection
  - Impossible travel detection
  - Device fingerprinting
  - Brute force protection

**Duo Admin Portal Integration**:

- Centralized Duo admin portal for:
  - User enrollment status monitoring
  - Authentication logs and reports
  - Policy configuration
  - Bypass codes generation (emergency access)
  - Device management

### 9.3 Single Sign-On (SSO) Integration

**Supported Protocols**:

- **SAML 2.0**: Primary SSO protocol
- **OAuth 2.0 / OpenID Connect**: For API integrations
- **LDAP/Active Directory**: For on-premises directory integration

**Supported Identity Providers (IdPs)**:

- **Cisco Duo Access Gateway**: Primary (Cisco-owned)
- Active Directory Federation Services (ADFS)
- Okta
- Azure Active Directory (Azure AD)
- PingFederate
- Generic SAML 2.0 providers

**SSO Configuration**:

1. **SAML Configuration**:
   - IdP metadata XML import
   - Service Provider (SP) metadata export
   - Assertion Consumer Service (ACS) URL
   - Single Logout (SLO) URL
   - Attribute mapping (username, email, role, department)

2. **Just-In-Time (JIT) Provisioning**:
   - Auto-create user accounts on first SSO login
   - Map SAML attributes to user roles
   - Update user profile on each login
   - Sync group memberships from IdP

3. **Session Management**:
   - SSO session timeout: 8 hours (configurable)
   - Idle timeout: 30 minutes (configurable)
   - Concurrent session limit: 3 per user (configurable)
   - Force logout on role change

### 9.4 Session Management

**Session Security**:

- **Session Token**: JWT with 30-minute expiration
- **Refresh Token**: 7-day expiration (sliding window)
- **Token Storage**: HttpOnly, Secure, SameSite cookies
- **Token Rotation**: New token on each refresh
- **Session Binding**: IP address + User-Agent fingerprinting (optional)

**Session Controls**:

- **Concurrent Sessions**: Limit 3 active sessions per user
- **Session Termination**:
  - Manual logout (single session)
  - Logout all sessions (user-initiated or admin-forced)
  - Automatic logout on password change
  - Automatic logout on role change
  - Automatic logout on MFA device removal

- **Session Monitoring**:
  - Active sessions dashboard
  - Session history (last 90 days)
  - Suspicious session alerts
  - Geographic anomaly detection

### 9.5 Password Policy

**Password Requirements**:

- **Minimum Length**: 12 characters
- **Complexity**:
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
  - At least 1 special character (!@#$%^&*)
- **Password History**: Cannot reuse last 10 passwords
- **Password Expiration**: 90 days (configurable, can be disabled with MFA)
- **Password Strength**: zxcvbn library for real-time strength feedback

**Password Reset**:

- **Self-Service Reset**:
  - Email-based reset link (valid for 1 hour)
  - Security questions (optional)
  - MFA verification required (if enrolled)

- **Admin-Initiated Reset**:
  - Temporary password generation
  - Force password change on next login
  - Email notification to user

- **Lockout Policy**:
  - 5 failed attempts → 15-minute lockout
  - 10 failed attempts → Account disabled (admin unlock required)
  - Lockout counter resets after successful login

### 9.6 Audit & Compliance

**Audit Logging**:

- **IAM Events Logged**:
  - User login/logout (success/failure)
  - MFA enrollment/authentication
  - Password changes/resets
  - Role changes
  - Permission grants/revocations
  - Session creation/termination
  - SSO authentication events
  - Admin actions (user management)

- **Audit Log Fields**:
  - Timestamp (UTC)
  - User ID and username
  - Action type
  - Resource affected
  - IP address and geo-location
  - User-Agent (browser/device)
  - MFA method used
  - Success/failure status
  - Error message (if failed)

- **Audit Log Retention**: 7 years (compliance requirement)
- **Audit Log Storage**: Immutable (WORM storage in PostgreSQL)
- **Audit Log Export**: CSV, JSON, SIEM integration (Splunk)

**Compliance Features**:

- **SOC 2 Type II**: Audit trail for user access controls
- **HIPAA**: User access logging and MFA enforcement
- **PCI-DSS**: Strong authentication and access controls
- **GDPR**: User consent tracking and data access logs

### 9.7 API Key Management

**API Key Types**:

- **User API Keys**: Tied to individual user accounts
- **Service Account Keys**: For system-to-system integration
- **Temporary Keys**: Short-lived tokens for specific tasks

**API Key Features**:

- **Generation**: Admin or user-initiated
- **Rotation**: Automatic 90-day rotation (configurable)
- **Scoping**: Fine-grained permissions (read-only, specific endpoints)
- **Rate Limiting**: Per-key rate limits
- **Expiration**: Configurable TTL (default: 90 days)
- **Revocation**: Immediate invalidation
- **Audit Trail**: All API key usage logged

**API Key Storage**:

- **Hashing**: SHA-256 hash stored in database
- **Secure Display**: Show key only once during generation
- **Secure Transmission**: HTTPS only
- **Key Prefix**: Identify key type (e.g., `usr_`, `svc_`, `tmp_`)

### 9.8 Development Agency Requirements

The development agency must provide in their proposal:

1. **IAM Architecture Proposal**:
   - Detailed authentication flow diagrams
   - Session management implementation
   - JWT token structure and signing method
   - Database schema for user management

2. **Duo Integration Plan**:
   - Duo API integration approach
   - Duo enrollment workflow
   - Duo policy configuration strategy
   - Duo failover/backup plan

3. **SSO Integration Plan**:
   - Supported IdP list
   - SAML implementation approach
   - JIT provisioning logic
   - Attribute mapping strategy

4. **Security Measures**:
   - Password hashing algorithm (e.g., bcrypt, Argon2)
   - Token encryption method
   - Session hijacking prevention
   - CSRF protection strategy
   - XSS prevention measures

5. **Compliance Documentation**:
   - SOC 2 compliance mapping
   - HIPAA compliance checklist
   - PCI-DSS requirements coverage
   - GDPR data handling

---

## 10. API & Integration Requirements

### 9.1 REST API Specification

**Base URL**: `https://api.firewall-mgmt.company.com/v1`

**Authentication**: Bearer token (JWT)
- Token expiration: 30 minutes
- Refresh token: 7 days
- MFA required for critical operations

### 9.2 Core API Endpoints

#### 9.2.1 Authentication
```
POST /auth/login
  Request: { username, password }
  Response: { access_token, refresh_token, expires_in }

POST /auth/mfa/verify
  Request: { token, mfa_code }
  Response: { access_token }

POST /auth/refresh
  Request: { refresh_token }
  Response: { access_token }

POST /auth/logout
  Request: { refresh_token }
  Response: { success }
```

#### 9.2.2 Devices
```
GET /devices
  Query: ?site=X&region=Y&status=active
  Response: [{ device_id, hostname, ip_address, status, ... }]

GET /devices/{device_id}
  Response: { device_id, hostname, interfaces, ha_status, metrics, ... }

GET /devices/{device_id}/health
  Response: { cpu, memory, connections, interfaces, status }

GET /devices/{device_id}/config
  Response: { running_config, startup_config, last_backup }

POST /devices/{device_id}/backup
  Response: { backup_id, minio_url }
```

#### 9.2.3 Monitoring & Logs
```
GET /metrics/{device_id}
  Query: ?metric_name=cpu_usage&start_time=X&end_time=Y&interval=60
  Response: [{ timestamp, value }, ...]

GET /logs/search
  Query: ?device_id=X&severity=error&start_time=X&end_time=Y&limit=100
  Response: [{ timestamp, device_id, severity, message, ... }, ...]

WebSocket /logs/stream
  Subscribe to real-time log stream
  Filter: { device_id, severity }
```

#### 9.2.4 Configuration Analysis
```
GET /config/scores/{device_id}
  Response: { overall_score, section_scores: { access_control: 85, ... }, findings: [] }

GET /config/scores/{device_id}/history
  Query: ?start_date=X&end_date=Y
  Response: [{ scored_at, overall_score, section_scores }, ...]

GET /recommendations/{device_id}
  Response: [{ recommendation_id, priority, title, description, remediation }, ...]

POST /recommendations/{recommendation_id}/feedback
  Request: { feedback: "accepted" | "rejected", comments }
  Response: { success }
```

#### 9.2.5 Change Management
```
POST /changes
  Request: { title, description, intent, device_ids: [] }
  Response: { request_id, status, risk_score }

GET /changes/{request_id}
  Response: { request_id, title, status, approvals: [], risk_score, impact_analysis, ... }

POST /changes/{request_id}/approve
  Request: { mfa_code, comments }
  Response: { success, approval_id }

POST /changes/{request_id}/reject
  Request: { reason, comments }
  Response: { success }

POST /changes/{request_id}/deploy
  Request: { scheduled_at }
  Response: { deployment_id }

GET /changes/{request_id}/impact
  Response: { impact_score, affected_components: [], simulation_results: {} }
```

#### 9.2.6 AI Agents
```
POST /agents/investigate
  Request: { scenario_type, device_id, context }
  Response: { workflow_id }

GET /agents/workflow/{workflow_id}
  Response: { status, current_agent, steps: [], results: {} }

WebSocket /agents/workflow/{workflow_id}/stream
  Subscribe to real-time workflow updates

POST /agents/chat
  Request: { message, conversation_history: [] }
  Response: { response, sources: [], confidence }
```

### 9.3 GraphQL API

**Endpoint**: `https://api.firewall-mgmt.company.com/graphql`

**Key Features**:
- Flexible querying (request only needed fields)
- Real-time subscriptions (WebSocket-based)
- Batched queries (reduce network overhead)

**Schema Highlights**:
```graphql
type Query {
  devices(site: String, region: String): [Device!]!
  device(id: ID!): Device
  configScore(deviceId: ID!): ConfigScore
  changeRequests(status: String): [ChangeRequest!]!
  logs(deviceId: ID, severity: String, limit: Int): [LogEntry!]!
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
```

### 9.4 WebSocket API

**Real-Time Endpoints**:
- `/ws/logs/stream` - Real-time log streaming
- `/ws/metrics/stream` - Real-time metric updates
- `/ws/agents/workflow/{workflow_id}` - Agent workflow progress
- `/ws/deployments/{deployment_id}` - Deployment status updates

**Message Format**:
```json
{
  "type": "log_entry | metric_update | workflow_step | deployment_status",
  "timestamp": "ISO8601",
  "data": { ... }
}
```

### 9.5 External Integrations

**Supported Integrations**:

1. **Cisco FMC API**
   - Retrieve policies, objects, devices
   - Deploy configurations
   - Monitor deployment status

2. **SNMP Traps**
   - Receive SNMP traps from devices
   - Convert traps to alerts

3. **Syslog**
   - Receive syslogs from FTD devices
   - Parse and forward to Splunk Enterprise

4. **Splunk Integration**
   - Centralized log management and analysis
   - HTTP Event Collector (HEC) for log ingestion
   - Splunk Search Processing Language (SPL) queries
   - Real-time alerting and correlation
   - Native Cisco security product integration

5. **Webhooks (Outbound)**
   - Send alerts to external systems (Slack, PagerDuty, ServiceNow)
   - Trigger on critical events from Splunk alerts

### 9.6 API Security

**Authentication & Authorization**:
- JWT-based authentication
- Role-based access control (RBAC)
- MFA for critical operations
- API key support (for service accounts)

**Rate Limiting**:
- 1,000 requests/hour per user (general endpoints)
- 100 requests/hour per user (expensive queries)
- 10,000 requests/hour per organization

**API Versioning**:
- Version in URL path: `/v1/`, `/v2/`
- Deprecation notices (6 months before removal)
- Backward compatibility for minor versions

---

## 10. Technical Stack

### 10.1 Frontend

- **Framework**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React icons, Recharts
- **State Management**: React Context / Zustand

### 10.2 Backend

- **API**: Node.js / Python FastAPI
- **Agent Runtime**: Python with LangChain
- **MCP Servers**: Python (SSH, SNMP, Syslog, FMC API integrations)

### 10.3 Databases & Data Stores

- **PostgreSQL**: Structured data (users, devices, configurations)
- **TimescaleDB**: Time-series metrics and performance data
- **Splunk Enterprise**: Centralized log management, syslog collection, search & analysis (Cisco-owned)
- **Vector Database**: Embeddings for RAG (vendor TBD by development agency)
- **MongoDB**: Knowledge base and unstructured data
- **Redis**: Caching and real-time data
- **MinIO**: S3-compatible blob storage (showtechs, backups, reports)

### 10.4 AI/ML

**Large Language Models (LLMs) - Multi-LLM Architecture**:

The platform supports multiple LLMs for different tasks, allowing optimal model selection based on use case requirements.

**LLM 1: General Reasoning & Orchestration**

- **Model**: Claude Sonnet 4.5 (or equivalent)
- **Deployment**: Method TBD by development agency (self-hosted or API)
- **Use Cases**:
  - Intent parsing from natural language
  - Multi-agent orchestration and workflow coordination
  - Conversational AI chatbot
  - General network/security queries
  - Configuration change request analysis

**LLM 2: Security-Specific - Cisco Foundation-sec-8b**

- **Model Details**: 8-billion parameter model from Cisco Foundation AI group
- **Deployment**: On-premises deployment
- **Availability**: Hugging Face repository
- **Performance**: Outperforms Llama 3.1 8B and matches 70B variant on security benchmarks
- **Pre-trained on**: CVEs, CWEs, MITRE ATT&CK, threat intelligence, security documentation, compliance standards (NIST, OWASP)

**Security-Specific Use Cases**:

  1. **Vulnerability Analysis**: Analyze FTD configurations for CVEs and security weaknesses
  2. **Threat Intelligence Correlation**: Parse threat feeds and correlate with firewall logs
  3. **SOC Alert Triage**: Prioritize and summarize Splunk alerts with security context
  4. **Configuration Security Validation**: Review firewall policies against security best practices
  5. **Incident Summarization**: Generate detailed security incident reports for SOC teams
  6. **Compliance Assessment**: Map configurations to NIST, OWASP, PCI-DSS, HIPAA standards
  7. **Security Code Review**: Analyze custom scripts and automation code for vulnerabilities
  8. **MITRE ATT&CK Mapping**: Map firewall events to MITRE ATT&CK tactics, techniques, and procedures

**Fine-Tuning Capabilities**:

  - Customize on organization-specific security telemetry and logs
  - Train on custom detection rules and security playbooks
  - Learn from historical incident data and remediation workflows
  - Specialize on Cisco FTD/FMC-specific configurations and behaviors

**LLM 3+: Additional Specialized Models (Optional)**

Development agency may propose additional LLMs for specific tasks:

- **Document Analysis**: Specialized model for parsing Cisco documentation and knowledge base
- **Code Generation**: Model optimized for generating firewall configurations and scripts
- **Anomaly Detection**: Model trained specifically on network traffic pattern analysis
- **Compliance**: Model specialized in regulatory compliance and audit requirements

**Multi-LLM Orchestration**:

- **Router Agent**: Intelligently routes queries to the most appropriate LLM
- **Fallback Strategy**: Cascade to alternative LLMs if primary model unavailable
- **Cost Optimization**: Use smaller/faster models for simple tasks, larger models for complex reasoning
- **Response Aggregation**: Combine outputs from multiple LLMs for consensus-based decisions

**Vector Database & Search**:

- Semantic search and RAG (vendor TBD by development agency)
- Support for hybrid search (vector + keyword)

**Machine Learning Libraries**:

- scikit-learn, TensorFlow, PyTorch for anomaly detection models
- Hugging Face Transformers for LLM integration

### 10.5 Infrastructure

- **Deployment**: On-premises infrastructure
- **Compute**: Kubernetes cluster or VM-based deployment (TBD by development agency)
- **Container Orchestration**: Kubernetes (recommended) or Docker Swarm
- **Monitoring**: Prometheus + Grafana stack
- **Message Queue**: Apache Kafka or RabbitMQ (TBD by development agency)
- **Workflow Orchestration**: Apache Airflow or similar (TBD by development agency)
- **Load Balancing**: HAProxy or NGINX
- **Service Mesh** (optional): Istio or Linkerd (TBD by development agency)

---

## 11. Implementation Phases

### Phase 1: Core Infrastructure (Q1 2026)

**Duration**: 3 months

**Deliverables:**
- Central syslog collection and parsing system
- TimescaleDB for log storage
- Knowledge base and RAG database
- MCP servers (SSH, SNMP, Syslog, FMC API)
- Basic UI dashboards
- Master Reasoning Agent + Data Collection Agent

**Success Criteria:**
- Collect and parse 10,000 logs/second per device
- Search latency < 3 seconds for 24-hour queries
- RAG retrieval accuracy > 85%

### Phase 2: Configuration Intelligence (Q2 2026)

**Duration**: 3 months

**Deliverables:**
- Configuration Analysis Agent with scoring system
- Recommendation Agent
- Configuration backup and versioning
- Compliance reporting
- Enhanced UI dashboards

**Success Criteria:**
- Configuration analysis accuracy > 90%
- Generate actionable recommendations for 80%+ of devices
- Daily automated config backups

### Phase 3: Autonomous Configuration Management (Q3 2026)

**Duration**: 4 months

**Deliverables:**
- Intent-based configuration (Intent Parser Agent)
- Human-in-the-loop approval workflows
- MFA and dual authorization
- Impact Analysis Agent
- Risk Assessment Agent
- Deployment Orchestration Agent
- Scheduled deployment manager

**Success Criteria:**
- Intent parsing accuracy > 90%
- Configuration deployment success rate > 98%
- Risk scoring accuracy > 85%
- Zero unauthorized deployments

### Phase 4: Advanced Analytics & Optimization (Q4 2026)

**Duration**: 3 months

**Deliverables:**
- Anomaly Detection Agent
- Predictive maintenance (5-15 min lead time)
- Capacity planning automation
- Advanced threat correlation
- Performance optimization

**Success Criteria:**
- Predict issues 15 minutes in advance (80% accuracy)
- Reduce false positives by 60%
- Automate capacity planning with 90% accuracy

---

## Appendices

### A. Project References

**Live Demo**: <https://ai-firewall-mgmt.ciscoaidemo.com/>

**Demo Features Available**:

- Real-time firewall monitoring dashboards
- AI-powered chatbot for firewall queries
- Configuration compliance scoring
- Change management workflows
- AI agent investigation demonstrations
- Interactive mock data visualizations

**Note**: The live demo uses simulated data and mock Cisco FTD/FMC devices for demonstration purposes.

### B. Glossary

| Term | Definition |
|------|------------|
| **FTD** | Cisco Firepower Threat Defense - Next-generation firewall |
| **FMC** | Cisco Firepower Management Center - Centralized management platform |
| **MCP** | Model Context Protocol - Standardized interface for AI agents |
| **RAG** | Retrieval-Augmented Generation - AI technique combining retrieval and generation |
| **RCA** | Root Cause Analysis |
| **TAC** | Technical Assistance Center (Cisco support) |
| **HITL** | Human-in-the-Loop - Requiring human approval/oversight |

### C. Infrastructure Prerequisites & Data Sources

**CRITICAL**: The following infrastructure components and configurations MUST be in place for the system to function. The MCP servers cannot collect data without these prerequisites.

#### C.1 Cisco FTD/FMC Requirements

**1. Cisco FTD Devices**:
- **Minimum Version**: FTD 7.0 or later
- **Required Configurations**:
  - SSH enabled with authentication (username/password or SSH keys)
  - SNMP v2c or v3 enabled with community strings/credentials
  - Syslog forwarding configured to central Splunk server
  - Management interface accessible from MCP servers
  - NTP configured (time synchronization critical for log correlation)

**2. Firepower Management Center (FMC)**:
- **Minimum Version**: FMC 7.0 or later
- **Required Configurations**:
  - REST API enabled
  - API user account with appropriate permissions (read/write access)
  - HTTPS access from MCP servers
  - Device registration (all FTD devices managed by FMC)
  - Valid SSL/TLS certificate (or accept self-signed for testing)

**3. Network Connectivity**:
- **SSH Access**: TCP port 22 from MCP servers to FTD devices
- **SNMP Access**: UDP port 161 from MCP servers to FTD devices
- **FMC API Access**: HTTPS (TCP 443) from MCP servers to FMC
- **Syslog**: TCP/UDP port 514 or custom port from FTD to Splunk
- **Firewall Rules**: Allow traffic between MCP servers and all managed devices

#### C.2 Syslog Configuration Requirements

**On FTD Devices**:
```
# Minimum syslog configuration required on each FTD device

configure manager add <SPLUNK_IP>
logging enable
logging timestamp
logging emblem
logging trap informational
logging host <SPLUNK_IP> <PROTOCOL>/<PORT>
logging device-id hostname
```

**Required Syslog Fields**:
- Timestamp (RFC 3164 or RFC 5424 format)
- Device hostname/IP
- Severity level (0-7)
- Facility
- Message text
- Source IP, Destination IP (for connection logs)
- Protocol, Ports (for connection logs)
- Action (permit/deny)
- Interface names

**Syslog Volume Estimate**:
- **Low Traffic Device**: 1,000 - 5,000 logs/second
- **Medium Traffic Device**: 5,000 - 10,000 logs/second
- **High Traffic Device**: 10,000 - 50,000 logs/second

#### C.3 SNMP Configuration Requirements

**On FTD Devices**:
```
# SNMPv3 Configuration (Recommended)
snmp-server group <GROUP_NAME> v3 priv
snmp-server user <USERNAME> <GROUP_NAME> v3 auth sha <AUTH_PASSWORD> priv aes 256 <PRIV_PASSWORD>
snmp-server host <MCP_SERVER_IP> version 3 <USERNAME>
snmp-server enable

# OR SNMPv2c Configuration (Less Secure)
snmp-server community <COMMUNITY_STRING> RO
snmp-server host <MCP_SERVER_IP> version 2c <COMMUNITY_STRING>
snmp-server enable
```

**Required MIBs**:
- **Standard MIBs**:
  - IF-MIB (interface statistics)
  - IP-MIB (IP statistics)
  - TCP-MIB (TCP connections)
  - UDP-MIB (UDP statistics)

- **Cisco-Specific MIBs**:
  - CISCO-FIREWALL-MIB
  - CISCO-MEMORY-POOL-MIB
  - CISCO-PROCESS-MIB
  - CISCO-ENHANCED-MEMPOOL-MIB
  - CISCO-ENTITY-SENSOR-MIB

**Required OIDs** (Minimum):
- CPU Utilization: `.1.3.6.1.4.1.9.9.109.1.1.1.1.3`
- Memory Usage: `.1.3.6.1.4.1.9.9.48.1.1.1.5`
- Interface In Octets: `.1.3.6.1.2.1.2.2.1.10`
- Interface Out Octets: `.1.3.6.1.2.1.2.1.16`
- Interface Status: `.1.3.6.1.2.1.2.2.1.8`
- Connection Count: `.1.3.6.1.4.1.9.9.147.1.2.2.2.1.5`

**Polling Frequency**:
- Default: Every 60 seconds
- High-frequency metrics (CPU, memory): Every 30 seconds
- Interface metrics: Every 60 seconds

#### C.4 FMC REST API Requirements

**API Endpoint Base URL**:
```
https://<FMC_IP>/api/fmc_platform/v1/
```

**Required API Permissions**:
- **Read Access**:
  - `/devices/devicerecords` (device inventory)
  - `/policy/accesspolicies` (access control policies)
  - `/object/networks` (network objects)
  - `/object/ports` (port objects)
  - `/deployment/deployabledevices` (deployment status)

- **Write Access** (for configuration changes):
  - `/policy/accesspolicies/{id}/accessrules` (create/modify rules)
  - `/deployment/deploymentrequests` (deploy configurations)

**Authentication**:
- Username/password authentication
- OAuth token (30-minute expiration, requires refresh)
- Store credentials in secure vault (TBD by development agency)

**Rate Limits**:
- Maximum 120 requests per minute
- Implement exponential backoff for rate limit errors

**Required API Responses**:
- Device inventory (JSON)
- Policy configurations (JSON)
- Deployment status (JSON)
- Object definitions (JSON)

#### C.5 SSH Access Requirements

**On FTD Devices**:
```
# SSH Configuration
configure manager add <MANAGEMENT_IP>
ssh <MCP_SERVER_IP> <NETMASK> management
ssh timeout 60
ssh version 2
```

**Authentication Methods**:
1. **SSH Keys (Recommended)**:
   - Generate RSA 4096-bit or ED25519 keys
   - Deploy public key to all FTD devices
   - Store private key in secure vault

2. **Username/Password**:
   - Create dedicated service account (e.g., `mcp_automation`)
   - Strong password (16+ characters)
   - Store in secure vault

**Required CLI Commands Access**:
- `show version`
- `show running-config`
- `show tech-support`
- `show interface`
- `show conn count`
- `show cpu usage`
- `show memory`
- `show logging`
- `show failover` (for HA devices)

**Command Output Format**:
- Plain text output
- Consistent format across FTD versions
- Complete output (no pagination or truncation)

#### C.6 Splunk Enterprise Requirements

**Splunk Configuration**:
- **Splunk Version**: 9.0 or later
- **Deployment**: On-premises Splunk Enterprise
- **Index**: `cisco_ftd_logs` (pre-created)
- **Source Type**: `cisco:ftd:syslog`

**HTTP Event Collector (HEC)**:
```
# Splunk HEC Configuration
Enable HEC: Settings > Data Inputs > HTTP Event Collector
Create HEC Token: <TOKEN_VALUE>
HEC Endpoint: https://<SPLUNK_IP>:8088/services/collector
SSL Certificate: Valid or accept self-signed
```

**Required Splunk Apps** (Optional but Recommended):
- Cisco Security Suite App for Splunk
- Cisco Firepower App for Splunk
- Splunk Common Information Model (CIM) Add-on

**Index Settings**:
- Max index size: 500 GB (or based on log volume)
- Retention: 90 days (hot), 1 year (warm), 7 years (cold)
- Replication factor: 2 (for clustering)
- Search factor: 2

**Parsing Rules**:
- Field extractions for Cisco FTD logs
- Timestamp recognition
- Severity mapping
- Automatic field discovery

#### C.7 Network Infrastructure Requirements

**Bandwidth Requirements**:
- **Syslog Traffic**: 10-50 Mbps per device (depends on log volume)
- **SNMP Polling**: 1-5 Mbps aggregate
- **SSH/API**: 1-10 Mbps aggregate
- **Total Estimate**: 100-500 Mbps for 50 devices

**Network Segmentation**:
- Management network for FTD/FMC access
- Separate VLAN for MCP servers (recommended)
- Firewall rules allowing required protocols

**DNS Requirements**:
- Forward DNS resolution for FMC hostname
- Reverse DNS for IP-to-hostname mapping (optional)

**NTP Requirements**:
- All devices synchronized to same NTP server
- Time drift < 5 seconds (critical for log correlation)

#### C.8 Storage Requirements

**On-Premises Storage Allocation**:

| Component | Storage Needed | Purpose |
|-----------|----------------|---------|
| **PostgreSQL** | 100-500 GB | User data, configurations, change requests |
| **TimescaleDB** | 500 GB - 2 TB | Metrics (2 years retention) |
| **Splunk** | 2-10 TB | Logs (90 days hot, 1 year warm, 7 years cold) |
| **MongoDB** | 100-500 GB | Knowledge base documents |
| **MinIO** | 1-5 TB | Config backups, showtechs, reports |
| **Redis** | 10-50 GB | Cache (in-memory) |
| **Vector DB** | 50-200 GB | Embeddings for RAG |

**Total Storage**: 5-20 TB (depends on scale)

#### C.9 Credentials & Secrets Required

The following credentials must be provided and stored securely:

**FTD Devices**:
- SSH username/password or SSH private key (per device or shared)
- SNMP community string (SNMPv2c) or username/auth/priv passwords (SNMPv3)

**FMC**:
- FMC API username/password
- FMC HTTPS certificate (if using custom CA)

**Splunk**:
- HEC token
- Splunk admin credentials (for initial setup)

**Databases**:
- PostgreSQL admin password
- MongoDB admin password
- Redis password
- Vector DB credentials

**MCP System**:
- Vault master key (for unsealing)
- Encryption keys for data at rest
- JWT signing keys for API authentication

#### C.10 Licensing Requirements

**Cisco Licenses**:
- FTD device licenses (essential, threat, malware)
- FMC license (for API access)
- Splunk Enterprise license (based on daily ingestion volume)
- Cisco Duo Security license (per user)

**Development Agency to Confirm**:
- Vector database licensing (if commercial)
- Any third-party libraries with commercial licenses
- Claude API licensing (if using API vs. self-hosted)

### D. Key Assumptions

1. All infrastructure prerequisites (Section C) are met before deployment
2. **Cisco FTD-only support** (no ASA, PIX, or older Cisco firewall platforms)
3. No third-party vendor firewall support (Palo Alto, Fortinet, Check Point, etc.)
4. Development agency to provide hardware sizing recommendations based on scale
5. Network team responsible for configuring syslog, SNMP, SSH on all FTD devices
6. Splunk Enterprise already deployed and configured (or will be as part of this project)

### D. Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI model hallucinations | High | Confidence scoring, human review for critical changes |
| Configuration deployment failures | High | Pre-deployment validation, automatic rollback, phased rollouts |
| Scalability bottlenecks | Medium | Load testing, auto-scaling, performance optimization |
| Security vulnerabilities | High | Security audits, penetration testing, code reviews |
| Third-party service outages | Medium | Multi-region deployment, fallback mechanisms |

---

**END OF DOCUMENT**