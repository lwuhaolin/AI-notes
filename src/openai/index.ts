import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-dc7e1482ed6a459fa7956cb1852a3d2a",
});

export default openai;