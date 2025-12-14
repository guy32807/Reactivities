import { z } from "zod";

const requiredString = (fieldName: string) =>
  z
    .string()
    .nonempty({ message: `${fieldName} is required` })
    .min(3, { message: `${fieldName} must be at least 3 character long` });

export const activitySchema = z.object({
  id: z.string().optional(),
  title: requiredString("Title").max(100, {
    message: "Title must be at most 100 characters long",
  }),
  description: requiredString("Description").max(1000, {
    message: "Description must be at most 1000 characters long",
  }),
  category: requiredString("Category").max(50, {
    message: "Category must be at most 50 characters long",
  }),
  date: z.date().refine((date) => date > new Date(), {
    message: "Date must be in the future",
  }),
  location: z.object({
    venue: requiredString("Venue"),
    city: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
