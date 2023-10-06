import { ZodError } from "zod"
import { UserBusiness } from "../../../src/business/UserBusiness"
import { SignupSchema } from "../../../src/dtos/Users/signup.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando signup", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new TokenManagerMock(),    
    new IdGeneratorMock(),
    new HashManagerMock()
  )

  test("deve gerar token ao cadastrar", async () => {
    const input = SignupSchema.parse({
      username: "Ciclana",
      email: "ciclana@email.com",
      password: "ciclana321"
    })

    const output = await userBusiness.signup(input)

    expect(output).toEqual({
      id: "id-mock",
      username:"Ciclana",
      email:"ciclana@email.com",
      role:"ADMIN",
      token: "token-mock"
    })
  })

  test("deve disparar erro na ausência de username", async () => {
    try {
      const input = SignupSchema.parse({
      username: "",
      email: "ciclana@email.com",
      password: "cc"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("username: String must contain at least 2 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de email", async () => {
    try {
      const input = SignupSchema.parse({
      username: "Samuel",
      email: "",
      password: "senha1"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("email: String must contain at least 11 character(s)")
    }
  }
  })

  test("deve disparar erro quando o email informado não possuir @", async () => {
    try {
      const input = SignupSchema.parse({
      username: "Samuel",
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
      const input = SignupSchema.parse({
      username: "Samuel",
      email: "samuel@email.com",
      password: "senha"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("password: String must contain at least 6 character(s)")
    }
  }
  })

      
  test("deve disparar erro na ausência do input username", async () => {
    try {
      const input = SignupSchema.parse({
        email: "fulano@email.com",
        password: "senha1"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("username: Required")
    }
  }
  })
  
  
  test("deve disparar na ausência do input email", async () => {
    try {
      const input = SignupSchema.parse({
        username: "id-mock-fulano",
        password: "senha1"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("email: Required")
    }
  }
  })

  test("deve disparar erro na ausência do input password", async () => {
    try {
      const input = SignupSchema.parse({
        username: "id-mock-fulano",
        email: "fulano@email.com",
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("password: Required")
    }
  }
  })


})