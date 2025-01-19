import {
  ExperienceLevel,
  Languages,
  Salary,
  Specialties,
  WorkFormat,
  WorkTime,
} from "shared/schemas"
import { z } from "zod"

export const ContactsVacancy = z.object({
  email: z.string().nullable().describe("Email address for the vacancy."),
  phone: z.string().nullable().describe("Phone number for the vacancy."),
  telegram: z.string().nullable().describe("Telegram username for the vacancy."),
  site: z.string().nullable().describe("Website URL for the vacancy."),
  other: z.string().nullable().describe("Other contact information for the vacancy."),
})

export const VacancySchema = z.object({
  company_name: z.string().describe("Name of the company offering the vacancy."),
  position: z.string().describe("Job position for the vacancy."),
  description: z.string().nullable().describe("Detailed description of the job role."),
  experience_months: z.number().describe("Required work experience in months."),
  education: z.string().nullable().describe("Required education level."),
  skills: z
    .array(z.string())
    .describe("List of key skills required for the job. No more than 10 skills"),
  work_format: z.array(WorkFormat).nullable().describe("Preferred work format for the vacancy."),
  experience_level: ExperienceLevel.nullable().describe("Required experience level."),
  work_time: z.array(WorkTime).nullable().describe("Required work time format."),
  salary: Salary.nullable().describe("Salary range for the position."),
  languages: z.array(Languages).nullable().describe("Languages required for the job."),
  location: z.string().nullable().describe("Location of the company."),
  contacts: ContactsVacancy.nullable().describe("Contact details for the vacancy."),
  specialties: z
    .array(Specialties)
    .describe("List of specialties relevant to the vacancy. No more than 3 specialties."),
})

export const VacancyParseSchema = z.object({
  is_message_vacancy: z.boolean().describe("Does the message look like a job posting?"),
  vacancy: VacancySchema.nullable().describe("Vacancy data or null if type not equal vacancy"),
})

export type VacancySchemaType = z.infer<typeof VacancySchema>
export type VacancyParseSchemaType = z.infer<typeof VacancyParseSchema>
