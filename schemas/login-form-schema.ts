import { z } from 'zod'
 
export const LoginFormSchema = z.object({
  email: z.string({
    required_error: 'Please enter your email.',
  }).email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string({
      required_error: 'Please enter your password.',
    })
    .trim(),
})
 
export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined;
  