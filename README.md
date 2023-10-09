<img src="https://i.ibb.co/DVLMDr2/image.png" alt="Logo da Labeddit"/>

## Labeddit: A rede social da Labenu

## Índice

• Descrição
<br>
• Links
<br>
• Banco de dados
<br>
• Requisições
<br>
• Como rodar este projeto
<br>
• Linguagens utilizadas
<br>

## Descrição
O projeto Labeddit é parte da última etapa do curso de Desenvolvimento Web Full Stack da escola de programação "Labenu". Trata-se de um pequeno clone da rede social "Reddit" que leva o desenvolvedor a colocar em prática seus conhecimentos em ambas as stacks. Os usuários da Labeddit podem criar suas contas e interagir entre si no fórum único da aplicação através de tópicos e comentários dentro dos mesmos. Caso desejem, os usuários podem alterar seus dados ou deletar a conta (o que, claro, não queremos que vocês façam 😭). 

Neste repositório, você verá a construção da API relativa ao projeto Labeddit.

## Links

Deploy da API no Render:
<a href="https://labeddit-api-0ek7.onrender.com">![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)</a>

Coleção da API no Postman:
<a href="[https://labeddit-api-0ek7.onrender.com](https://documenter.getpostman.com/view/26594506/2s9YJgVMAp)">![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)</a>

## Banco de dados 

O banco de dados contém três tabelas com as seguintes colunas:

#### users 🙍🙆
- id
- name
- email
- password
- role
- created_at
##
#### posts ✍️✍️
- id
- creator_id
- content
- likes
- dislikes
- created_at
- updated_at
##
#### comments ✍️✍️
- id
- creator_id
- post_id
- content
- likes
- dislikes
- created_at
- updated_at
##
#### likes_dislikes_posts 👍👎
- user_id 
- post_id
- like
##
#### likes_dislikes_comments 👍👎
- user_id 
- comment_id
- like
##


## Requisições
A tabela a seguir foi retirada da coleção da API no postman, informando todas as requisições possíveis de serem realizadas pelo router.

<img src="https://i.ibb.co/pPtMxHd/image.png" alt="Requisições da Labeddit API"/>


### Signup
Endpoint público utilizado para cadastro. Devolve um token jwt.
```typescript
// request POST /users/signup
// body JSON
{
  "username": "Beltrana",
  "email": "beltrana@email.com",
  "password": "beltrana00"
}

// response
// status 201 CREATED
{
  token: "um token jwt"
}
```

### Login
Endpoint público utilizado para login. Devolve um token jwt.
```typescript
// request POST /users/login
// body JSON
{
  "email": "beltrana@email.com",
  "password": "beltrana00"
}

// response
// status 200 OK
{
  token: "um token jwt"
}
```


### Get users
Endpoint protegido, requer um token jwt para acessá-lo.
```typescript
// request GET /users
// headers.authorization = "token jwt"

// body JSON
{
  "username": "Username do usuário (opcional)"
}

// response
// status 200 OK
[
    {
        "id": "uma uuid v4",
        "username": "Beltrano",
        "email": "beltrano@email.com",
        "role": "ADMIN",
        "createdAt": "2023-10-09T06:32:32.991Z"
    },
    {
        "id": "uma uuid v4",
        "username": "Siclana",
        "email": "siclana@email.com",
        "role": "NORMAL",
        "createdAt": "2023-10-09T06:32:32.991Z"
    },
    {
        "id": "uma uuid v4",
        "username": "Fulana",
        "email": "fulana@email.com",
        "role": "NORMAL",
        "createdAt": "2023-10-09T06:32:32.991Z"
    }
]
```

### Edit user by id
Endpoint protegido, requer um token jwt para acessá-lo. Apenas o dono da conta poderá acessar este endpoint. Todos os elementos do body são opcionais.
```typescript
// request PUT /users/:id
// path params = "id"
// headers.authorization = "token jwt"
// body JSON
{
    "username": "Um novo username",
    "email: "Um novo email",
    "password: "Uma nova senha"
}

// response
// status 200 OK
    {
        "message: "Usuário editado com sucesso"
    }
```

### Delete user by id
Endpoint protegido, requer um token jwt para acessá-lo. Apenas um administrador ou o dono da conta poderá acessar este endpoint.
```typescript
// request DELETE /users/:id
// path params = "id"
// headers.authorization = "token jwt"

// response
// status 200 OK
    {
        "message: "Usuário deletado com sucesso"
    }
```

### Create post
Endpoint protegido, requer um token jwt para acessá-lo.
```typescript
// request POST /posts
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu happy hour!"
}

// response
// status 201 CREATED
```

### Get posts
Endpoint protegido, requer um token jwt para acessá-lo. O usuário pode inserir um trecho da postagem que ele deseja procurar, sendo algo opcional.
```typescript
// request GET /posts
// headers.authorization = "token jwt"
// body JSON
{
  "content": "Conteúdo da postagem (opcional)"
}

// response
// status 200 OK
[
    {
        "id": "uma uuid v4",
        "content": "Hoje vou estudar POO!",
        "likes": 2,
        "dislikes" 1,
        "createdAt": "2023-01-20T12:11:47:000Z"
        "updatedAt": "2023-01-20T12:11:47:000Z"
        "creator": {
            "id": "uma uuid v4",
            "username": "Fulano"
        }
    },
    {
        "id": "uma uuid v4",
        "content": "kkkkkkkkkrying",
        "likes": 0,
        "dislikes" 0,
        "createdAt": "2023-01-20T15:41:12:000Z"
        "updatedAt": "2023-01-20T15:49:55:000Z"
        "creator": {
            "id": "uma uuid v4",
            "username": "Ciclana"
        }
    }
]

```

### Edit post
Endpoint protegido, requer um token jwt para acessá-lo. Somente quem criou o post pode editá-lo e somente o conteúdo pode ser editado.
```typescript
// request PUT /posts/:id
// path params = "id"
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu happy hour lá no point de sempre!"
}

// response
// status 200 OK
{
           "content": "Partiu happy hour lá no point de sempre!"
}
```


## Like ou dislike post ou comentário.

Endpoint protegido, requer um token jwt para acessá-lo.<br>
Funciona tanto para postagens ou comentários, sendo necessário trocar apenas o termo no endpoint entre "posts" ou "comments"<br>
Caso dê um like no conteúdo que já tenha dado like, o like é desfeito.<br>
Caso dê um dislike no conteúdo que já tenha dado dislike, o dislike é desfeito.<br><br>
Caso dê um like no conteúdo que tenha dado dislike, o like sobrescreve o dislike.<br>
Caso dê um dislike no conteúdo que tenha dado like, o dislike sobrescreve o like.

### Like (funcionalidade 1)
```typescript
// request PUT /posts/:id/like OU /comments/:id/like 
// path params = "id"
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
```

### Dislike (funcionalidade 2)
```typescript
// request PUT /posts/:id/like OU /comments/:id/like 
// path params = "id"
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
```

### Delete post
Endpoint protegido, requer um token jwt para acessá-lo. Somente um administrador ou o criador do post pode acessar este endpoint.

```typescript
// request DELETE /posts/:id
// query params = "id"
// headers.authorization = "token jwt"

// response
// status 200 OK
{
  message: "Postagem deletada com sucesso!"
}
```

### Delete comment
Endpoint protegido, requer um token jwt para acessá-lo. Somente um administrador ou o criador do comentário pode acessar este endpoint.

```typescript
// request DELETE /comments/:id
// query params = "id"
// headers.authorization = "token jwt"

// response
// status 200 OK
{
  message: "Comentário deletado com sucesso!"
}
```

## Como rodar este projeto

#### Faça o fork deste repositório para o seu perfil clicando no link abaixo.
<a href="https://github.com/eu-samuel/labeddit-backend/fork"><img alt="Static Badge" src="https://img.shields.io/badge/FORK-backend?color=orange"></a>

#### Em seu editor de código, faça o clone do repositório forkado.
$ git clone https://github.com/seuUsuario/labeddit-backend.git

#### Acesse a pasta do repositório no terminal git/git bash
$ cd labeddit-backend

#### Instale as dependências utilizadas no mesmo
````
$ npm install
$ npm i typescript -D
$ npm install cors express knex sqlite3 zod
$ npm install -D @types/cors express knex zod
$ npm install uuid dotenv jsonwebtoken bcryptjs
$ npm install -D @types/uuid dotenv jsonwebtoken bcryptjs
$ npm i -D jest @types/jest ts-jest
````

O typescript e o jest já estão configurados, então você precisará apenas instalá-los via terminal.

Além disso, será necessário criar o arquivo com as variáveis de ambiente chamado de .env. Este arquivo deve ser criado na raiz do projeto, ao lado do tsconfig.json e package.json. Por questões de segurança, este arquivo não é adicionado ao repositório no momento do push, então siga o modelo abaixo na hora da criação:

````
PORT=3003
DB_FILE_PATH=./labeddit.db
JWT_KEY=monte-uma-senha-assim
JWT_EXPIRES_IN=1d
````

#### Execute a aplicação
````
$ npm run dev
````

O projeto rodará na porta 5173. Para acessar em seu navegador, utilize o link: 
**https://localhost:5173**

#### Rodando todo o projeto

Caso deseje rodar todo o projeto localmente, você terá que utilizar o repositório do front-end. Como este repositório é relativo ao back-end da aplicação, você deverá fazer os procedimentos de fork, clone e instalação de dependências do front-end a partir do seguinte repositório:

<a href="http://github.com/eu-samuel/labeddit-backend"><img alt="Static Badge" src="https://img.shields.io/badge/FRONTEND-backend?color=red"></a>

Com isso, entre em ambas as pastas front-end e back-end em dois terminais separados e faça o comando de execução em ambas:

````
$ npm run dev
````

## Linguagens utilizadas 

### Editor de código utilizado

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Back-end

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)


### Front-end

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
