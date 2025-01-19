import config from "config"
import OpenAI from "openai"

export const openai = new OpenAI({
  apiKey: config.bothubApiKey,
  baseURL: "https://bothub.chat/api/v2/openai/v1",
})
