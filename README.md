# 🚨 IncidentPilot AI

AI-powered Incident Management Assistant for Slack using **Ollama** and **Llama 3.2**.

IncidentPilot helps engineering teams quickly analyze production incidents, classify severity, identify the responsible team, and generate AI-powered operational guidance directly within Slack.

---

# 🚀 Project Overview

IncidentPilot AI is a Slack-based Incident Management Assistant designed to improve incident response during production outages.

Instead of relying entirely on AI for incident classification, IncidentPilot combines a **rule-based classification engine** with **AI-powered analysis**.

This approach ensures:

* Deterministic Severity Classification
* Intelligent Team Routing
* AI-generated Incident Analysis
* Faster Incident Response

---

# ✨ Features

* ✅ Incident Analysis
* ✅ Incident Summary
* ✅ Severity Classification (P1–P4)
* ✅ Intelligent Team Routing
* ✅ Root Cause Analysis (RCA)
* ✅ Status Update Generator
* ✅ Postmortem Generator
* ✅ Business Impact Analysis
* ✅ Immediate Action Recommendations
* ✅ Slack App Home
* ✅ Local AI using Ollama
* ✅ Llama 3.2 Integration

---

# 🏗 Architecture

```
                Slack User
                     │
                     ▼
             Slack Bolt App
                     │
                     ▼
             IncidentPilot AI
       ┌─────────────────────────┐
       │ Severity Engine         │
       │ Team Routing Engine     │
       │ Prompt Builder          │
       └───────────┬─────────────┘
                   │
                   ▼
           Ollama (Llama 3.2)
                   │
                   ▼
      AI Analysis & Recommendations
```

---

# ⚙ Tech Stack

| Component | Technology           |
| --------- | -------------------- |
| Language  | JavaScript (Node.js) |
| Framework | Slack Bolt SDK       |
| AI        | Ollama               |
| LLM       | Llama 3.2            |
| Platform  | Slack                |
| Runtime   | Node.js              |

---

# 🔄 How It Works

1. User reports an incident in Slack.
2. IncidentPilot classifies Severity (P1–P4).
3. IncidentPilot identifies the responsible team.
4. The incident is sent to Ollama.
5. Ollama generates:

   * Business Impact
   * Likely Root Cause
   * Immediate Actions
   * Next Steps
   * Risk Level
6. IncidentPilot combines rule-based classification with AI analysis and returns the final response.

---

# 🎯 Team Routing

| Incident Type         | Assigned Team           |
| --------------------- | ----------------------- |
| Login                 | Authentication Team     |
| Registration          | Onboarding Team         |
| OTP                   | Authentication Team     |
| Deposit               | Payments Team           |
| Withdrawal            | Wallet Team             |
| KYC                   | Compliance Team         |
| Responsible Gaming    | Responsible Gaming Team |
| Bonus / Promotions    | Promotions Team         |
| Casino                | Gaming Team             |
| Sports Bet Settlement | Sportsbook Team         |

---

# 🚦 Severity Rules

| Scenario                                  | Severity |
| ----------------------------------------- | -------- |
| Production outage impacting 10,000+ users | P1       |
| Production outage impacting 1,000+ users  | P2       |
| Production outage impacting 100+ users    | P3       |
| Individual or low-impact issues           | P4       |
| VIP customer issue                        | P2       |

---

# 📸 Screenshots

## App Home

*Add screenshot here.*

## Incident Analysis

*Add screenshot here.*

## Root Cause Analysis

*Add screenshot here.*

## Status Update

*Add screenshot here.*

## Postmortem

*Add screenshot here.*

---

# 🛠 Installation

```bash
git clone https://github.com/Sai390/IncidentPilot-AI.git

cd IncidentPilot-AI

npm install

ollama serve

ollama run llama3.2:3b

slack run
```

---

# 🚀 Usage

Example Incident

```
Players cannot login.

18,000 users affected.

Production.
```

IncidentPilot automatically:

* Detects Severity
* Routes to the correct Team
* Generates AI-powered Incident Analysis
* Suggests Immediate Actions
* Generates RCA
* Generates Status Updates
* Generates Postmortems

---

# 🛣 Future Enhancements

* Slack MCP Integration
* Jira Ticket Creation
* ServiceNow Integration
* PagerDuty Integration
* Grafana Alerts
* Splunk Log Analysis
* Azure Monitor Integration
* Incident Timeline Visualization

---

# 👨‍💻 Author

**Sai Praneeth**

Built for learning, innovation, and modern AI-powered incident management.
