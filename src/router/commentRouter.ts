import express from "express"
import { CommentBusiness } from "../business/CommentBusiness"
import { CommentController } from "../controller/CommentController"
import { CommentDatabase } from "../database/CommentDataBase"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostDatabase } from "../database/PostDataBase"

export const commentRouter = express.Router()

const commentController = new CommentController(
    new CommentBusiness(
        new CommentDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new PostDatabase()
    )
)

commentRouter.get("/", commentController.getComments)
commentRouter.post("/", commentController.createComment)
commentRouter.put("/:id", commentController.editCommentByid)
commentRouter.put("/:id/like", commentController.likeOrDislikeComment)
commentRouter.delete("/:id", commentController.deleteCommentById)
