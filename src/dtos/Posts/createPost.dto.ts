import z from "zod"
import { PostModel } from "../../models/Post"

export interface CreatePostInputDTO {
    content: string,
    token: string
}

export type CreatePostOutputDTO = PostModel

export const CreatePostSchema = z.object({
  content: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as CreatePostInputDTO)