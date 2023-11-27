import { z } from 'zod';

export const dbTypeEnums = z.enum(['mongodb', 'mysql', 'postgresql']);
