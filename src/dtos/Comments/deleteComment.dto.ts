import z from 'zod'

export interface DeleteCommentInputDTO {
    idToDelete: string,
    postId: string,
    token: string
}

export interface DeleteCommentOutputDTO {
    message: string;
}

export const DeleteCommentSchema = z.object({
    idToDelete: z.string().min(1),
    postId: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as DeleteCommentInputDTO)