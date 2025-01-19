import { createContainer, asClass, asValue } from "awilix"
import { AppDataSource } from "shared/db-connection"
import { MessageController, MessageService } from "modules/message"
import logger from "shared/logger"
import { Logger } from "winston"
import { DataSource } from "typeorm"
import { LLMController } from "modules/llm/contoller"
import { LLMService } from "modules/llm/service"
import { openai } from "./openai-client"
import OpenAI from "openai"
import { ResumeService } from "modules/resume"
import { VacancyService } from "modules/vacancy"
import { MiscParsedService } from "modules/misc-parsed"
import { CronManager } from "./cron-manager"

interface AppDependencies {
  openai: OpenAI
  logger: Logger
  db: DataSource
  cronManager: CronManager
  llmController: LLMController
  llmService: LLMService
  messageController: MessageController
  messageService: MessageService
  resumeService: ResumeService
  vacancyService: VacancyService
  miscParsedService: MiscParsedService
}

export const diContainer = createContainer<AppDependencies>()

diContainer.register({
  openai: asValue(openai),
  logger: asValue(logger),
  db: asValue(AppDataSource),
  cronManager: asClass(CronManager).singleton(),
  llmController: asClass(LLMController).singleton(),
  llmService: asClass(LLMService).singleton(),
  messageController: asClass(MessageController).singleton(),
  messageService: asClass(MessageService).singleton(),
  resumeService: asClass(ResumeService).singleton(),
  vacancyService: asClass(VacancyService).singleton(),
  miscParsedService: asClass(MiscParsedService).singleton(),
})
