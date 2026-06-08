import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const sourcePath = resolve(process.cwd(), 'instrument.server.mjs')
const targetDir = resolve(process.cwd(), '.output/server')
const targetPath = resolve(targetDir, 'instrument.server.mjs')

if (!existsSync(sourcePath)) {
  throw new Error(`Missing source file: ${sourcePath}`)
}

mkdirSync(targetDir, { recursive: true })
cpSync(sourcePath, targetPath)

