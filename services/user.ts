import prisma from '@/lib/prisma';
import { UserSignupData } from '@/types/user'

export async function create(userData: UserSignupData) {
  try {
    const user = await prisma.user.create({
      data: userData,
    });
  
    return user;
  } catch(error) {
    throw new Error('An error occurred while creating your account.');
  }
}

export async function findUnique(email: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch(error) {
    throw new Error('An error occurred while finding the user.');
  }
}