import bcrypt from 'bcrypt';
import { User, UserLoginData, UserSignupData } from '@/types/user';
import { create, findUnique } from '@/services/user';
import { createSession } from './session';

export async function signup(user: UserSignupData): Promise<User> {
  const userData = {
    ...user,
    password: await bcrypt.hash(user.password, 10),
  }
  let newUser: User;

  try {
    newUser = await create(userData);
  } catch(error) {
    throw new Error(String(error));
  }

  try {
    await createSession(newUser.id);
  } catch(error) {
    throw new Error(String(error));
  }

  return newUser;
}

export async function login(user: UserLoginData): Promise<User> {
  const userData = await findUnique(user.email);

  if(!userData) {
    throw new Error('User not found');
  }

  try {
    const match = await bcrypt.compare(user.password, userData.password);
    if(!match) {
      throw new Error('Invalid password');
    }
  } catch(error) {
    throw new Error(String(error));
  }

  try { 
    await createSession(userData.id);
  } catch(error) {
    throw new Error(String(error));
  }

  return userData;
}

