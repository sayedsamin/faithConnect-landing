import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const openApiRegistry = new OpenAPIRegistry()

export function createOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(openApiRegistry.definitions)

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'Questura V2 API',
      version: '1.0.0',
    },
  })
}
