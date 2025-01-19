import { Logger } from "winston"
import cron from "node-cron"

interface Props {
  logger: Logger
}

export class CronManager {
  private logger: Logger

  constructor({ logger }: Props) {
    this.logger = logger
  }

  runTask(callback: () => Promise<void>) {
    try {
      this.logger.info("Run cron task")
      const task = cron.schedule("*/5 * * * *", async () => {
        await callback()
      })
      task.start()
    } catch (err) {
      this.logger.error("Failed to run task:", err)
    }
  }
}
