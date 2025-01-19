import { AppDataSource } from "shared/db-connection"
import { MiscParsedEntity } from "./entity"
import { Logger } from "winston"

interface MiscParsedServiceProps {
  logger: Logger
}

export class MiscParsedService {
  protected logger: Logger
  protected miscParsedRepository

  constructor({ logger }: MiscParsedServiceProps) {
    this.miscParsedRepository = AppDataSource.getRepository<MiscParsedEntity>(MiscParsedEntity)
    this.logger = logger
  }

  async save(messageId: string) {
    try {
      return await this.miscParsedRepository.save({
        message_id: messageId,
      })
    } catch (err) {
      this.logger.error("Failed to save misc parsed:", err)
      throw err
    }
  }
}
