import { AppDataSource } from "shared/db-connection"
import { diContainer } from "shared/di-container"

async function startApp() {
  const logger = diContainer.resolve("logger")
  try {
    const llmController = diContainer.resolve("llmController")
    const cronManager = diContainer.resolve("cronManager")

    await AppDataSource.initialize()
    logger.info("Database connected")

    logger.info("App started")
    cronManager.runTask(async () => {
      await llmController.startParsing()
    })
  } catch (err) {
    logger.error("Failed to start app:", err)
    process.exit(1)
  }
}

startApp()
