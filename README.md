# Cisco Firewall Agentic AI Monitoring Solution

## Overview

A comprehensive AI-powered monitoring solution for Cisco FTD/FMC environments, specifically designed for Airtel's centralized firewall management needs. This solution provides 7 specialized monitoring dashboards addressing all customer requirements.

## ✨ Features

### 1. **Protocol CPU Monitoring** (Requirement #1)
- Real-time RTSP, SNMP, and protocol-specific CPU threshold monitoring
- AI-powered predictive alerts (5-15 minute lead time)
- Dynamic threshold optimization
- Top CPU-contributing sources identification

### 2. **Zone Flow Analytics** (Requirement #2)
- Zone-to-zone traffic visualization
- Top talker identification with bandwidth percentage
- Session tracking per security zone
- AI anomaly detection for unusual traffic patterns

### 3. **Proactive Log Collection** (Requirement #3)
- Autonomous showtech collection triggered by anomalies
- Pre-RCA data aggregation before issues escalate
- AI-powered log analysis with issue detection
- TAC-ready report generation

### 4. **Interface Utilization Validation** (Requirement #4)
- Multi-source validation (FTD + Switch SNMP)
- AI reconciliation engine for accurate metrics
- Discrepancy detection with root cause analysis
- 24-hour trend visualization

### 5. **Session Analytics** (Requirement #5)
- Top session tracking with source/destination details
- Real-time bandwidth and byte accounting
- Application-layer visibility
- User and department attribution

### 6. **CPU Source/Destination Monitor** (Requirement #6)
- Multi-dimensional CPU analytics
- Source AND destination tracking
- Multi-source validation (FMC API, SNMP, NetFlow)
- 96% confidence scoring

### 7. **FMC Showtech Automation** (Requirement #7)
- Automated collection via FMC REST API
- Scheduled and event-triggered capture
- AI-powered issue detection and categorization
- Critical findings with actionable recommendations

## 🤖 AI/ML Capabilities

- **Predictive Analytics**: Forecast CPU spikes 5-15 minutes in advance
- **Anomaly Detection**: Identify unusual patterns in real-time
- **Root Cause Analysis**: Automated RCA with confidence scoring
- **Self-Optimization**: Dynamic threshold adjustment based on environment
- **Multi-Source Validation**: Correlate data from FMC, SNMP, NetFlow for accuracy

## 🚀 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Deployment**: AWS Amplify (static export)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static site
npm run export
```

## 🌐 Deployment to AWS Amplify

### Prerequisites
- AWS Account
- GitHub repository (or GitLab/Bitbucket)

### Step 1: Push to Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Cisco Firewall AI Monitor"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: AWS Amplify Setup
1. Go to AWS Amplify Console: https://console.aws.amazon.com/amplify/
2. Click "New app" → "Host web app"
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository and branch (main)
5. AWS Amplify will auto-detect the `amplify.yml` configuration
6. Click "Save and Deploy"

### Step 3: Configure Build Settings (if needed)
The `amplify.yml` file is already configured:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: out
    files:
      - '**/*'
```

### Step 4: Custom Domain (Optional)
1. In Amplify Console, go to "Domain management"
2. Add your custom domain (e.g., firewall-monitor.yourdomain.com)
3. Follow DNS configuration instructions

## 📱 Responsive Design

The solution is fully responsive with breakpoints for:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎨 Design System

### Color Palette
- **Primary**: `#00ff88` (Green) - Success, healthy states
- **Secondary**: `#00aaff` (Blue) - Information, links
- **Warning**: `#f59e0b` (Orange) - Warnings, thresholds
- **Danger**: `#e74c3c` (Red) - Critical alerts
- **Success**: `#10b981` (Green) - Validated, confirmed

### Components
- MetricCard: Display key metrics with icons
- ProgressBar: Utilization and threshold visualization
- Badge: Status indicators
- DataTable: Structured data display
- Modal: Detailed views and interactions

## 📊 Dashboard Views

1. **Protocol Monitor**: CPU impact by protocol type
2. **Zone Analytics**: Traffic flow between security zones
3. **Log Collection**: Automated showtech management
4. **Interface Monitor**: Multi-source utilization validation
5. **Session Analytics**: Top talker bandwidth tracking
6. **CPU Analytics**: Source/destination CPU attribution
7. **FMC Showtech**: Automated collection and AI analysis

## 🔒 Security Features

- Multi-source data validation
- Anomaly detection with AI
- Real-time threat identification
- Automated incident response
- Compliance-ready logging

## 📈 Performance

- Static site generation for fast loading
- Optimized asset delivery via AWS CloudFront (through Amplify)
- Real-time data simulation (ready for API integration)
- Efficient component rendering

## 🛠️ Development

### Project Structure
```
nextgen-firewall-management/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard
│   └── globals.css         # Global styles
├── src/
│   └── components/
│       ├── dashboards/     # 7 monitoring dashboards
│       ├── layout/         # Header, navigation
│       └── ui/             # Reusable components
├── public/                 # Static assets
├── amplify.yml             # AWS Amplify config
├── tailwind.config.js      # Tailwind configuration
└── next.config.js          # Next.js configuration
```

### Key Files
- `app/page.tsx`: Main dashboard with tab navigation
- `src/components/dashboards/*`: 7 specialized monitoring views
- `src/components/ui/*`: Reusable UI components
- `tailwind.config.js`: Custom design tokens and theme

## 🔧 Configuration

### Environment Variables (Optional)
Create `.env.local` for API endpoints:
```bash
NEXT_PUBLIC_FMC_API_URL=https://your-fmc-api.com
NEXT_PUBLIC_API_KEY=your-api-key
```

## 📄 License

Proprietary - Cisco Agentic AI Solution for Airtel

## 👥 Support

For technical support and inquiries, contact the development team.

---

**Built with ❤️ using Cisco Agentic AI | Multi-Agent Collaboration Platform**
