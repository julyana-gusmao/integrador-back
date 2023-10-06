import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { ZodError } from "zod"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { GetCommentsSchema } from "../../../src/dtos/Comments/getComments.dto"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"

describe("Testando get comments", () => {
  const comentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new PostDatabaseMock()
  )

  test("deve retornar todos os comentários", async () => {
    const input = GetCommentsSchema.parse({
      token: "token-mock-astrodev"
    })

    const output = await comentBusiness.getComments(input)

    expect(output).toHaveLength(2)
    expect(output).toEqual([
      {
        id: "comment01",
        postId: "post01",
        content: "Fulano comentário",
        likes: 0,
        dislikes: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        creator: {
          id: "id-mock-fulano",
          username: "Fulano"
        }
      },
      {
        id: "comment02",
        postId: "post01",
        content: "Astrodev comentário",
        likes: 0,
        dislikes: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        creator: {
          id: "id-mock-astrodev",
          username: "Astrodev"
        }
      },
    ])
  })

  test("deve retornar apenas comentários que tenham trechos de acordo com o conteúdo inserido", async () => {
    const input = GetCommentsSchema.parse({
      content: "Astrodev",
      token: "token-mock-astrodev"
    })

    const output = await comentBusiness.getComments(input)

    expect(output).toHaveLength(1)
    expect(output).toEqual([
      {
        id: "comment02",
        postId: "post01",
        content: "Astrodev comentário",
        likes: 0,
        dislikes: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        creator: {
          id: "id-mock-astrodev",
          username: "Astrodev"
        }
      }])
  })

  test("deve disparar erro na ausência de token", async () => {
    try {
      const input = GetCommentsSchema.parse({
        token: ""
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência do input token", async () => {
    try {
      const input = GetCommentsSchema.parse({
        content: "Astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: Required")
    }
  }
  })

})