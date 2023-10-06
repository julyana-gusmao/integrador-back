import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDataBase";

export class UserDatabase extends BaseDatabase {

  public static TABLE_USERS = "users"

  public insertUser = async (
    input: UserDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(input)
  }


  public findUsers = async (
    q: string | undefined
  ): Promise<UserDB[]> => {

    let usersDB

    if (q) {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where("username", "LIKE", `%${q}%`)
      
        usersDB = result

    } else {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        
      usersDB = result
    }

    return usersDB
  }

  public findUserById = async (
    id: string
  ): Promise<UserDB> => {
    const [userDB]: UserDB[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .select()
      .where({ id })

    return userDB
  }

  public findUserByEmail = async (
    email: string
  ): Promise<UserDB> => {
    const [userDB]: UserDB[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .select()
      .where({ email })

    return userDB
  }

  public updateUserById = async (
    id: string, userDB: UserDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .update(userDB)
      .where({ id })
  }

  public updateUserRoleById = async (
    id: string, userDB: UserDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .update(userDB)
      .where({ id })
  }

  public deleteUserById = async (
    id: string
  ): Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .delete()
      .where({ id })
  }


}
