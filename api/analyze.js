module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return response.status(501).json({ error: "OPENAI_API_KEY is not configured" });
  }

  try {
    const input = await readJsonBody(request);
    const prompt = buildPrompt(input);

    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
        input: prompt,
        text: {
          format: {
            type: "json_schema",
            name: "liu_ren_reading",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                situation: { type: "string" },
                action: { type: "string" }
              },
              required: ["situation", "action"]
            }
          }
        }
      })
    });

    if (!aiResponse.ok) {
      const detail = await aiResponse.text();
      return response.status(502).json({ error: "OpenAI request failed", detail });
    }

    const data = await aiResponse.json();
    const text = data.output_text || extractOutputText(data);
    const parsed = JSON.parse(text);

    return response.status(200).json({
      situation: limitText(parsed.situation, 220),
      action: limitText(parsed.action, 160)
    });
  } catch (error) {
    return response.status(500).json({ error: "Analysis failed" });
  }
};

function buildPrompt(input) {
  const safeQuestion = String(input.question || "未填写具体问题").slice(0, 120);
  const sign = String(input.sign || "");
  const keywords = String(input.keywords || "");
  const signSummary = String(input.signSummary || "");
  const baseSituation = String(input.baseSituation || "");
  const baseAction = String(input.baseAction || "");
  const topic = String(input.topic || "综合");
  const topicLens = String(input.topicLens || "");
  const timeText = String(input.timeText || "");

  return [
    "你是一个东方灵感占问工具的分析引擎。请基于小六壬卦象做温和、克制、可执行的分析。",
    "不要声称能预测命运，不要制造焦虑，不要给医疗、法律、投资等专业结论。",
    "输出必须是 JSON，字段只有 situation 和 action。",
    "situation 约 120-180 个中文字符，要结合用户问题、主题和卦象解释当下状态。",
    "action 约 60-100 个中文字符，只给一个现实可执行的下一步。",
    "",
    `用户问题：${safeQuestion}`,
    `起课时间：${timeText}`,
    `主题：${topic}`,
    `主题判断：${topicLens}`,
    `卦象：${sign}`,
    `关键词：${keywords}`,
    `卦象基础解释：${signSummary}`,
    `基础状态：${baseSituation}`,
    `基础行动：${baseAction}`
  ].join("\n");
}

function extractOutputText(data) {
  const chunks = [];

  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) {
        chunks.push(content.text);
      }
    }
  }

  return chunks.join("\n");
}

function readJsonBody(request) {
  if (request.body && typeof request.body === "object") {
    return Promise.resolve(request.body);
  }

  return new Promise((resolve, reject) => {
    let raw = "";

    request.on("data", function (chunk) {
      raw += chunk;
      if (raw.length > 16_384) {
        request.destroy();
        reject(new Error("Request body too large"));
      }
    });

    request.on("end", function () {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", reject);
  });
}

function limitText(text, maxLength) {
  const value = String(text || "").trim();
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
}
