import z from "zod"
import { UserModel } from "../../models/User"

export interface GetUsersInputDTO {
  username?: string,
  token: string 
}

export type GetUsersOutputDTO = UserModel[] | UserModel

export const GetUsersSchema = z.object({
  username: z.string().min(1).optional(),
  token: z.string().min(1)
}).transform(data => data as GetUsersInputDTO)