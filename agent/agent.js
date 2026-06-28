import { generateResponse } from "../ai/ollama.js";

/**
 * Runs the IncidentPilot AI using Ollama.
 *
 * @param {string} text
 * @param {string} [sessionId]
 * @param {any} [deps]
 * @returns {Promise<{responseText: string, sessionId: null}>}
 */
export async function runAgent(text, sessionId = undefined, deps = undefined) {
  // sessionId and deps are kept for compatibility with the Slack listeners.
  // They are not currently used by the Ollama implementation.
  void sessionId;
  void deps;

  const responseText = await generateResponse(text);

  return {
    responseText,
    sessionId: null,
  };
}