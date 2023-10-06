import z from 'zod'

export interface EditCommentInputDTO {
    idToEdit: string,
    content: string,
    token: string
}

export interface EditCommentOutputDTO {
    content: string
}
export const EditCommentSchema = z.object({
    idToEdit: z.string().min(1),
    content: z.string().min(1).optional(),
    token: z.string().min(1)
}).transform(data => data as EditCommentInputDTO)