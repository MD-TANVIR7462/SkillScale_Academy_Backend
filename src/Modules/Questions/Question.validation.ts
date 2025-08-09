import { z } from "zod";

export const optionSchema = z.object({
  serial: z.string().min(1, "serial is required"),
  text: z.string().min(1, "option text is required"),
  isCorrect: z.boolean(),
});

export const questionSchema = z.object({
  question: z.string().min(1, "question text is required"),
  options: z
    .array(optionSchema)
    .min(2, "at least two options are required")
    .refine(
      (opts) => {
        const seen = new Set<string>();
        for (const o of opts) {
          if (seen.has(o.serial)) return false;
          seen.add(o.serial);
        }
        return true;
      },
      { message: "option serials must be unique" }
    ),
  correctAnswer: z.string().min(1, "correctAnswer is required"),

  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  timeAllowed: z.number().int().positive().optional(),
});
