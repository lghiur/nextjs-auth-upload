import { SignupFormSchema } from "@/schemas/signup-form-schema";
import { LoginFormSchema } from "@/schemas/login-form-schema";
import { UserSignupData, UserLoginData } from "@/types/user";

type ValidateUserReturn<T> = {
  user?: T,
  errors?: {
    name?: string[],
    email?: string[],
    password?: string[],
  }
};

export const validateUserLogin = async (formData: FormData): Promise<ValidateUserReturn<UserLoginData>> => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  return {
    user: validatedFields.data
  };
};

export async function validateUserCreation(formData: FormData): Promise<ValidateUserReturn<UserSignupData>> {
  const validatedFields = await SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  return {
    user: validatedFields.data
  };
}