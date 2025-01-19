import {
  ExperienceLevel,
  Languages,
  Salary,
  Specialties,
  WorkFormat,
  WorkTime,
} from "shared/schemas"
import { z } from "zod"

export const ContactsResume = z.object({
  email: z.string().nullable().describe("Email address of the candidate."),
  phone: z.string().nullable().describe("Phone number of the candidate."),
  telegram: z.string().nullable().describe("Telegram username of the candidate."),
  linkedin: z.string().nullable().describe("LinkedIn profile URL of the candidate."),
  github: z.string().nullable().describe("GitHub profile URL of the candidate."),
  cv: z.string().nullable().describe("URL of the candidate's CV or resume."),
  other: z.string().nullable().describe("Other contact information of the candidate."),
})

export const ResumeSchema = z.object({
  name: z.string().describe("Full name of the author of this resume."),
  position: z.string().describe("Job position the author is seeking in the resume."),
  description: z.string().nullable().describe("Detailed summary or content of the resume."),
  experience_months: z.number().describe("Work experience in months."),
  education: z.string().nullable().describe("The highest level of education completed."),
  skills: z
    .array(z.string())
    .describe("List of key skills relevant to the resume. No more than 10 skills"),
  work_format: z.array(WorkFormat).nullable().describe("Preferred work format."),
  experience_level: ExperienceLevel.nullable().describe("Experience level."),
  work_time: z.array(WorkTime).nullable().describe("Preferred work time format."),
  salary: Salary.nullable().describe("Salary expectations."),
  languages: z.array(Languages).nullable().describe("Languages with proficiency levels."),
  contacts: ContactsResume.nullable().describe("Contact details from the resume."),
  location: z.string().nullable().describe("Location of the candidate."),
  specialties: z
    .array(Specialties)
    .describe("List of specialties relevant to the resume. No more than 3 specialties."),
})

export const ResumeParseSchema = z.object({
  is_message_resume: z.boolean().describe("Does the message look like a resume?"),
  resume: ResumeSchema.nullable().describe("Resume data or null if type not equal resume"),
})

export type ResumeSchemaType = z.infer<typeof ResumeSchema>
export type ResumeParseSchemaType = z.infer<typeof ResumeParseSchema>
