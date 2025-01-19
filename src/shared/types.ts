export type WorkFormat = "remote" | "office" | "hybrit" | "any" | "unknown"
export type WorkTime = "part_time" | "full_time" | "project_based" | "any" | "unknown"
export type ExperienceLevel = "intern" | "junior" | "middle" | "senior" | "unknown"
export type Salary = {
  min: number
  max: number
  currency: string
  period: "hour" | "month" | "quarter" | "year" | "unknown"
}
export type LanguageLevel =
  | "beginner"
  | "elementary"
  | "intermediate"
  | "advanced"
  | "fluent"
  | "native"
export type Language = Array<Record<string, LanguageLevel>>
export interface RequestAuth extends Request {
  id: string
}
export type MessagePreType = "resume" | "vacancy"
