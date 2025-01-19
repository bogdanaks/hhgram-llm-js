import { FindManyOptions, FindOptionsWhere } from "typeorm"
import { MessageEntity } from "./entity"
import { CreateMessage } from "./types"
import { AppDataSource } from "shared/db-connection"

interface MessageServiceProps {}

export class MessageService {
  protected messageRepository

  constructor({}: MessageServiceProps) {
    this.messageRepository = AppDataSource.getRepository<MessageEntity>(MessageEntity)
  }

  async findBy(options?: FindManyOptions<MessageEntity>) {
    return await this.messageRepository.find(options)
  }

  async findOne(where: FindOptionsWhere<MessageEntity>) {
    return await this.messageRepository.findOne({ where })
  }

  async getLastMessage(sourceId: string) {
    return await this.messageRepository.findOne({
      where: { source_id: sourceId },
      order: { message_at: "DESC" },
    })
  }

  async save(source: CreateMessage): Promise<MessageEntity> {
    return await this.messageRepository.save(source)
  }

  async update({ id, ...rest }: { id: string } & Partial<MessageEntity>) {
    return await this.messageRepository.update(id, rest)
  }

  async delete(id: string) {
    return await this.messageRepository.delete(id)
  }

  async getMessagesForParsing(limit: number = 100): Promise<MessageEntity[]> {
    return await this.messageRepository
      .createQueryBuilder("message")
      .select("*")
      .where("message.id NOT IN (SELECT message_id FROM resume)")
      .andWhere("message.id NOT IN (SELECT message_id FROM vacancy)")
      .andWhere("message.id NOT IN (SELECT message_id FROM misc_parsed)")
      .andWhere("message.duplicate_id IS NULL")
      .orderBy("message.message_at", "ASC")
      .take(limit)
      .getRawMany()
  }
}
