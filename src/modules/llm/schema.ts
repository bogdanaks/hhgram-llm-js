import { ResumeSchema } from "modules/resume/dto/schema"
import { VacancySchema } from "modules/vacancy/dto/schema"
import { z } from "zod"

export const ResumeOrVacancySchema = z.object({
  is_message_resume_or_vacancy: z
    .boolean()
    .describe("Does the message look like a resume or a job posting?"),
  message_type: z
    .enum(["resume", "vacancy", "misc"])
    .describe("Message type: 'vacancy', 'resume', or 'misc'."),
  does_this_message_type_resume: z.boolean().describe("Does this message look like a resume?"),
  does_this_message_type_vacancy: z
    .boolean()
    .describe("Does this message look like a job posting?"),
  resume: ResumeSchema.nullable().describe("Resume data or null if type not equal resume"),
  vacancy: VacancySchema.nullable().describe("Vacancy data or null if type not equal vacancy"),
})

export type ResumeOrVacancySchemaType = z.infer<typeof ResumeOrVacancySchema>
