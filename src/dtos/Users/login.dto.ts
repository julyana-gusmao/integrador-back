import z from "zod"
import { USER_ROLES } from "../../models/User"

export interface LoginInputDTO {
  email: string,
  password: string
}

export interface LoginOutputDTO {
  id: string,
  username: string,
  email: string,
  role: USER_ROLES,
  token: string
}

export const LoginSchema = z.object({
  email: z.string().min(11).includes("@"),
  password: z.string().min(6)
}).transform(data => data as LoginInputDTO)