import { MessageController, MessageService } from "modules/message"
import { Logger } from "winston"
import { LLMService } from "./service"
import { ResumeService } from "modules/resume"
import { VacancyService } from "modules/vacancy"
import { MiscParsedService } from "modules/misc-parsed"
import { chunkArray, sleep } from "shared/utils"
import pLimit from "p-limit"

interface Props {
  logger: Logger
  messageService: MessageService
  llmService: LLMService
  resumeService: ResumeService
  vacancyService: VacancyService
  miscParsedService: MiscParsedService
}

export class LLMController {
  private logger: Logger
  private messageService: MessageService
  private resumeService: ResumeService
  private vacancyService: VacancyService
  private miscParsedService: MiscParsedService
  private llmService: LLMService

  constructor({
    logger,
    messageService,
    llmService,
    resumeService,
    vacancyService,
    miscParsedService,
  }: Props) {
    this.logger = logger
    this.messageService = messageService
    this.llmService = llmService
    this.resumeService = resumeService
    this.vacancyService = vacancyService
    this.miscParsedService = miscParsedService
  }

  async startParsing() {
    try {
      this.logger.info("Start parsing messages")
      const messages = await this.messageService.getMessagesForParsing(5000)
      this.logger.info(`Need parsing ${messages.length} messages`)

      if (!messages.length) {
        this.logger.info("No messages for parsing")
        return
      }

      const chunkSize = 100
      const chunkMessages = chunkArray(messages, chunkSize)
      const limit = pLimit(chunkSize)

      for (const batch of chunkMessages) {
        this.logger.info(`Processing batch of ${batch.length} messages`)
        await Promise.all(
          batch.map((message) =>
            limit(async () => {
              try {
                if (!message.text?.length) return

                this.logger.debug(
                  `[${message.id}] Try parsing message with pre type ${message.pre_type}`
                )
                const parseResult = await this.llmService.parse(message)
                if (!parseResult) {
                  await this.miscParsedService.save(message.id)
                  this.logger.warn(`[${message.id}] Parse undefined saved as misc`)
                  return
                }
                const { parsed, type } = parseResult

                if (type === "resume" && parsed.resume && parsed.is_message_resume) {
                  await this.resumeService.save(parsed.resume, message.id, message.from_id)
                  this.logger.debug(`[${message.id}] Resume saved`)
                  return
                }

                if (type === "vacancy" && parsed.vacancy && parsed.is_message_vacancy) {
                  await this.vacancyService.save(parsed.vacancy, message.id, message.from_id)
                  this.logger.debug(`[${message.id}] Vacancy saved`)
                  return
                }

                await this.miscParsedService.save(message.id)
                this.logger.warn(`[${message.id}] Misc parsed saved`)
              } catch (err) {
                this.logger.error(`[${message.id}] Failed to parse message:`, err)
              }
            })
          )
        )

        this.logger.info("Waiting for 1 minute before processing the next batch...")
        await sleep(60000)
      }

      this.logger.info(`Parsing ${messages.length} messages done`)
    } catch (err) {
      this.logger.error("Failed to start parsing:", err)
    }
  }
}
