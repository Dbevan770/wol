import { z } from 'zod';

export const deviceSchema = z.object({
  name: z.string().trim().min(1).max(64),
  ip: z.string().trim().ip().optional(),
  mac: z
    .string()
    .trim()
    .min(1)
    .max(17)
    .regex(/([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})/),
});

export type FormFields = z.infer<typeof deviceSchema>;

export const defaultValues: FormFields = {
  name: '',
  mac: '',
};
