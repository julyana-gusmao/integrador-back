import z from 'zod'
import { USER_ROLES } from '../../models/User';

export interface ChangeUserRoleInputDTO {
    id: string,
    role: USER_ROLES,
    token: string
}

export interface ChangeUserRoleOutputDTO {
    id: string,
    username: string,
    role: USER_ROLES
}

export const ChangeUserRoleSchema = z.object({
    id: z.string().min(1),
    role: z.string().min(5),
    token: z.string().min(1)
}).transform(data => data as ChangeUserRoleInputDTO)