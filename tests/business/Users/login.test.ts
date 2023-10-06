import { ZodError } from "zod"
import { UserBusiness } from "../../../src/business/UserBusiness"
import { LoginSchema } from "../../../src/dtos/Users/login.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock(),
    new HashManagerMock()
  )

  test("deve gerar token ao logar", async () => {
    const input = LoginSchema.parse({
      email: "fulano@email.com",
      password: "fulano123"
    })

    const output = await userBusiness.login(input)

    expect(output).toEqual({
      id: "id-mock-fulano",
      username:"Fulano",
      email:"fulano@email.com",
      role:"NORMAL",
      token: "token-mock-fulano"
    })
  })

  test("deve disparar erro caso o input obrigatório email tenha outro nome", async () => {
    try {
      const input = LoginSchema.parse({
        userEmail: "fulano@email.com",
        password: "fulano123"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("email: Required")
    }
  }
  })

  test("deve disparar erro caso o input obrigatório password tenha outro nome", async () => {
    try {
      const input = LoginSchema.parse({
        email: "fulano@email.com",
        senha: "fulano123"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("password: Required")
    }
  }
  })

  test("deve disparar erro na ausência de email", async () => {
    try {
      const input = LoginSchema.parse({
      email: "",
      password: "senha1"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("email: String must contain at least 11 character(s)")
    }
  }
  })

  test("deve disparar erro no caso do e-mail informado não conter @", async () => {
    try {
      const input = LoginSchema.parse({
      email: "samuelemail.com",
      password: "senha1"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("email: Invalid input: must include \"@\"")
    }
  }
  })

  test("deve disparar erro na ausência de senha ou quando a mesma tiver menos de seis caracteres", async () => {
    try {
      const input = LoginSchema.parse({
      email: "samuel@email.com",
      password: "senha"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("password: String must contain at least 6 character(s)")
    }
  }
  })

})