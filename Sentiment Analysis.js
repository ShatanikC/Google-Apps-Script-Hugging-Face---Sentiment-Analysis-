/**
 * Custom function to find the sentiment of the text.
 * @param {String} text The text for the sentiment analysis.
 * @param {String} modelName Optional to palce the model name to be used for the sentiment analysis.
 * @param {Array} The Sentiment and the percent of of it.
 * @customfunction
 */
function SentimentAnalaysis(text,modelName) {
  var model=(modelName!==undefined || modelName==="") ? modelName : "cardiffnlp/twitter-roberta-base-sentiment-latest";
  const apiKey=PropertiesService.getScriptProperties().getProperty("HF_API_KEY");
  if (!apiKey){
    throw new Error("Hugging Face API Key missing!");
  }
  const url = `https://router.huggingface.co/hf-inference/models/${model}`;
  const payload= {
    inputs: text
  };
  const options={
    method: "post",
    headers:{
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    }, payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  try {
    const response =UrlFetchApp.fetch(url,options);
    const responseCode = response.getResponseCode();
    const resultText = response.getContentText();

    if (responseCode!==200){
      if (responseCode===503){
        return [["Model is loading! Please try again after 1 minute!", ""]];
      } return [[`Error (${responseCode}): ${resultText}`, ""]];
    } const data= JSON.parse(resultText);
    if (Array.isArray(data) && data.length>0){
      let predictions=Array.isArray(data[0]) ? data[0] : data
      predictions.sort((a,b)=> b.score-a.score);
      const topLabel=predictions[0].label;
      const confidence =(predictions[0].score*100).toFixed(2);
      return [[topLabel, confidence]];
    }return [[JSON.stringify(data), ""]];
  } catch (error){
    return [[`Script Error: ${error.toString()}`, ""]];
  }
}
