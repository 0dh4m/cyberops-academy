/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <0dh4mm@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

// =========================================================================
// AI Service - Multi-Provider Cyber Security Mentor & Assistant
// Supports Google Gemini, OpenAI, Groq, OpenRouter, and Local Ollama
// (English & French)
// =========================================================================

class CyberAIService {
  constructor() {
    this.storageKeyProvider = "cybersec_ai_provider";
    this.storageKeyApiKey = "cybersec_ai_key";
    this.storageKeyModel = "cybersec_ai_model";
    this.storageKeyEndpoint = "cybersec_ai_endpoint";

    // Load defaults or stored settings
    this.provider = localStorage.getItem(this.storageKeyProvider) || "gemini";
    this.apiKey = localStorage.getItem(this.storageKeyApiKey) || "";
    this.model = localStorage.getItem(this.storageKeyModel) || "gemini-1.5-flash";
    this.customEndpoint = localStorage.getItem(this.storageKeyEndpoint) || "";

    this.defaultModels = {
      gemini: "gemini-1.5-flash",
      openai: "gpt-4o-mini",
      groq: "llama-3.3-70b-versatile",
      openrouter: "meta-llama/llama-3.3-70b-instruct",
      custom: "llama3"
    };

    if (!this.model) {
      this.model = this.defaultModels[this.provider] || "gemini-1.5-flash";
    }

    this.systemPrompt = `You are "AEGIS AI", an elite Professor, Mentor, and Senior Cybersecurity & Network Security Architect, specifically assigned to mentor students enrolled in the European Bachelor in Cybersecurity and Network Management (FEDE / Groupe MIAGE).
Your characteristics:
- Bilingual Mastery: You communicate fluently, rigorously, and concisely in English and French (Français technique).
- Technical Depth: Provide production-grade terminal commands (Linux/Bash, PowerShell, Python, SQL, pfSense, Nmap, Wireshark), architectural breakdowns, and concrete step-by-step guidance.
- Educational Pedagogy: Explain core concepts with clear real-world enterprise analogies, then provide technical syntax and offensive/defensive best practices.
- Output Format: Always format code blocks with proper syntax highlighting (\`\`\`bash, \`\`\`python, \`\`\`sql, etc.).`;
  }

  saveConfig(provider, apiKey, model, customEndpoint = "") {
    this.provider = provider;
    this.apiKey = apiKey.trim();
    this.model = model.trim() || this.defaultModels[provider] || "gemini-1.5-flash";
    this.customEndpoint = customEndpoint.trim();

    localStorage.setItem(this.storageKeyProvider, this.provider);
    localStorage.setItem(this.storageKeyApiKey, this.apiKey);
    localStorage.setItem(this.storageKeyModel, this.model);
    localStorage.setItem(this.storageKeyEndpoint, this.customEndpoint);
  }

  getConfig() {
    return {
      provider: this.provider,
      apiKey: this.apiKey,
      model: this.model,
      customEndpoint: this.customEndpoint,
      hasKey: !!this.apiKey
    };
  }

  hasConfiguredKey() {
    if (this.provider === "custom") return true; // Local Ollama might not require a key
    return Boolean(this.apiKey && this.apiKey.length > 5);
  }

  // Test the key connection
  async testConnection() {
    if (!this.hasConfiguredKey()) {
      throw new Error("Please enter your API Key before testing.");
    }
    const testMessage = "Aegis AI connection verification. Please confirm active state in one sentence.";
    const response = await this.sendMessage(testMessage, { isTest: true });
    return response;
  }

  // Main entry point for chatting with AI
  async sendMessage(userMessage, options = {}) {
    if (!this.hasConfiguredKey()) {
      return this.getOfflineFallbackResponse(userMessage, options.contextModule);
    }

    const contextPrefix = options.contextModule 
      ? `[Context: Module ${options.contextModule.num} - ${options.contextModule.titleFr} (${options.contextModule.titleEn})]\n`
      : "";

    const fullUserPrompt = contextPrefix + userMessage;

    try {
      switch (this.provider) {
        case "gemini":
          return await this.callGemini(fullUserPrompt);
        case "openai":
          return await this.callOpenAI(fullUserPrompt);
        case "groq":
          return await this.callGroq(fullUserPrompt);
        case "openrouter":
          return await this.callOpenRouter(fullUserPrompt);
        case "custom":
          return await this.callCustomEndpoint(fullUserPrompt);
        default:
          return await this.callGemini(fullUserPrompt);
      }
    } catch (err) {
      console.error("AI Service Error:", err);
      throw new Error(`Connection error with provider (${this.provider.toUpperCase()}): ${err.message}`);
    }
  }

  // Provider 1: Google Gemini API
  async callGemini(promptText) {
    const modelName = this.model || "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(this.apiKey)}`;

    const bodyData = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${this.systemPrompt}\n\nUser Question:\n${promptText}` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData)
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      const msg = errJson.error?.message || `HTTP error ${res.status}`;
      throw new Error(msg);
    }

    const data = await res.json();
    const candidate = data.candidates?.[0];
    if (!candidate || !candidate.content?.parts?.[0]?.text) {
      throw new Error("No response received from Google Gemini.");
    }
    return candidate.content.parts[0].text;
  }

  // Provider 2: OpenAI API (GPT-4o, GPT-4o-mini, etc.)
  async callOpenAI(promptText) {
    const url = "https://api.openai.com/v1/chat/completions";
    const modelName = this.model || "gpt-4o-mini";

    const bodyData = {
      model: modelName,
      messages: [
        { role: "system", content: this.systemPrompt },
        { role: "user", content: promptText }
      ],
      temperature: 0.7
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(bodyData)
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response received from OpenAI.";
  }

  // Provider 3: Groq Cloud API (Llama 3.3 70B, etc.)
  async callGroq(promptText) {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const modelName = this.model || "llama-3.3-70b-versatile";

    const bodyData = {
      model: modelName,
      messages: [
        { role: "system", content: this.systemPrompt },
        { role: "user", content: promptText }
      ],
      temperature: 0.7
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(bodyData)
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `Groq HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response received from Groq.";
  }

  // Provider 4: OpenRouter API
  async callOpenRouter(promptText) {
    const url = "https://openrouter.ai/api/v1/chat/completions";
    const modelName = this.model || "meta-llama/llama-3.3-70b-instruct";

    const bodyData = {
      model: modelName,
      messages: [
        { role: "system", content: this.systemPrompt },
        { role: "user", content: promptText }
      ]
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
        "HTTP-Referer": window.location.origin || "http://localhost",
        "X-Title": "CyberSec Platform MIAGE"
      },
      body: JSON.stringify(bodyData)
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `OpenRouter HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response received from OpenRouter.";
  }

  // Provider 5: Custom / Local Ollama (OpenAI-compatible)
  async callCustomEndpoint(promptText) {
    const baseEndpoint = this.customEndpoint || "http://localhost:11434/v1";
    const url = `${baseEndpoint.replace(/\/+$/, '')}/chat/completions`;
    const modelName = this.model || "llama3";

    const headers = { "Content-Type": "application/json" };
    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`;
    }

    const bodyData = {
      model: modelName,
      messages: [
        { role: "system", content: this.systemPrompt },
        { role: "user", content: promptText }
      ],
      temperature: 0.7
    };

    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bodyData)
    });

    if (!res.ok) {
      throw new Error(`Custom Endpoint HTTP ${res.status}. Verify that Ollama or local LLM server is active with CORS enabled.`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response from local server.";
  }

  // Fallback when no API Key is set yet
  getOfflineFallbackResponse(userMessage, contextModule) {
    const moduleName = contextModule ? contextModule.titleFr : "Cybersecurity";
    return `### 💡 Welcome to Aegis Cyber AI Mentor!

> [!NOTE]
> You are currently in **Demo Mode** because no **API Key** has been configured yet.

To activate real-time intelligence, custom lab generation, and exam coaching:
1. Click on **⚡ AI Settings** in the top navigation bar.
2. Select your preferred provider (**Google Gemini**, **Groq Cloud**, **OpenAI**, **OpenRouter**, or **Local Ollama**).
3. Paste your **API Key** and click **Save Configuration**.

**Concerning your inquiry about [${moduleName}]:**
You can explore the interactive course notes, cheat sheets, and practical hands-on labs directly inside the platform!`;
  }
}

// Global export
if (typeof window !== "undefined") {
  window.cyberAIService = new CyberAIService();
}
