import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { ZodError } from "zod"
import { IdGeneratorMock } from "../../../tests/mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../../tests/mocks/TokenManagerMock"
import { CommentDatabaseMock } from "../../../tests/mocks/CommentDatabaseMock"
import { LikeOrDislikeCommentSchema } from "../../../src/dtos/Comments/likeOrDislike.dto"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"

describe("Testando likeOrDislikeComment", () => {
  const comentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new PostDatabaseMock()
  )

  test("deve fazer uma busca pelo array de comentários e dar um like no comentário", async () => {
    const input = LikeOrDislikeCommentSchema.parse({
      commentId: "comment01",
      like: true,
      token: "token-mock-astrodev"
    })

    const output = await comentBusiness.likeOrDislikeComment(input)

    expect(output).toEqual({ "dislikes": 0, "likes": 1 })
  })


  test("deve fazer uma busca pelo array de comentários e dar um dislike no comentário", async () => {
    const input = LikeOrDislikeCommentSchema.parse({
      commentId: "comment01",
      like: false,
      token: "token-mock-astrodev"
    })

    const output = await comentBusiness.likeOrDislikeComment(input)

    expect(output).toEqual({ "dislikes": 1, "likes": 0 })
  })

  test("deve disparar erro na ausência de commentId", async () => {
    try {
      const input = LikeOrDislikeCommentSchema.parse({
        commentId: "",
        like: true,
        token: "token-mock-astrodev"
      })
    } catch (error) {
      if (error instanceof ZodError) {
        expect("commentId: String must contain at least 1 character(s)")
      }
    }
  })

  test("deve disparar erro quando like não for boolean", async () => {
    try {
      const input = LikeOrDislikeCommentSchema.parse({
        commentId: "comment01",
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
      const input = LikeOrDislikeCommentSchema.parse({
        commentId: "comment01",
        like: true,
        token: ""
      })
    } catch (error) {
      if (error instanceof ZodError) {
        expect("token: String must contain at least 1 character(s)")
      }
    }
  })

  test("deve disparar erro na ausência do input commentId", async () => {
    try {
      const input = LikeOrDislikeCommentSchema.parse({
        like: true,
        token: "token-mock-astrodev"
      })
    } catch (error) {
      if (error instanceof ZodError) {
        expect("commentId: Required")
      }
    }
  })

  test("deve disparar erro na ausência do input like", async () => {
    try {
      const input = LikeOrDislikeCommentSchema.parse({
        commentId: "comment01",
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
      const input = LikeOrDislikeCommentSchema.parse({
        commentId:"comment01",
        like: true
      })
    } catch (error) {
      if (error instanceof ZodError) {
        expect("token: Required")
      }
    }
  })

})
