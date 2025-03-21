# Generic SAAS Application
Esse projeto é uma aplicação genérica de SAAS (Software as a Service) que pode ser utilizada para diversos tipos de negócios. A aplicação foi desenvolvida utilizando o framework NestJS para o backend, ReactJS para o frontend e PostgreSQL como banco de dados.

A ideia é que a aplicação possa ser utilizada como base para o desenvolvimento de diversos tipos de negócios, como por exemplo, um sistema de gerenciamento de tarefas, um sistema de gerenciamento de projetos, um sistema de gerenciamento de clientes, entre outros.

Com isso, esse projeto foca em construir o básico de um sistema de SAAS, como autenticação, autorização, cadastro de usuários, cadastro de planos, cadastro de assinaturas, entre outros.

## Como rodar o projeto?
Você pode rodar o projeto localmente seguindo os passos abaixo:

### Banco de dados
- Navegue até a pasta `back/compose` e execute o comando `docker-compose up -d` para subir o banco de dados PostgreSQL.

### Backend
- Navegue até a pasta `back` e execute o comando `yarn` para instalar as dependências do projeto.
- Crie um arquivo env com as variáveis de ambiente do projeto. Você pode utilizar o arquivo `.env.example` como base.
- Execute o comando `yarn start:dev` para rodar o backend.

### Frontend
- Navegue até a pasta `front` e execute o comando `yarn` para instalar as dependências do projeto.
- Execute o comando `yarn start` para rodar o frontend.

### Acesso
- Acesse a aplicação em `http://localhost:3000`.
- Acesse a documentação da API em `http://localhost:5001/api/docs`.