import { ZodError } from "zod"
import { UserBusiness } from "../../../src/business/UserBusiness"
import { ChangeUserRoleSchema } from "../../../src/dtos/Users/changeUserRole.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando editUserRole", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new TokenManagerMock(),    
    new IdGeneratorMock(),
    new HashManagerMock()
  )

  test("deve trocar a role de um usuário para ADMIN ou NORMAL", async () => {
    const input = ChangeUserRoleSchema.parse({
      id: "id-mock-fulano",
      role: "ADMIN",
      token: "token-mock-astrodev"
    })

    const output = await userBusiness.editUserRoleById(input)

    expect(output).toEqual({
      id: "id-mock-fulano",
      username: "Fulano",
      role: "ADMIN"
    })
  })

  test("deve disparar erro na ausência de id", async () => {
    try {
      const input = ChangeUserRoleSchema.parse({
        id: "",
        role: "ADMIN",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("id: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro quando a role informada não for igual às presentes em USER_ROLES", async () => {
    try {
      const input = ChangeUserRoleSchema.parse({
        id: "id-mock-fulano",
        role: "MODERATOR",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("role: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de token", async () => {
    try {
      const input = ChangeUserRoleSchema.parse({
        id: "id-mock-fulano",
        role: "ADMIN",
        token: ""
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência do input id", async () => {
    try {
      const input = ChangeUserRoleSchema.parse({
        role: "NORMAL",
        token: "token-mock-fulano"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("id: Required")
    }
  }
  })


  test("deve disparar erro na ausência do input role", async () => {
    try {
      const input = ChangeUserRoleSchema.parse({
        id: "id-mock-fulano",
        token: "token-mock-fulano"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("role: Required")
    }
  }
  })


  test("deve disparar erro na ausência do input token", async () => {
    try {
      const input = ChangeUserRoleSchema.parse({
        id: "id-mock-fulano",
        role: "NORMAL"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: Required")
    }
  }
  })

})