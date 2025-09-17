# Users Service - FIAP X (Hack SOAT10)

Este repositório implementa o **serviço de autenticação e gerenciamento de usuários** do projeto **Sistema de Processamento de Vídeos - FIAP X**, desenvolvido como parte do desafio do curso de Arquitetura de Software da FIAP.  

Ele é responsável por **cadastrar, autenticar e gerenciar usuários** dentro da arquitetura de microsserviços do sistema, garantindo segurança, escalabilidade e integração com os demais serviços (ex.: serviço de processamento de vídeos).  

---

## 📌 Funcionalidades

- Cadastro de usuários  
- Autenticação e login (JWT)  
- Listagem de usuários  
- Busca individual de usuário  
- Atualização de dados de usuários  
- Exclusão de usuários  
- Middleware de autenticação  
- Testes unitários para os principais casos de uso  

---

## 🏗️ Arquitetura

O serviço segue princípios de **arquitetura limpa (Clean Architecture)** e **Domain-Driven Design (DDD)**:  

- **Controller** → Camada de entrada (rotas e endpoints)  
- **UseCases** → Regras de negócio (ex.: criar usuário, login, atualização)  
- **Repository** → Acesso a dados via TypeORM  
- **Infra** → Configuração de banco e injeção de dependências  
- **Middleware** → Autenticação JWT  
- **Utils** → Validações e tratamento de erros  

---

## ⚙️ Tecnologias

- **Node.js + TypeScript**  
- **Express.js**  
- **TypeORM** (PostgreSQL)  
- **JWT** (JSON Web Token)  
- **Jest** (testes unitários)  
- **Docker + Docker Compose**  

---

## 🚀 Como executar

### Pré-requisitos
- Node.js (>= 18)  
- Yarn  
- Docker e Docker Compose  

### Passos

```bash
# Clonar o repositório
git clone https://github.com/seu-grupo/users_service.git
cd users_service

# Instalar dependências
yarn install

# Subir containers (app + banco de dados)
docker-compose up --build

# Rodar a aplicação localmente
yarn dev
```

O serviço estará disponível em:  
```
http://localhost:3000
```

---

## 🧪 Testes

Para rodar os testes unitários com Jest:  

```bash
yarn test
```

---

## 📡 Endpoints principais

| Método | Rota           | Descrição                  | Autenticação |
|--------|---------------|----------------------------|---------------|
| POST   | `/users`      | Criar novo usuário         | ❌            |
| POST   | `/login`      | Autenticar usuário (JWT)   | ❌            |
| GET    | `/users`      | Listar todos usuários      | ✅            |
| GET    | `/users/:id`  | Buscar usuário por ID      | ✅            |
| PUT    | `/users/:id`  | Atualizar usuário          | ✅            |
| DELETE | `/users/:id`  | Remover usuário            | ✅            |

---

## 📊 Integração com o Projeto

Este serviço é **parte da arquitetura de microsserviços do FIAP X**, integrando-se ao **serviço de processamento de vídeos**.  
Ele fornece autenticação segura e controle de acesso para que cada usuário possa:  

- Enviar vídeos  
- Acompanhar status de processamento  
- Receber notificações de erro  

---

## 🔒 Segurança

- Autenticação via **JWT**  
- Proteção de rotas privadas com middleware de autorização  
- Hash de senha (bcrypt)  

---

## 👨‍💻 Autores

Projeto desenvolvido pelo grupo SOAT 67 para o **Hackaton - Pós-Graduação em Arquitetura de Software (FIAP)**.  
