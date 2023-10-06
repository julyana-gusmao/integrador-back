import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { DeleteCommentSchema } from "../../../src/dtos/Comments/deleteComment.dto"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { ZodError } from "zod"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"

describe("Testando delete comment", () => {
  const comentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new PostDatabaseMock()
  )

  test("deve deletar um comentário", async () => {
    const input = DeleteCommentSchema.parse({
      idToDelete: "comment01",
      postId: "post01",
      token: "token-mock-fulano"
    })

    const output = await comentBusiness.deleteComment(input)

    expect(output).toEqual({ message: "Comentário deletado com sucesso" })
  })


  test("deve disparar erro na ausência de idToDelete", async () => {
    try {
      const input = DeleteCommentSchema.parse({
        idToDelete: "",
        postId: "post01",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("idToDelete: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de token", async () => {
    try {
      const input = DeleteCommentSchema.parse({
        idToDelete: "comment01",
        postId: "post01",
        token: ""
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de postId", async () => {
    try {
      const input = DeleteCommentSchema.parse({
        idToDelete: "comment01",
        postId: "",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("postId: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência do input idToDelete", async () => {
    try {
      const input = DeleteCommentSchema.parse({
        postId: "post01",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("idToDelete: Required")
    }
  }
  })

  test("deve disparar erro na ausência do input postId", async () => {
    try {
      const input = DeleteCommentSchema.parse({
        idToDelete: "comment01",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("postId: Required")
    }
  }
  })

  test("deve disparar erro na ausência do input token", async () => {
    try {
      const input = DeleteCommentSchema.parse({
        idToDelete: "comment01",
        postId: "post01"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: Required")
    }
  }
  })

})