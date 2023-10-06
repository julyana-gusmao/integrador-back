import { ZodError } from "zod"
import { UserBusiness } from '../../../src/business/UserBusiness'
import { EditUserSchema } from "../../../src/dtos/Users/editUser.dto"
import { HashManagerMock } from "../../../tests/mocks/HashManagerMock"
import { IdGeneratorMock } from "../../../tests/mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../../tests/mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../../tests/mocks/UserDatabaseMock"

describe("Testando editUser", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new TokenManagerMock(),    
    new IdGeneratorMock(),
    new HashManagerMock()
  )

  test("deve editar dados do usuário pelo ID", async () => {
    const input = EditUserSchema.parse({
      idToEdit: "id-mock-astrodev",
      password: "astrodev98",
      token: "token-mock-astrodev"
    })

    const output = await userBusiness.editUserById(input)

    expect(output).toEqual({
      message: "Usuário editado com sucesso"
    })
  })

  test("deve disparar erro na ausência de idToEdit", async () => {
    try {
      const input = EditUserSchema.parse({
        idToEdit: "",
        username: "Fulane",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("idToEdit: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de token", async () => {
    try {
      const input = EditUserSchema.parse({
        idToEdit: "id-mock-fulano",
        username: "Fulane",
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
      const input = EditUserSchema.parse({
        username: "Fulane",
        token: "token-mock-fulano"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("idToEdit: Required")
    }
  }
  })

  
  test("deve disparar erro na ausência do input token", async () => {
    try {
      const input = EditUserSchema.parse({
        idToEdit: "id-mock-fulano",
        username: "Fulane"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: Required")
    }
  }
  })

})