import { ZodError } from "zod"
import { UserBusiness } from "../../../src/business/UserBusiness"
import { GetUsersSchema } from "../../../src/dtos/Users/getUsers.dto"
import { USER_ROLES } from "../../../src/models/User"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando getUsers", () => {

  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock(),
    new HashManagerMock()
  )

  test("deve retornar todos os uusários", async () => {
    const input = GetUsersSchema.parse({
      token: "token-mock-astrodev"
    })

    const output = await userBusiness.getUsers(input)

    expect(output).toHaveLength(2)
    expect(output).toEqual([
      {
        id: "id-mock-fulano",
        username: "Fulano",
        email: "fulano@email.com",
        createdAt: expect.any(String),
        role: USER_ROLES.NORMAL
      },
      {
        id: "id-mock-astrodev",
        username: "Astrodev",
        email: "astrodev@email.com",
        createdAt: expect.any(String),
        role: USER_ROLES.ADMIN
      }
    ])
  })

  test("deve retornar apenas os usuários cujo username seja de alguma forma semelhante ao inserido", async () => {
    const input = GetUsersSchema.parse({
      username: "Fulano",
      token: "token-mock-fulano"
    })

    const output = await userBusiness.getUsers(input)

    expect(output).toHaveLength(1)
    expect(output).toEqual([
      {
        id: "id-mock-fulano",
        username: "Fulano",
        email: "fulano@email.com",
        createdAt: expect.any(String),
        role: USER_ROLES.NORMAL
      }
    ])
  })

  test("deve disparar erro na ausência do token no Schema", async () => {
    try {
      const input = GetUsersSchema.parse({
      token: ""
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: String must contain at least 1 character(s)")
    }
  }
  })

})