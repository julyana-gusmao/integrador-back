import z from "zod"
import { CommentModel } from "../../models/Comment"

export interface GetCommentsInputDTO {
  content?: string,
  token: string 
}

export interface GetCommentByIdInputDTO {
  id: string,
  token: string 
}

export type GetCommentsOutputDTO = CommentModel[] | CommentModel

export const GetCommentsSchema = z.object({
  content: z.string().min(1).optional(),
  token: z.string().min(1)
}).transform(data => data as GetCommentsInputDTO)


