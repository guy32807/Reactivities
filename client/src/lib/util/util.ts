import { format, type DateArg } from "date-fns";
import z from "zod";

export function formatDate(date: DateArg<Date>){
    return format(date, 'MMM/dd/yyyy h:mm a');
}

export const requiredString = (fieldName: string) =>
  z
    .string()
    .nonempty({ message: `${fieldName} is required` })
    .min(3, { message: `${fieldName} must be at least 3 character long` });