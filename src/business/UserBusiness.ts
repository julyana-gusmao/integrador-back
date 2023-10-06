import { UserDatabase } from "../database/UserDataBase"
import { UserDB, User } from "../models/User"
import { BadRequestError } from "../errors/BadRequestError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/idGenerator"
import { HashManager } from "../services/HashManager"
import { USER_ROLES } from "../models/User"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/Users/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/Users/signup.dto"
import { EditUserInputDTO, EditUsertOutputDTO } from "../dtos/Users/editUser.dto"
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/Users/getUsers.dto"
import { DeleteUserInputDTO, DeleteUserOutputDTO } from "../dtos/Users/deleteUser.dto"
import { ChangeUserRoleInputDTO, ChangeUserRoleOutputDTO } from '../dtos/Users/changeUserRole.dto'


export class UserBusiness {

  constructor(
    private userDatabase: UserDatabase,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator,
    private hashManager: HashManager
  ) { }

  public signup = async (
    input: SignupInputDTO
  ): Promise<SignupOutputDTO> => {
    const { username, email, password } = input

    const id = this.idGenerator.generate()
    const hashedPassword = await this.hashManager.hash(password)
    const userDBExists = await this.userDatabase.findUserByEmail(email)
    const users = await this.userDatabase.findUsers(username)

    if (userDBExists) {
      throw new Error("Email já cadastrado")
    }

    const role = users.length === 0 ? USER_ROLES.ADMIN : USER_ROLES.NORMAL

    const newUser = new User(
      id,
      username,
      email,
      hashedPassword,
      role,
      new Date().toISOString()
    )

    const newUserDB: UserDB = {
      id: newUser.getId(),
      username: newUser.getUsername(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      role: newUser.getRole(),
      created_at: newUser.getCreatedAt()
    }

    await this.userDatabase.insertUser(newUserDB)

    const token = this.tokenManager.createToken({
      id: newUser.getId(),
      role: newUser.getRole(),
      username: newUser.getUsername()
    })

    const output = {
      id: newUser.getId(),
      username: newUser.getUsername(),
      email: newUser.getEmail(),
      role: newUser.getRole(),
      token: token
    }

    return output
  }


  public login = async (
    input: LoginInputDTO
  ): Promise<LoginOutputDTO> => {

    const { email, password } = input

    const userDB = await this.userDatabase.findUserByEmail(email)

    const hashedPassword = userDB.password
    const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

    if (!isPasswordCorrect) {
      throw new BadRequestError("'Email' ou 'password' não conferem, tente novamente")
    }

    const token = this.tokenManager.createToken({
      id: userDB.id,
      role: userDB.role,
      username: userDB.username
    })

    const output: LoginOutputDTO = {
      id: userDB.id,
      username: userDB.username,
      email: userDB.email,
      role: userDB.role,
      token: token
    }

    return output
  }

  public getUsers = async (
    input: GetUsersInputDTO
  ): Promise<GetUsersOutputDTO> => {

    const { username, token } = input
    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    let userFoundDB = await this.userDatabase.findUsers(username)

    const users = userFoundDB
      .map((userDB) => {
        const user = new User(
          userDB.id,
          userDB.username,
          userDB.email,
          userDB.password,
          userDB.role,
          userDB.created_at
        )
        return user.toBusinessModel()
      })

    const output: GetUsersOutputDTO = users
    return output
  }

  public editUserById = async (
    input: EditUserInputDTO
  ): Promise<EditUsertOutputDTO> => {

    const {
      idToEdit,
      username,
      email,
      password,
      token
    } = input

    const userToEditDB = await this.userDatabase.findUserById(idToEdit)

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    const user = new User(
      userToEditDB.id,
      userToEditDB.username,
      userToEditDB.email,
      userToEditDB.password,
      userToEditDB.role,
      userToEditDB.created_at
    )

    if (userToEditDB.id !== idToEdit) {
      throw new UnauthorizedError("Somente o dono desta conta pode editar os dados da mesma.")
    }

    email && user.setEmail(email)
    username && user.setUsername(username)
    password && user.setPassword(password)

    const updatedUserDB: UserDB = {
      id: user.getId(),
      username: user.getUsername(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
      created_at: user.getCreatedAt()
    }

    await this.userDatabase.updateUserById(idToEdit, updatedUserDB)

    const output = {
      message: "Usuário editado com sucesso"
    }

    return output

  }


  public editUserRoleById = async (
    input: ChangeUserRoleInputDTO
  ): Promise<ChangeUserRoleOutputDTO> => {

    const {
      id,
      role,
      token
    } = input

    const userToEditDB = await this.userDatabase.findUserById(id)

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    const user = new User(
      userToEditDB.id,
      userToEditDB.username,
      userToEditDB.email,
      userToEditDB.password,
      userToEditDB.role,
      userToEditDB.created_at
    )

    role && user.setRole(role)

    const updatedUserDB: UserDB = {
      id: user.getId(),
      username: user.getUsername(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
      created_at: user.getCreatedAt()
    }

    if (payload.role === USER_ROLES.ADMIN) {
      await this.userDatabase.updateUserRoleById(id, updatedUserDB)
    } else if (userToEditDB.id === id) {
      await this.userDatabase.updateUserRoleById(id, updatedUserDB)
    } else {
      throw new UnauthorizedError("Somente o administrador ou o dono da conta pode executar essa ação.")
    }

    const output = {
      id: user.getId(),
      username: user.getUsername(),
      role: user.getRole(),
    }

    return output

  }

  public deleteUserById = async (
    input: DeleteUserInputDTO
  ): Promise<DeleteUserOutputDTO> => {

    const { idToDelete, token } = input

    const userToDeleteDB = await this.userDatabase.findUserById(idToDelete)

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    if (payload.role === USER_ROLES.ADMIN) {
      await this.userDatabase.deleteUserById(userToDeleteDB.id)
    } else if (userToDeleteDB.id === payload.id) {
      await this.userDatabase.deleteUserById(userToDeleteDB.id)
    } else {
      throw new UnauthorizedError("Somente admins ou o dono dessa conta podem acessar esse recurso")
    }

    const output = {
      message: "Usuário deletado com sucesso",
    }
    return output
  }

}