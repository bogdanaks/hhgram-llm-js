import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod"
import { Logger } from "winston"
import config from "config"
import { ResumeOrVacancySchema, ResumeOrVacancySchemaType } from "./schema"
import { MessageEntity } from "modules/message"
import { ResumeSchema, ResumeParseSchemaType, ResumeParseSchema } from "modules/resume/dto/schema"
import {
  VacancyParseSchema,
  VacancyParseSchemaType,
  VacancySchema,
} from "modules/vacancy/dto/schema"

interface Props {
  openai: OpenAI
  logger: Logger
}

export class LLMService {
  private openai
  private logger

  constructor(opts: Props) {
    this.openai = opts.openai
    this.logger = opts.logger
  }

  async parse(
    message: MessageEntity
  ): Promise<
    | { parsed: ResumeParseSchemaType; type: "resume" }
    | { parsed: VacancyParseSchemaType; type: "vacancy" }
    | { parsed: ResumeOrVacancySchemaType; type: "resume_or_vacancy" }
    | undefined
  > {
    try {
      const parseSchema = !message?.pre_type
        ? ResumeOrVacancySchema
        : message.pre_type === "resume"
        ? ResumeParseSchema
        : VacancyParseSchema

      const completion = await this.openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: config.llm.systemPrompt,
          },
          { role: "user", content: message.text ?? "" },
        ],
        response_format: zodResponseFormat(parseSchema, "resume_or_vacancy"),
      })

      if (!completion || !completion.choices || completion.choices.length === 0) {
        throw new Error("Invalid response format: Missing choices")
      }

      const parsedMessage = completion.choices[0]?.message?.parsed
      if (!parsedMessage) {
        throw new Error("Parsed message is undefined")
      }

      if (completion.usage) {
        const { prompt_tokens, completion_tokens, total_tokens } = completion.usage
        this.logger.debug(
          `[${message.id}] Tokens used: prompt=${prompt_tokens}, completion=${completion_tokens}, total=${total_tokens}`
        )
      }

      // @ts-expect-error
      return {
        parsed: parsedMessage,
        type: !message?.pre_type ? "resume_or_vacancy" : message.pre_type,
      }
    } catch (err) {
      // TODO нужно обработать ошибку Failed to parse: 403 {"message":"","code":"NOT_ENOUGH_TOKENS"}
      // и останавливать парсинг в случае этой ошибки
      // отправлять логи в тг
      this.logger.error("Failed to parse:", err)
      console.log("err", err)
    }
  }
}
