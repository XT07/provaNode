📚 API de Usuários, Projetos e Tarefas
🧑‍💻 Usuário
➡️ POST /login

Descrição: Faz login do usuário.

Body:

{
  "nome": "seu_nome",
  "senha": "sua_senha"
}

Resposta:

{
  "id": 1,
  "token": "seu_token_jwt"
}

➡️ POST /register

Descrição: Cadastra um novo usuário.

Body:

{
  "nome": "seu_nome",
  "senha": "sua_senha"
}

Resposta:

Usuário criado com sucesso

➡️ GET /users 🔒

Descrição: Lista todos os usuários.
Requer token JWT no header.
➡️ GET /user/:id 🔒

Descrição: Busca um usuário pelo ID.
Exemplo: /user/1
➡️ PUT /user/:id 🔒

Descrição: Atualiza o nome e senha de um usuário.

Body:

{
  "nome": "novo_nome",
  "senha": "nova_senha"
}

➡️ DELETE /user/:id 🔒

Descrição: Deleta um usuário pelo ID.
📂 Projeto
➡️ POST /project 🔒

Descrição: Cria um novo projeto.

Body:

{
  "titulo": "Título do projeto",
  "descricao": "Descrição do projeto",
  "tarefas": [1, 2, 3] // IDs das tarefas vinculadas (opcional)
}

➡️ GET /projects 🔒

Descrição: Lista todos os projetos.
➡️ GET /project/:id 🔒

Descrição: Busca um projeto pelo ID.
Exemplo: /project/1
➡️ PUT /project/:id 🔒

Descrição: Atualiza um projeto.

Body:

{
  "titulo": "Novo título",
  "descricao": "Nova descrição",
  "tarefas": [1, 2]
}

➡️ DELETE /project/:id 🔒

Descrição: Deleta um projeto pelo ID.
📋 Tarefa
➡️ POST /task 🔒

Descrição: Cria uma nova tarefa.

Body:

{
  "nome": "Nome da tarefa",
  "descricao": "Descrição da tarefa",
  "responsavel": "ID do responsável",
  "projetoVinc": "ID do projeto"
}

➡️ GET /tasks 🔒

Descrição: Lista todas as tarefas.
➡️ GET /task/:id 🔒

Descrição: Busca uma tarefa pelo ID.
Exemplo: /task/1
➡️ PUT /task/:id 🔒

Descrição: Atualiza uma tarefa.

Body:

{
  "nome": "Novo nome",
  "descricao": "Nova descrição",
  "responsavel": "ID do responsável",
  "projetoVinc": "ID do projeto"
}

➡️ DELETE /task/:id 🔒

Descrição: Deleta uma tarefa pelo ID.
🛡️ Autenticação

    As rotas marcadas com 🔒 precisam de autenticação via JWT.

    Envie o token no cabeçalho das requisições:

Authorization: Bearer seu_token

🚀 Resumo

    Público: /register, /login

    Protegido (🔒): /users, /user/:id, /projects, /project/:id, /tasks, /task/:id