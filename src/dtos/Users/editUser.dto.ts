import z from 'zod'

export interface EditUserInputDTO {
    idToEdit: string,
    username?: string,
    email?: string,
    password?: string,
    token: string
}

export interface EditUsertOutputDTO {
        message: string
}

export const EditUserSchema = z.object({
    idToEdit: z.string().min(1),
    username: z.string().min(2).optional(),
    email: z.string().min(11).optional(),
    password: z.string().min(6).optional(),
    token: z.string().min(1)
}).transform(data => data as EditUserInputDTO)