import { VacancyEntity } from "./entity"
import { VacancySchemaType } from "./dto/schema"
import { AppDataSource } from "shared/db-connection"
import { Logger } from "winston"
import { clearDuplicates } from "shared/utils"

interface VacancyServiceProps {
  logger: Logger
}

export class VacancyService {
  protected logger: Logger
  protected vacancyRepository

  constructor({ logger }: VacancyServiceProps) {
    this.vacancyRepository = AppDataSource.getRepository<VacancyEntity>(VacancyEntity)
    this.logger = logger
  }

  async getVacancyCount() {
    return await this.vacancyRepository
      .createQueryBuilder("vacancy")
      .leftJoinAndSelect("vacancy.message", "message")
      .leftJoinAndSelect("message.source", "source")
      .orderBy("message.message_at", "DESC")
      .getCount()
  }

  async getById(id: string) {
    return await this.vacancyRepository.findOne({
      where: { id },
    })
  }

  async getUniqSkills() {
    const rawQuery = `
    SELECT LOWER(skill) AS skill, COUNT(*) AS count
    FROM vacancy, UNNEST(vacancy.skills) AS skill
    GROUP BY LOWER(skill)
    ORDER BY count DESC;
  `
    return await this.vacancyRepository.query(rawQuery)
  }

  async save(vacancy: VacancySchemaType, messageId: string, tgUserId: string | null) {
    try {
      return await this.vacancyRepository.save({
        message_id: messageId,
        tg_user_id: tgUserId,
        position: vacancy.position,
        company_name: vacancy.company_name,
        description: vacancy.description,
        experience_months: vacancy.experience_months,
        education: vacancy.education,
        skills: vacancy.skills,
        work_format: vacancy.work_format ? clearDuplicates(vacancy.work_format) : null,
        work_time: vacancy.work_time ? clearDuplicates(vacancy.work_time) : null,
        experience_level: vacancy.experience_level,
        salary: vacancy.salary,
        languages: vacancy.languages,
        contacts: vacancy.contacts,
        location: vacancy.location,
        specialties: clearDuplicates(vacancy.specialties),
      })
    } catch (err) {
      this.logger.error("Failed to save vacancy:", err)
      throw err
    }
  }
}
