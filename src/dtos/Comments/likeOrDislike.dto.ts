import z from 'zod'

export interface LikeOrDislikeCommentInputDTO {
    id: string,
    like: boolean,
    token: string
}

export type LikeOrDislikeCommentOutputDTO = {
    likes: number,
    dislikes: number
}

export const LikeOrDislikeCommentSchema = z.object({
    id: z.string().min(1),
    like: z.boolean(),
    token: z.string().min(1)
}).transform(data => data as LikeOrDislikeCommentInputDTO)

