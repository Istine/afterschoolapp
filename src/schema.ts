import z from "zod";
import { EMAIL_REGEX } from "./constants";

export const loginFormSchema = z.object({
  email: z
    .string()
    .regex(EMAIL_REGEX, {
      message: "must be a valid email address",
    })
    .trim(),
  password: z.string().min(4, {
    message: "password cannot be less than 4 characters",
  }),
});

export const createInstructorFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "first name cannot be less than 2 characters",
    })
    .trim(),
  lastName: z
    .string()
    .min(2, {
      message: "last name cannot be less than 2 characters",
    })
    .trim(),

  specialization: z
    .string()
    .min(5, {
      message: "specialization cannot be less than 5 characters",
    })
    .trim(),
  email: z
    .string()
    .regex(EMAIL_REGEX, {
      message: "must be a valid email address",
    })
    .trim(),
  bio: z
    .string()
    .min(30, {
      message: "bio cannot be less than 30 characters",
    })
    .trim(),
});
