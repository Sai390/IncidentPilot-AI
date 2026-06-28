import ollama from "ollama";

const SYSTEM_PROMPT = `
You are an expert Incident Response Assistant.

Do NOT generate:

- Severity
- Suggested Team

Only generate:

📊 Business Impact

🔍 Likely Root Cause

🛠 Immediate Actions
- Bullet points

📋 Next Steps
- Bullet points

⚠ Risk Level

Keep the response concise.
Never invent company information.
`;
/**
 * @param {string} text
 * @returns {string}
 */
function detectSeverity(text) {
  const incident = text.toLowerCase().replace(/,/g, "");

  const production = incident.includes("production");

  const onboarding =
    incident.includes("login") ||
    incident.includes("log in") ||
    incident.includes("registration") ||
    incident.includes("signup") ||
    incident.includes("otp");

  const payment =
    incident.includes("deposit") ||
    incident.includes("payment");

  const withdrawal =
    incident.includes("withdraw") ||
    incident.includes("withdrawal");

  const vip = incident.includes("vip");

  // Extract the first number from the text
  const match = incident.match(/\d+/);
  const users = match ? parseInt(match[0], 10) : 0;

  // Critical production services
  if (production && (onboarding || payment || withdrawal)) {
    if (users >= 10000) return "P1";
    if (users >= 1000) return "P2";
    if (users >= 100) return "P3";
  }

  // VIP always gets elevated
  if (vip) return "P2";

  // Single player issues
  if (
    incident.includes("one player") ||
    incident.includes("single player") ||
    incident.includes("2 players")
  ) {
    return "P4";
  }

  return production ? "P3" : "P4";
}
/**
 * @param {string} text
 * @returns {string}
 */
function detectTeam(text) {
  const incident = text.toLowerCase();

  // Authentication
  if (
    incident.includes("login") ||
    incident.includes("log in") ||
    incident.includes("authentication") ||
    incident.includes("otp") ||
    incident.includes("password reset") ||
    incident.includes("forgot password")
  ) {
    return "Authentication Team";
  }

  // Registration / Onboarding
  if (
    incident.includes("registration") ||
incident.includes("register") ||
incident.includes("registered") ||
incident.includes("signup") ||
incident.includes("sign up") ||
incident.includes("create account")
  ) {
    return "Onboarding Team";
  }

  // Payments
  if (
    incident.includes("deposit") ||
    incident.includes("payment") ||
    incident.includes("upi") ||
    incident.includes("credit card") ||
    incident.includes("debit card") ||
    incident.includes("net banking") ||
    incident.includes("transaction failed")
  ) {
    return "Payments Team";
  }

  // Wallet / Withdrawal
  if (
    incident.includes("withdraw") ||
    incident.includes("withdrawal") ||
    incident.includes("wallet") ||
    incident.includes("cashout") ||
    incident.includes("cash out")
  ) {
    return "Wallet Team";
  }

  // KYC / Compliance
  if (
    incident.includes("kyc") ||
    incident.includes("verification") ||
    incident.includes("identity verification") ||
    incident.includes("document verification")
  ) {
    return "Compliance Team";
  }

  // Responsible Gaming
  if (
    incident.includes("responsible gaming") ||
    incident.includes("self exclusion") ||
    incident.includes("deposit limit") ||
    incident.includes("rg")
  ) {
    return "Responsible Gaming Team";
  }

  // Promotions
  if (
    incident.includes("bonus") ||
    incident.includes("promotion") ||
    incident.includes("promo") ||
    incident.includes("free spin") ||
    incident.includes("free bet") ||
    incident.includes("reward")
  ) {
    return "Promotions Team";
  }

  // Casino
  if (
    incident.includes("casino") ||
    incident.includes("slot") ||
    incident.includes("roulette") ||
    incident.includes("blackjack") ||
    incident.includes("poker")
  ) {
    return "Gaming Team";
  }

  // Sportsbook
  if (
    incident.includes("sportsbook") ||
    incident.includes("bet") ||
    incident.includes("bet settlement") ||
    incident.includes("settlement") ||
    incident.includes("odds")
  ) {
    return "Sportsbook Team";
  }

  return "Manual Triage Required";
}
/**
 * @param {string} text
 * @returns {Promise<string>}
 */
export async function generateResponse(text) {
    const severity = detectSeverity(text);
    const team = detectTeam(text);
    console.log("Detected Severity:", severity);
    console.log("Detected Team:", team);
  let prompt = "";

  if (text.toLowerCase().startsWith("summarize:")) {
    prompt = `
Summarize the following production incident.

Return only:
- Incident Summary
- Severity
- Business Impact

Incident:
${text.replace(/^summarize:/i, "").trim()}
`;
  } else if (text.toLowerCase().startsWith("status:")) {
    prompt = `
Generate a professional stakeholder incident update.

Return:
🚨 Incident Update

Current Status

Customer Impact

Work in Progress

Next Update

Incident:
${text.replace(/^status:/i, "").trim()}
`;
   
  } else if (text.toLowerCase().startsWith("rca:")) {
  prompt = `
Perform a Root Cause Analysis.

Return:

🔍 Likely Root Cause

Evidence Required

Immediate Checks

Recommended Investigation

Incident:
${text.replace(/^rca:/i, "").trim()}
`;
} else if (text.toLowerCase().startsWith("postmortem:")) {
  prompt = `
Generate a professional incident postmortem.

Return:

📄 Incident Summary

🕒 Timeline

🔍 Root Cause

🛠 Resolution

📊 Customer Impact

📚 Lessons Learned

✅ Preventive Actions

📌 Action Items

Incident:
${text.replace(/^postmortem:/i, "").trim()}
`;
} 
   else {
    prompt = text;
  }

  const response = await ollama.chat({
    model: "llama3.2:3b",
    messages: [
  {
    role: "system",
   content: SYSTEM_PROMPT + `

==============================
INCIDENTPILOT CLASSIFICATION ENGINE
==============================

The IncidentPilot rule engine has already completed the incident classification.

FINAL CLASSIFICATION

Severity : ${severity}

Owning Team : ${team}

These values are FINAL.

DO NOT:
- Change the Severity
- Change the Owning Team
- Infer a different Severity
- Infer a different Team
- Recommend another primary team

Your job is NOT to classify the incident.

Your job is ONLY to generate:

• Incident Summary
• Business Impact
• Likely Root Cause
• Immediate Actions
• Next Steps
• Risk Level

When generating the final response:

- Display Severity exactly as "${severity}"
- Display Suggested Team exactly as "${team}"
- Explain WHY this Severity and Team are appropriate.
- Never replace them with your own reasoning.

If information is missing, state "Unknown" rather than inventing details.
`,
  },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const incidentText = text
  .replace(/^summarize:/i, "")
  .replace(/^status:/i, "")
  .replace(/^rca:/i, "")
  .replace(/^postmortem:/i, "")
  .trim();

const aiAnalysis = response.message.content
  .replace(/🚨 Incident Summary[\s\S]*?(?=📊|🔍|🛠|📋|⚠|$)/i, "")
  .replace(/🔥 Severity[\s\S]*?(?=📊|🔍|🛠|📋|⚠|$)/i, "")
  .replace(/👨‍💻 Suggested Team[\s\S]*?(?=📊|🔍|🛠|📋|⚠|$)/i, "")
  .trim();

return `
🚨 Incident Summary

${incidentText}

🔥 Severity

${severity}

👨‍💻 Suggested Team

${team}

${aiAnalysis}
`;
}