import axios from 'axios';
import getOrRequestToken from '../getOrRequestToken';

type GenerateTextParams = {
  model: 'gemini-2.5-flash';
  apiKey: string;
  systemInstruction: string;
  contents: string;
};

const generateText = async ({ model, apiKey, systemInstruction, contents }: GenerateTextParams) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const headers = {
    'x-goog-api-key': apiKey,
  };

  const data = {
    system_instruction: {
      parts: [
        {
          text: systemInstruction,
        },
      ],
    },
    contents: [
      {
        parts: [
          {
            text: contents,
          },
        ],
      },
    ],
  };

  const response = await axios.post(url, data, { headers });
  return response.data.candidates[0].content.parts[0].text as string;
};

export default generateText;
