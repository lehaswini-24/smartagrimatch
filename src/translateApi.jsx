import axios from 'axios';

const apiKey = 'AIzaSyCQumbi5veek2GNNZnpTplqkHj-bZnfvN0';  // Replace with your Google API key
const endpoint = 'https://translation.googleapis.com/language/translate/v2';

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(endpoint, {}, {
      params: {
        q: text,
        target: targetLanguage,
        key: apiKey,
      },
    });

    // Return translated text
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Error in translation:", error);
    return text; // In case of error, return the original text
  }
};
