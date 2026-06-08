import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import { envServer } from '#/lib/env.server'

const redisUrl = envServer.REDIS_URL

function createConnection() {
  if (!redisUrl) {
    return null
  }

  return new IORedis(redisUrl, { maxRetriesPerRequest: null })
}

const connection = createConnection()

export const appQueue = connection
  ? new Queue('questura-jobs', {
      connection,
    })
  : null

type WorkerProcessor = ConstructorParameters<typeof Worker>[1]

export function createAppWorker(processor: WorkerProcessor, concurrency = 5) {
  if (!connection) {
    return null
  }

  return new Worker('questura-jobs', processor, { connection, concurrency })
}
