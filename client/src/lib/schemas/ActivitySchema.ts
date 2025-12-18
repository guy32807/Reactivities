import { z } from "zod";
import { requiredString } from "../util/util";

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
  date: z.date() ,
  location: z.object({
    venue: requiredString("Venue"),
    city: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});

export type ActivitySchema = z.input<typeof activitySchema>;
