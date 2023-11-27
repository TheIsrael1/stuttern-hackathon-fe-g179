import { z } from 'zod';

export const dbConnectionSchema = z.object({
  database_type: z.string(),
  //   username: z.string(),
  //   password: z.string(),
  //   host: z.string(),
  //   port: z.string(),
  uri: z.string(),
  database_name: z.string().optional()
});

export type dbConnectionSchemaInterface = z.infer<typeof dbConnectionSchema>;
