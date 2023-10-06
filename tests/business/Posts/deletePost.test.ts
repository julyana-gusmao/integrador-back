import { ZodError } from 'zod'
import { PostBusiness } from '../../../src/business/PostBusiness'
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"
import { DeletePostSchema } from '../../../src/dtos/Posts/deletePost.dto'

describe("Testando deletePost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve deletar um comentário", async () => {
    const input = DeletePostSchema.parse({
      idToDelete: "post01",
      token: "token-mock-fulano"
    })

    const output = await postBusiness.deletePost(input)

    expect(output).toEqual({ message: "Postagem deletada com sucesso" })
  })

  test("deve disparar erro na ausência de idToDelete", async () => {
    try {
      const input = DeletePostSchema.parse({
        idToDelete: "",
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
      const input = DeletePostSchema.parse({
        idToDelete: "post01",
        token: ""
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência do input", async () => {
    try {
      const input = DeletePostSchema.parse({
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("idToDelete: Required")
    }
  }
  })

  test("deve disparar erro na ausência do input token", async () => {
    try {
      const input = DeletePostSchema.parse({
        idToDelete: "post01",
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: Required")
    }
  }
  })

})