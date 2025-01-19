import { z } from "zod"

export const WorkFormat = z.enum(["remote", "office", "hybrit", "any", "unknown"])
export const WorkTime = z.enum(["part_time", "full_time", "project_based", "any", "unknown"])
export const ExperienceLevel = z.enum(["intern", "junior", "middle", "senior", "unknown"])
export const Currency = z.enum(["rub", "usd", "eur", "other"])
export const SalaryPeriod = z.enum(["hour", "month", "quarter", "year", "unknown"])
export const Specialties = z.enum([
  "frontend",
  "backend",
  "fullstack",
  "mobile",
  "qa",
  "devops",
  "ui_ux",
  "product_owner",
  "project_manager",
  "business_analyst",
  "data_scientist",
  "data_engineer",
  "machine_learning",
  "security",
  "game_dev",
  "network_engineer",
  "system_admin",
  "support",
  "tech_writer",
  "sales",
  "marketing",
  "blockchain",
  "embedded",
  "cloud",
  "database_admin",
  "consultant",
  "ai_engineer",
  "vr_ar",
  "hr",
  "recruiter",
  "other",
])

export const Languages = z.object({
  language: z.string().describe("Name of the language."),
  level: z
    .enum(["beginner", "elementary", "intermediate", "advanced", "fluent", "native"])
    .describe("Level of proficiency in the language."),
})

export const Salary = z.object({
  min: z.number().nullable().describe("Salary minimum value"),
  max: z.number().nullable().describe("Salary maximum value"),
  currency: Currency.nullable().describe("Salary currency (e.g., usd, eur, rub)"),
  period: SalaryPeriod.nullable().describe("Salary period (e.g., monthly, quarterly, yearly)"),
})
