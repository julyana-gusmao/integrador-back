import z from "zod"
import { USER_ROLES } from "../../models/User"

export interface SignupInputDTO {
  id: string,
  username: string,
  email: string,
  password: string, 
  role: USER_ROLES
}

export interface SignupOutputDTO {
  id: string,
  username: string,
  email: string,
  role: USER_ROLES,
  token: string
}

export const SignupSchema = z.object({
  username: z.string().min(2),
  email: z.string().min(11).includes("@"),
  password: z.string().min(6),
}).transform(data => data as SignupInputDTO)