import dotenv from "dotenv"
dotenv.config()

import { checkEnv } from "shared/utils"

checkEnv("BOTHUB_API_KEY")

checkEnv("DB_USER")
checkEnv("DB_PASSWORD")
checkEnv("DB_NAME")
checkEnv("DB_HOST")
checkEnv("DB_PORT")
checkEnv("DB_LOGGING")

export default {
  bothubApiKey: process.env.BOTHUB_API_KEY || "",
  database: {
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "",
    isLogging: process.env.DB_LOGGING === "true" || false,
  },
  llm: {
    systemPrompt:
      "You are an assistant with the task of extracting precise information from chat messages. Do your best to include as many data!",
  },
}
