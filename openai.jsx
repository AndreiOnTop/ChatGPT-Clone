/*const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({apiKey: ''});
const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAI(message) {
    const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
    });
    return res.data.choices[0].text
}; */

//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
/*import axios from 'axios';
export async function sendMsgToOpenAI(message) {
  try {
    console.log('Sending messages:', message);

    const res = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.0-flash-thinking-exp:free',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: 'Bearer',
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API Response:', res.data);

    if (
      res.data && 
      res.data.choices && 
      res.data.choices.length > 0 &&
      res.data.choices[0].message &&
      res.data.choices[0].message.content
    ){
      return res.data.choices[0].message;
    } else {
      throw new Error('Invalid response from OpenAI');  
    }
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
} */

import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: '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',
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': 'https://openrouter.ai',
    'X-Title': 'Anmir',
  }
})

export async function sendMsgToOpenAI(message) {
  try {
    const res = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    console.log('API Response:', res);

    return res.choices[0].message;

  } catch (error) {
    console.error('Error with OpenAI API:', error);
    throw new Error('Failed to fetch response from OpenAI.');
  }
}