import { PostDB, PostDBWithCreator } from "../../src/models/Post";
import { POST_LIKE } from '../../src/models/LikePost'
import { LikeOrDislikeDB } from "../../src/models/LikePost";
import { BaseDatabase } from "../../src/database/BaseDataBase";

const postsMock: PostDB[] = [
  { 
    id: "post01",
    creator_id: "id-mock-fulano",
    content: "Primeiro post",
    likes: 0,
    dislikes: 0, 
    comments: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "post02",
    creator_id: "id-mock-astrodev",
    content: "Segundo post",
    likes: 0,
    dislikes: 0, 
    comments: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
]


const postsWithCreatorMock: PostDBWithCreator[] = [
  {
    id: "post01",
    creator_id: "id-mock-fulano",
    content: "Primeiro post",
    likes: 0,
    dislikes: 0, 
    comments: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    creator_username: "Fulano"
  },
  {
    id: "post02",
    creator_id: "id-mock-astrodev",
    content: "Segundo post",
    likes: 0,
    dislikes: 0, 
    comments: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    creator_username: "Astrodev"
  },
]

const likesMock: LikeOrDislikeDB[] = []

export class PostDatabaseMock extends BaseDatabase {

  public static TABLE_POSTS = "posts"

  public async insertPost(
    newPostDB: PostDB
  ): Promise<void> {
    postsMock.push(newPostDB)
  }

  public async findPosts(
    content: string | undefined
  ): Promise<PostDBWithCreator[]> {
    if (content) {
      return postsWithCreatorMock.filter(post =>
        post.content.toLocaleLowerCase()
          .includes(content.toLocaleLowerCase()))

    } else {
      return postsWithCreatorMock
    }
  }

  public async findPostById(
    id: string
  ): Promise<PostDBWithCreator> {
    return postsWithCreatorMock.filter(post => post.id === id)[0]
  }

  public findPostCreatorById = async (
    id: string
  ): Promise<PostDBWithCreator> => {
    return postsWithCreatorMock.filter(post => post.creator_id === id)[0]
  }


  public async deletePost(
    idToDelete: string
  ): Promise<void> { }

  public updatePostById = async (
    idToEdit: string, postDB: PostDB
  ): Promise<void> => { }

  public deletePostById = async (
    idToDelete: string
  ): Promise<void> => { }

  public likeOrDislikePost = async (
    id: string
  ): Promise<PostDB | undefined> => {
    const [result] = postsWithCreatorMock.filter(comment => comment.creator_id === id)

    return result
  }

  public findLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<POST_LIKE | undefined> => {

    const [result] = likesMock.filter(like => like.user_id === likeOrDislikeDB.user_id && like.post_id === likeOrDislikeDB.post_id)

    if (result === undefined) {
      return undefined
    } else if (result.like === 1) {
      return POST_LIKE.ALREADY_LIKED
    } else {
      return POST_LIKE.ALREADY_DISLIKED
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
