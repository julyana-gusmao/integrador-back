import { ZodError } from "zod"
import { UserBusiness } from "../../../src/business/UserBusiness"
import { DeleteUserSchema } from "../../../src/dtos/Users/deleteUser.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando deleteUser", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new TokenManagerMock(),    
    new IdGeneratorMock(),
    new HashManagerMock()
  )

  test("deve remover um usuário da lista", async () => {
    const input = DeleteUserSchema.parse({
      idToDelete: "id-mock-fulano",
      token: "token-mock-fulano"
    })

    const output = await userBusiness.deleteUserById(input)

    expect(output).toEqual({
      message: "Usuário deletado com sucesso"
    })
  })

  test("deve disparar erro na ausência do idToDelete", async () => {
    try {
      const input = DeleteUserSchema.parse({
      idToDelete: "",
      token: "token-mock-fulano"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("idToDelete: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência do token", async () => {
    try {
      const input = DeleteUserSchema.parse({
      idToDelete: "id-mock-fulano",
      token: ""
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência do input idToDelete", async () => {
    try {
      const input = DeleteUserSchema.parse({
      token: "token-mock-fulano"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("idToDelete: Required")
    }
  }
  })

  test("deve disparar erro na ausência do input token", async () => {
    try {
      const input = DeleteUserSchema.parse({
      idToDelete: "id-mokc-fulano"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: Required")
    }
  }
  })

})