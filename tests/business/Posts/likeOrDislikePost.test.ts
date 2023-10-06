import { ZodError } from 'zod'
import { PostBusiness } from '../../../src/business/PostBusiness'
import { IdGeneratorMock } from "../../../tests/mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../../tests/mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../../tests/mocks/PostDataBaseMock"
import { LikeOrDislikePostSchema } from '../../..//src/dtos/Posts/likeOrDislike.dto'

describe("Testando likeOrDislikePost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve fazer uma busca pelo array de postagens e dar um like no post", async () => {
    const input = LikeOrDislikePostSchema.parse({
      postId: "post01",
      like: true,
      token: "token-mock-astrodev"
    })

    const output = await postBusiness.likeOrDislikePost(input)

    expect(output).toEqual({ "dislikes": 0, "likes": 1 })
  })

  test("deve fazer uma busca pelo array de comentários e dar um dislike no post", async () => {
    const input = LikeOrDislikePostSchema.parse({
      postId: "post01",
      like: false,
      token: "token-mock-astrodev"
    })

    const output = await postBusiness.likeOrDislikePost(input)

    expect(output).toEqual({ "dislikes": 1, "likes": 0 })
  })


  test("deve disparar erro na ausência de postId", async () => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        postId: "",
        like: true,
        token: "token-mock-astrodev"
      })
    } catch (error) {
      if (error instanceof ZodError) {
        expect("postId: String must contain at least 1 character(s)")
      }
    }
  })

  test("deve disparar erro quando like não for boolean", async () => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        postId: "post01",
        like: "true",
        token: "token-mock-astrodev"
      })
    } catch (error) {
      if (error instanceof ZodError) {
        expect("like: Expected boolean, received string")
      }
    }
  })

  test("deve disparar erro na ausência de token", async () => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        postId: "post01",
        like: true,
        token: ""
      })
    } catch (error) {
      if (error instanceof ZodError) {
        expect("token: String must contain at least 1 character(s)")
      }
    }
  })

  
  test("deve disparar erro na ausência do input postId", async () => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        like: true,
        token: "token-mock-astrodev"
      })
    } catch (error) {
      if (error instanceof ZodError) {
        expect("postID: Required")
      }
    }
  })

  test("deve disparar erro na ausência do input like", async () => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        postId: "post01",
        token: "token-mock-astrodev"
      })
    } catch (error) {
      if (error instanceof ZodError) {
        expect("like: Required")
      }
    }
  })

  test("deve disparar erro na ausência do input token", async () => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        postId: "post01",
        like: true
      })
    } catch (error) {
      if (error instanceof ZodError) {
        expect("token: Required")
      }
    }
  })

})
