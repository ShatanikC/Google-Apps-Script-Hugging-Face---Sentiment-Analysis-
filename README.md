# Google-Apps-Script-Hugging-Face---Sentiment-Analysis-
A Google Apps Script Sentiment Analysis script through free Hugging Face models.

# Google Sheets AI Sentiment & Aspect Analysis (Hugging Face API)

A collection of custom Google Apps Script functions that integrate directly with the **Hugging Face Inference Router** to bring advanced Natural Language Processing (NLP) straight into Google Sheets. 

Whether you need simple whole-text classification or granular **Aspect-Based Sentiment Analysis (ABSA)** powered by large language models, this project lets you analyze text columns instantly using familiar spreadsheet formulas.

---

## Features

*   **Whole-Text Sentiment Analysis:** Quickly classify reviews, tweets, or feedback into sentiment labels with confidence scores, spilling results across columns automatically.
*   **Aspect-Based Sentiment Analysis (ABSA):** Break down complex reviews (e.g., *"the food was good but the bathroom was stinky"*) to evaluate individual aspects/features with their own sentiment and score.
*   **OpenAI-Compatible Chat Router Support:** Utilizes Hugging Face's latest chat router endpoints (`/v1/chat/completions`) for robust structured data extraction using models like `Qwen/Qwen2.5-7B-Instruct`.
*   **Configurable Model Selection:** Easily swap out model names via function parameters or fall back to powerful defaults (like `cardiffnlp/twitter-roberta-base-sentiment-latest`).
*   **Spill-Friendly 2D Arrays:** Functions return multi-dimensional arrays that automatically populate adjacent rows and columns like native Google Sheets functions.

---

## Installation & Setup

1. Open your Google Sheet, click on **Extensions** > **Apps Script**.
2. Paste the script code into your project editor.
3. Set up your Hugging Face API key securely:
   * In the Apps Script editor, click the **Gear icon (Project Settings)** on the left.
   * Scroll down to **Script Properties** and click **Add script property**.
   * Property name: `HF_API_KEY`
   * Value: Your Hugging Face Access Token (`hf_...`)
4. You can also use the Set API Key file to set up the Hugging Face API key securely:
    * Place the Hugging Face API key in the const "apiKey" inside the file.
    * Run the file once.
    * Scroll down to **Script Properties** and review if the Property name: `HF_API_KEY` shows up.
5. Save the project.

---

## Usage Examples

### 1. Aspect-Based Analysis with Scores
Extracts distinct parts, sentiments, and confidence scores into a dynamic table:
```excel
=AspectSentimentWithScore(A2)
```

### 2. Sentiment Analysis with Scores
Shows a single sentiment with score in a single dynamic table:
```excel
=SentimentAnalaysis(A2)
