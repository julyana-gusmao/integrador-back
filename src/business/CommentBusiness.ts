import { USER_ROLES } from "../models/User"
import { PostDB, Post } from "../models/Post"
import { PostDatabase } from "../database/PostDataBase"
import { NotFoundError } from "../errors/NotFoundError"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"
import { CommentDatabase } from "../database/CommentDatabase"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { Comment, CommentDB, CommentModel } from "../models/Comment"
import { COMMENT_LIKE, LikeOrDislikeDB } from "../models/LikeComment"
import { GetCommentsInputDTO, GetCommentsOutputDTO } from "../dtos/Comments/getComments.dto"
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../dtos/Comments/createComment.dto"
import { DeleteCommentInputDTO, DeleteCommentOutputDTO } from "../dtos/Comments/deleteComment.dto"
import { LikeOrDislikeCommentInputDTO, LikeOrDislikeCommentOutputDTO } from "../dtos/Comments/likeOrDislike.dto"


export class CommentBusiness {

  constructor(
    private CommentDatabase: CommentDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private PostDatabase: PostDatabase
  ) { }


  public getComments = async (
    input: GetCommentsInputDTO
  ): Promise<GetCommentsOutputDTO> => {

    const { content, token } = input
    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    let CommentsDB = await this.CommentDatabase.findComments(content)

    const Comments = CommentsDB
      .map(CommentWithCreator => {
        const comment = new Comment(
          CommentWithCreator.id,
          CommentWithCreator.post_id,
          CommentWithCreator.content,
          CommentWithCreator.likes,
          CommentWithCreator.dislikes,
          CommentWithCreator.created_at,
          CommentWithCreator.updated_at,
          CommentWithCreator.creator_id,
          CommentWithCreator.creator_username
        )

        return comment.toBusinessModel()
      })

    const output: GetCommentsOutputDTO = Comments
    return output
  }

  public createComment = async (
    input: CreateCommentInputDTO
  ): Promise<CreateCommentOutputDTO> => {

    const { postId, content, token } = input

    const id = this.idGenerator.generate()
    const payload = this.tokenManager.getPayload(token)
    const postDB = await this.PostDatabase.findPostById(postId)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    const newComment = new Comment(
      id,
      postId,
      content,
      0,
      0,
      new Date().toISOString(),
      "",
      payload.id,
      payload.username
    )

    const post = new Post(
      postDB.id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.comments,
      postDB.created_at,
      postDB.updated_at,
      postDB.creator_id,
      postDB.creator_username
    )

    post.addComment()

    const newCommentDB: CommentDB = {
      id: newComment.getId(),
      post_id: newComment.getPostId(),
      creator_id: newComment.getCreatorId(),
      content: newComment.getContent(),
      likes: newComment.getLikes(),
      dislikes: newComment.getDislikes(),
      created_at: newComment.getCreatedAt(),
      updated_at: newComment.getUpdatedAt(),
    }

    const updatedPostDB: PostDB = {
      id: postId,
      creator_id: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes: post.getDislikes(),
      comments: post.getComments(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt(),
    }

    await this.CommentDatabase.insertComment(newCommentDB)
    await this.PostDatabase.updatePostById(postId, updatedPostDB)

    const output: CommentModel = {
      id: newComment.getId(),
      postId: newComment.getPostId(),
      content: newComment.getContent(),
      likes: newComment.getLikes(),
      dislikes: newComment.getDislikes(),
      createdAt: newComment.getCreatedAt(),
      updatedAt: newComment.getUpdatedAt(),
      creator: {
        id: newComment.getCreatorId(),
        username: newComment.getCreatorUsername()
      }
    }

    return output
  }

  public deleteComment = async (
    input: DeleteCommentInputDTO
  ): Promise<DeleteCommentOutputDTO> => {

    const { idToDelete, token } = input

    const commentToDeleteDB = await this.CommentDatabase.findCommentById(idToDelete)
    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    if (!idToDelete) {
      throw new NotFoundError("Por favor, insira um id")
    }

    if (!commentToDeleteDB) {
      throw new NotFoundError("'ID' não encontrado")
    }

    if (payload.role === USER_ROLES.ADMIN) {
      await this.CommentDatabase.deleteCommentById(idToDelete)
    } else if (commentToDeleteDB.creator_id === payload.id) {
      await this.CommentDatabase.deleteCommentById(idToDelete)
    } else {
      throw new UnauthorizedError("Somente o administrador ou dono do tópico podem acessar este recurso.")
    }

    const output = {
      message: "Comentário deletado com sucesso",
    }
    return output
  }

  public likeOrDislikeComment = async (
    input: LikeOrDislikeCommentInputDTO
  ): Promise<LikeOrDislikeCommentOutputDTO> => {

    const { id, like, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    const CommentDBwithCreator = await this.CommentDatabase.findCommentById(id)

    if (!CommentDBwithCreator) {
      throw new NotFoundError("Comentário não encontrado")
    }

    const comment = new Comment(
      CommentDBwithCreator.id,
      CommentDBwithCreator.post_id,
      CommentDBwithCreator.content,
      CommentDBwithCreator.likes,
      CommentDBwithCreator.dislikes,
      CommentDBwithCreator.created_at,
      CommentDBwithCreator.updated_at,
      CommentDBwithCreator.creator_id,
      CommentDBwithCreator.creator_username,
    )

    const likeSQL = like ? 1 : 0

    const likeDislikeDB: LikeOrDislikeDB = {
      user_id: payload.id,
      comment_id: id,
      like: likeSQL
    }

    const likeDislikeExists = await this.CommentDatabase.findLikeOrDislike(likeDislikeDB)

    if (likeDislikeExists === COMMENT_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.CommentDatabase.deleteLikeOrDislike(likeDislikeDB)
        comment.removeLike()
      } else {
        await this.CommentDatabase.updateLikeOrDislike(likeDislikeDB)
        comment.removeLike()
        comment.addDislike()
      }

    } else if (likeDislikeExists === COMMENT_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.CommentDatabase.deleteLikeOrDislike(likeDislikeDB)
        comment.removeDislike()
      } else {
        await this.CommentDatabase.updateLikeOrDislike(likeDislikeDB)
        comment.removeDislike()
        comment.addLike()
      }

    } else {
      await this.CommentDatabase.insertLikeOrDislike(likeDislikeDB)
      like ? comment.addLike() : comment.addDislike()
    }

    const updatedCommentDB = comment.toDBModel()
    await this.CommentDatabase.updateCommentById(updatedCommentDB.id, updatedCommentDB)

    const output: LikeOrDislikeCommentOutputDTO = {
      likes: comment.getLikes(),
      dislikes: comment.getDislikes()
    }

    return output
  }
}
