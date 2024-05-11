"use server"
import { SignupFormState } from '@/schemas/signup-form-schema';
import { LoginFormState } from '@/schemas/login-form-schema';
import { deleteSession } from '@/services/session';
import { redirect } from "next/navigation";
import { validateUserCreation, validateUserLogin } from '@/services/user-validation';
import { signup as signupService, login as loginService } from '@/services/auth';

export async function signup(state: SignupFormState, formData: FormData) {
  const validatedData = await validateUserCreation(formData);

  if(validatedData?.errors) {
    return {
      errors: validatedData.errors,
    }
  }

  if(!validatedData.user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }

  try {
    await signupService(validatedData.user);
  } catch (error) {
    return {
      message: error,
    }
  }

  redirect('/')
};

export async function login(state: LoginFormState, formData: FormData) {
  const validatedData = await validateUserLogin(formData);

  if(validatedData?.errors) {
    return {
      errors: validatedData.errors,
    }
  }

  if(!validatedData.user) {
    return {
      message: 'An error occurred while logging in.',
    }
  }

  try {
    await loginService(validatedData.user);
  } catch (error) {
    return {
      message: String(error),
    }
  }

  redirect('/');
}

export async function logout() {
  deleteSession()
  redirect('/login')
}
