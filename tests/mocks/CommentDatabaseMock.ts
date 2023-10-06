import { CommentDB, CommentDBWithCreator, CommentModel } from "../../src/models/Comment";
import { COMMENT_LIKE } from '../../src/models/LikeComment'
import { LikeOrDislikeDB } from "../../src/models/LikeComment";
import { BaseDatabase } from "../../src/database/BaseDataBase";


const commentsMock: CommentDB[] = [
  {
    id: "comment01",
    post_id: "post01",
    creator_id: "id-mock-fulano",
    content: "Primeiro comentário",
    likes: 0,
    dislikes: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "comment02",
    post_id: "post01",
    creator_id: "id-mock-astrodev",
    content: "Segundo comentário",
    likes: 0,
    dislikes: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
]


const commentsWithCreatorMock: CommentDBWithCreator[] = [
  {
    id: "comment01",
    post_id: "post01",
    creator_id: "id-mock-fulano",
    content: "Fulano comentário",
    likes: 0,
    dislikes: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    creator_username: "Fulano"
  },
  {
    id: "comment02",
    post_id: "post01",
    creator_id: "id-mock-astrodev",
    content: "Astrodev comentário",
    likes: 0,
    dislikes: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    creator_username: "Astrodev"
  },
]

const likesMock: LikeOrDislikeDB[] = []

export class CommentDatabaseMock extends BaseDatabase {

  public static TABLE_COMMENTS = "comments"

  public async insertComment(
    newPostDB: CommentDB
  ): Promise<void> {
    commentsMock.push(newPostDB)
  }

  public async findComments(
    q: string | undefined
  ): Promise<CommentDBWithCreator[]> {
    if (q) {
      return commentsWithCreatorMock.filter(comment =>
        comment.content.toLocaleLowerCase()
          .includes(q.toLocaleLowerCase()))

    } else {
      return commentsWithCreatorMock
    }
  }

  public async findCommentById(
    id: string
  ): Promise<CommentDBWithCreator> {
    return commentsWithCreatorMock.filter(comment => comment.id === id)[0]
  }

  public findCommentCreatorById = async (
    id: string
  ): Promise<CommentDBWithCreator> => {
    return commentsWithCreatorMock.filter(comment => comment.creator_id === id)[0]
  }

  public findUserComments = async (
    creatorId: string
  ): Promise<CommentDBWithCreator[]> => {
    return commentsWithCreatorMock.filter(post => post.creator_id === creatorId)
  }

  public updateCommentById = async (
    idToEdit: string, commentDB: CommentDB
  ): Promise<void> => { }

  public deleteCommentById = async (
    idToDelete: string
  ): Promise<void> => { }

  
  public likeOrDislikeComment = async (
    id: string
  ): Promise<CommentDBWithCreator | undefined> => {
    const [result] = commentsWithCreatorMock.filter(comment => comment.creator_id === id)

    return result
  }

  public findLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<COMMENT_LIKE | undefined> => {

    const [result] = likesMock.filter(like => like.user_id === likeOrDislikeDB.user_id && like.comment_id === likeOrDislikeDB.comment_id)

    if (result === undefined) {
      return undefined
    } else if (result.like === 1) {
      return COMMENT_LIKE.ALREADY_LIKED
    } else {
      return COMMENT_LIKE.ALREADY_DISLIKED
    }

  }

  public deleteLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => { }

  public updateLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => { }

  public insertLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => { }

}
