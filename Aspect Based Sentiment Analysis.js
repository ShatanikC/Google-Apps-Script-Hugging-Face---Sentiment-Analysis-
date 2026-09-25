/**
 * Custom function to get sentiment of each aspect of the text.
 * @param {String} text The String input for the Sentiment Analysis.
 * return {Array<Array>} Each aspect and their respective sentiment.
 * @customfunction
 */
function AspectBasedSentimentAnalysis(text) {
  const url = "https://router.huggingface.co/v1/chat/completions";
  const apiKey = PropertiesService.getScriptProperties().getProperty("HF_API_KEY");
  if (!apiKey) {
    throw new Error("No HF key found! Please update it in the script.");
  }
  const systemInstruction = "You are a precise sentiment analysis engine. Extract each distinct aspect mentioned, its sentiment (Positive, Negative, or Neutral), and a confidence score out of 100. Provide your answer strictly as a pipe-separated list with each pair on a new line: Aspect | Sentiment | Score. Do not include markdown blocks, introductory, or concluding text.";
  const payload = {
    model: "meta-llama/Llama-3.1-8B-Instruct:cheapest", 
    messages: [
      { role: "system", content: systemInstruction },
      { role: "user", content: `Review: "${text}"` }
    ],
    max_tokens: 200,
    temperature: 0.1
  };
  const options = {
    method: "post",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json" 
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const resultText = response.getContentText();
    if (responseCode !== 200) {
      if (responseCode === 503) {
        return [["Model is loading! Please try again after 1 minute!", "", ""]];
      }
      return [[`Error (${responseCode}): ${resultText}`, "", ""]];
    }
    const data = JSON.parse(resultText);
    let generatedString = "";
    if (data.choices && data.choices[0] && data.choices[0].message) {
      generatedString = data.choices[0].message.content;
    } else {
      return [[JSON.stringify(data), "", ""]];
    }
    let cleanOutput = generatedString.replace(/```[a-z]*\n?/g, "").replace(/```/g, "").trim();
    
    const lines = cleanOutput.split('\n');
    let outputTable = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line || line.toLowerCase().includes("aspect| sentiment")) continue;
      
      let parts = line.split("|");
      if (parts.length < 3) {
        parts = line.split(":");
      }

      if (parts.length >= 3) {
        let aspect = parts[0].replace(/[-*•]/g, "").trim();
        let sentiment = parts[1].trim();
        let scoreStr = parts[2].replace(/[^0-9.]/g, "").trim();
        let score = scoreStr ? Number(scoreStr) : "";
        outputTable.push([aspect, sentiment, score]);
      }
    }
    if (outputTable.length === 0) {
      return [[cleanOutput, "", ""]];
    }
    return outputTable;
  } catch (error) {
    return [[`Script Error: ${error.toString()}`, "", ""]];
  }
}