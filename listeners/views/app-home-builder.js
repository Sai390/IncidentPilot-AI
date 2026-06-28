/**
 * Build the App Home Block Kit view.
 * @param {string | null} [installUrl] - OAuth install URL shown when MCP is disconnected.
 * @param {boolean} [isConnected] - Whether the Slack MCP Server is connected.
 * @returns {import('@slack/types').HomeView}
 */
export function buildAppHomeView(installUrl = null,
  isConnected = false
) {
  return {
    type: "home",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🚨 IncidentPilot AI",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*AI-Powered Incident Management Assistant*\n\n" +
            "Analyze production incidents using a local Llama 3.2 model running with Ollama.",
        },
      },

      {
        type: "divider",
      },

      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🤖 Features",
        },
      },

      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "✅ Incident Analysis\n" +
            "✅ Incident Summary\n" +
            "✅ Status Update Generator\n" +
            "✅ Root Cause Analysis (RCA)\n" +
            "✅ Postmortem Generator\n" +
            "✅ Severity Intelligence (P1-P4)",
        },
      },

      {
        type: "divider",
      },

      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🛠 Tech Stack",
        },
      },

      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "• Slack Bolt\n" +
            "• Node.js\n" +
            "• Ollama\n" +
            "• Llama 3.2\n" +
            "• JavaScript",
        },
      },

      {
        type: "divider",
      },

      {
  type: "header",
  text: {
    type: "plain_text",
    text: "💬 Supported Commands",
  },
},

{
  type: "section",
  text: {
    type: "mrkdwn",
    text:
      "*Incident Analysis*\n" +
      "```Players are unable to login.\n" +
      "18,000 users affected.\n" +
      "Production environment.```\n\n" +

      "*Incident Summary*\n" +
      "```summarize:\n<incident details>```\n\n" +

      "*Status Update*\n" +
      "```status:\n<incident details>```\n\n" +

      "*Root Cause Analysis*\n" +
      "```rca:\n<incident details>```\n\n" +

      "*Postmortem*\n" +
      "```postmortem:\n<incident details>```",
  },
},

      {
        type: "divider",
      },

      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "🚀 Version 1.0 | Powered by Ollama + Llama 3.2",
          },
        ],
      },
    ],
  };
}
