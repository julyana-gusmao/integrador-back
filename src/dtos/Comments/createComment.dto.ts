import z from "zod"
import { CommentModel } from "../../models/Comment"

export interface CreateCommentInputDTO {
    content: string,
    postId: string,
    token: string
}

export type CreateCommentOutputDTO = CommentModel

export const CreateCommentSchema = z.object({
  content: z.string().min(1),
  postId: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as CreateCommentInputDTO)