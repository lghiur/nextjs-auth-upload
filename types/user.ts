export type UserLoginData = {
  email: string
  password: string
}

export type UserSignupData = {
  name: string
  password: string
} & UserLoginData

export type User = {
  id: number
} & UserSignupData