import { ZodError } from 'zod'
import { PostBusiness } from '../../../src/business/PostBusiness'
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"
import { EditPostSchema } from '../../../src/dtos/Posts/editPost.dto'

describe("Testando editPost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )
  
  test("deve editar o conteúdo da postagem de acordo com o ID", async () => {
    const input = EditPostSchema.parse({
      idToEdit: "post01",
      content: "Primeiro comentário editado",
      token: "token-mock-fulano"
    })

    const output = await postBusiness.editPost(input)

    expect(output).toEqual({
      content: "Primeiro comentário editado"
    })
  })

  test("deve disparar erro na ausência de idToEdit", async () => {
    try {
      const input = EditPostSchema.parse({
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
      const input = EditPostSchema.parse({
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
      const input = EditPostSchema.parse({
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

  test("deve disparar erro na ausência do input idToEdit", async () => {
    try {
      const input = EditPostSchema.parse({
        content: "Fulano comentário editado",
        token: "token-mock-fulano"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("idToEdit: Required")
    }
  }
  })

  test("deve disparar erro na ausência do input content", async () => {
    try {
      const input = EditPostSchema.parse({
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
      const input = EditPostSchema.parse({
        idToEdit: "comment01",
        content: "Fulano comentário editado",
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: Required")
    }
  }
  })


})