import { Logger } from "winston"
import { MessageService } from "./service"

interface MessageHandlerProps {
  logger: Logger
  messageService: MessageService
}

export class MessageController {
  private logger: Logger
  private messageService: MessageService

  constructor({ logger, messageService }: MessageHandlerProps) {
    this.logger = logger
    this.messageService = messageService
  }

  async test() {
    //
  }
}
