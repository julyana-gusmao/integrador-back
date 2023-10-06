import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { ZodError } from "zod"
import { CreateCommentSchema } from "../../../src/dtos/Comments/createComment.dto"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"

describe("Testando create comment", () => {
  const comentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new PostDatabaseMock()
  )

  test("deve criar um comentário novo", async () => {
    const input = CreateCommentSchema.parse({
      content: "Novo comentário",
      postId: "post01",
      token: "token-mock-astrodev"
    })

    const output = await comentBusiness.createComment(input)

    expect(output).toEqual({
      id: "id-mock",
      postId: "post01",
      content: "Novo comentário",
      likes: 0,
      dislikes: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      creator: {
          id: "id-mock-astrodev",
          username: "Astrodev"
      }
    })
  })

  test("deve disparar erro na ausência de content", async () => {
    try {
      const input = CreateCommentSchema.parse({
        content: "",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("content: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de token", async () => {
    try {
      const input = CreateCommentSchema.parse({
        content: "aaaa",
        token: ""
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: String must contain at least 1 character(s)")
    }
  }
  })

  
  test("deve disparar erro na ausência do input content", async () => {
    try {
      const input = CreateCommentSchema.parse({
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("content: Required")
    }
  }
  })

  test("deve disparar erro na ausência do input token", async () => {
    try {
      const input = CreateCommentSchema.parse({
        content: "novo comentário"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: Required")
    }
  }
  })

})