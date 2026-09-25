function setHuggingFaceApiKey() {
  const apiKey = "YOUR_HF_API_KEY"; // Replace with your actual token
  PropertiesService.getScriptProperties().setProperty("HF_API_KEY", apiKey);
  Logger.log("API Key saved successfully!");
}
