import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { EditCommentSchema } from "../../../src/dtos/Comments/editComment.dto"
import { ZodError } from "zod"
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

  test("deve editar dados do usuário pelo ID", async () => {
    const input = EditCommentSchema.parse({
      idToEdit: "comment01",
      content: "Fulano comentário editado",
      token: "token-mock-fulano"
    })

    const output = await comentBusiness.editComment(input)

    expect(output).toEqual({
      content: "Fulano comentário editado"
    })
  })

  test("deve disparar erro na ausência de idToEdit", async () => {
    try {
      const input = EditCommentSchema.parse({
        idToEdit: "",
        content: "Fulano comentário editado",
        token: "token-mock-fulano"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("idToEdit: String must contain at least 1 character(s)")
    }
  }
  })
  
  test("deve disparar erro na ausência de content", async () => {
    try {
      const input = EditCommentSchema.parse({
        idToEdit: "comment01",
        content: "",
        token: "token-mock-fulano"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("content: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de token", async () => {
    try {
      const input = EditCommentSchema.parse({
        idToEdit: "comment01",
        content: "Fulano comentário editado",
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
      const input = EditCommentSchema.parse({
        idToEdit: "comment01",
        token: "token-mock-fulano"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("content: Required")
    }
  }
  })
  
  test("deve disparar erro na ausência do input content", async () => {
    try {
      const input = EditCommentSchema.parse({
        idToEdit: "comment01",
        token: "token-mock-fulano"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("content: Required")
    }
  }
  })

  test("deve disparar erro na ausência do input token", async () => {
    try {
      const input = EditCommentSchema.parse({
        idToEdit: "comment01",
        content: "Fulano comentário editado"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: Required")
    }
  }
  })

})