import { AppDataSource } from "shared/db-connection"
import { ResumeEntity } from "./entity"
import { ResumeSchemaType } from "./dto/schema"
import { Logger } from "winston"
import { clearDuplicates } from "shared/utils"

interface ResumeServiceProps {
  logger: Logger
}

export class ResumeService {
  protected logger: Logger
  protected resumeRepository

  constructor({ logger }: ResumeServiceProps) {
    this.resumeRepository = AppDataSource.getRepository<ResumeEntity>(ResumeEntity)
    this.logger = logger
  }

  async getResumeCount() {
    return await this.resumeRepository
      .createQueryBuilder("resume")
      .leftJoinAndSelect("resume.message", "message")
      .leftJoinAndSelect("message.source", "source")
      .orderBy("message.message_at", "DESC")
      .getCount()
  }

  async getResumeById(resume_id: string) {
    return await this.resumeRepository.findOne({
      where: { id: resume_id },
    })
  }

  async getUniqSkills() {
    const rawQuery = `
    SELECT LOWER(skill) AS skill, COUNT(*) AS count
    FROM resume, UNNEST(resume.skills) AS skill
    GROUP BY LOWER(skill)
    ORDER BY count DESC;
  `
    return await this.resumeRepository.query(rawQuery)
  }

  async save(resume: ResumeSchemaType, messageId: string, tgUserId: string | null) {
    try {
      return await this.resumeRepository.save({
        message_id: messageId,
        tg_user_id: tgUserId,
        position: resume.position,
        name: resume.name,
        description: resume.description,
        experience_months: resume.experience_months,
        education: resume.education,
        skills: resume.skills,
        work_format: resume.work_format ? clearDuplicates(resume.work_format) : null,
        work_time: resume.work_time ? clearDuplicates(resume.work_time) : null,
        experience_level: resume.experience_level,
        salary: resume.salary,
        languages: resume.languages,
        contacts: resume.contacts,
        location: resume.location,
        specialties: clearDuplicates(resume.specialties),
      })
    } catch (err) {
      this.logger.error("Failed to save resume:", err)
      throw err
    }
  }
}
