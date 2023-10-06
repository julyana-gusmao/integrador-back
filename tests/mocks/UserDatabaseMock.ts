import { USER_ROLES, UserDB } from "../../src/models/User";
import { BaseDatabase } from "../../src/database/BaseDataBase";

const usersMock: UserDB[] = [
  {
    id: "id-mock-fulano",
    username: "Fulano",
    email: "fulano@email.com",
    password: "hash-mock-fulano", // senha = "fulano123"
    created_at: new Date().toISOString(),
    role: USER_ROLES.NORMAL
  },
  {
    id: "id-mock-astrodev",
    username: "Astrodev",
    email: "astrodev@email.com",
    password: "hash-mock-astrodev", // senha = "astrodev99"
    created_at: new Date().toISOString(),
    role: USER_ROLES.ADMIN
  }
]

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users"

  public insertUser = async (newUserDB: UserDB)
  : Promise<void> => {
    usersMock.push(newUserDB)
  }

  public async findUsers(
    username: string | undefined
  ): Promise<UserDB[]> {
    if (username) {
      return usersMock.filter(user =>
        user.username.toLocaleLowerCase()
          .includes(username.toLocaleLowerCase()))

    } else {
      return usersMock
    }
  }
  public findUserById = async (id: string)
  : Promise<UserDB> => {
    return usersMock.filter(user => user.id === id)[0]
  }

  public findUserByEmail = async (email: string)
  : Promise<UserDB> => {
    return usersMock.filter(user => user.email === email)[0]
  }

  public updateUserById = async (id: string, userDB: UserDB)
  :Promise<void> => {}

  public deleteUserById = async (id: string)
  :Promise<void> => {}

  public updateUserRoleById = async (id: string, userDB: UserDB)
  :Promise<void> => {}

}
