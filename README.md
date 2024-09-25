# Manual Técnico

## Introduccion
Este proyecto tiene como objetivo presentar la prueba tecnica propuesta para el empleo de Desarrollador Backend
de Finca Digital
.Se podra visualizar en la ruta http://localhost

## Requisitos:
- Docker
- Docker Compose

## Cómo levantar la aplicación

1. Clonar el repositorio
2. Correr `docker-compose up --build` para levantar todos los servicios (Base de datos, Backend, Frontend y Liquibase).
3. Si se presenta un conflicto al levantar el contenedor intentar los siguientes comandos para solucionar los posibles errors:
* Detener y eliminar el contenedor actual `docker-compose down -v`
* Verificar que no haya volúmenes persistentes `docker volume ls`
* Si existe `postgres_data` , eliminarlo `docker volume rm postgres_data`
* Verificar los losg `docker logs db`

## Test
Para ejecutar las test ejecutar el comando ```npm run test```
## Migraciones con Liquibase

- El servicio de Liquibase se encargará de aplicar las migraciones automáticamente cada vez que se levanten los contenedores.
- Los archivos de migraciones se encuentran en `./liquibase/changelogs`.
- Las migraciones crearan un usuario con las credenciales
email: admin@example.com  y passwordo: password123
con estas credenciales se puede ingresar y hacer pruebas

## Herramientas Utilizadas
| Tecnología | Versión |
| ------------ | ------------ |
|VS Code | 1.9.2  |
|Git | 2.34.1|
|Nesjts | 10.0.0|
|Posgres | 14|
| React | 18.3.1 |
| vite | 5.4.1 | 
| Docker | 27.3.1 | 
| liquibase | 4.29 | 
|BitBucket | N/A| 

## Playground
Si se desesa usar playground para insertar datos o pruebas a continicuacion se presenta los siguieentes ejemplos en la ruta
http://localhost:3000/graphql
- Crear un usuario
```
mutation {
  createUser(createUserInput: { username: "user1", email: "user1@example.com", password: "password123" }) {
    id
    username
    email
    createdAt
  }
}
```
- Login de usuario
```
mutation {
  login(loginInput: { email: "user1@example.com", password: "password123" }) {
    accessToken
  }
}
```

- Crear un post
```
mutation {
  createPost(createPostInput : { title: "Primer post" , content :"contenido del post" } ) {
    id
    title
    content
    authorId
    createdAt
    updatedAt
  }
}
```

- Obtener los posts
```
query {
  posts{
    id,
    title,
    authorId,
    content,
    createdAt,
    updatedAt
  }
}
```

- Crear un comentario
```
mutation {
  createComment(postId: 1, commentPostInput: { content: "Este es un comentario 2." }) {
    id
    content
    authorId,
    postId
  }
}
```

- Obtener comentarios de un post
```
query {
  getCommentsByPost(postId: 1) {
    id
    content
     author {
      id
      username
    }
  }
}
```
- Obtener un post por id
```
query {
  postFindOne(id: 1) {
    id
    content
    author {
      id
      username
    }
    title,
    comments {
      content
      
      author {
        username,
        email
      }
    }
  }
}
```