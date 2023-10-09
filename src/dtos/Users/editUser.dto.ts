import z from 'zod'
import { UserModel } from '../../models/User'

export interface EditUserInputDTO {
    idToEdit: string,
    username?: string | undefined,
    email?: string | undefined,
    password?: string | undefined,
    token: string
}

export type EditUsertOutputDTO = UserModel[] | UserModel

export const EditUserSchema = z.object({
    idToEdit: z.string().min(1),
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    token: z.string().min(1)
}).transform(data => data as EditUserInputDTO)