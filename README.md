# Meus Contatos

Aplicativo mobile para gerenciamento de contatos, desenvolvido em **React Native (Expo)**.

- A **autenticação** (cadastro, login e logout) é feita com o **Firebase Authentication**.
- Os **contatos** são armazenados e manipulados por uma **API REST** (mockapi.io), acessada com **Axios**. O Firebase não é usado para guardar contatos.

## Funcionalidades

- Criar conta com e-mail e senha
- Login e logout
- Recuperar senha por e-mail ("Esqueceu sua senha?")
- Listar contatos do usuário logado, com busca por nome
- Cadastrar novo contato
- Ver detalhes de um contato
- Editar um contato
- Excluir um contato, com tela de confirmação
- Mensagens de sucesso e de erro em todas as operações
- Estados especiais: lista vazia e erro de conexão com a API

Cada contato possui: **nome**, **telefone**, **cidade** e **anotação**.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React Native + Expo | Base do aplicativo |
| React Navigation (stack e bottom tabs) | Navegação entre telas |
| Firebase Authentication | Cadastro, login e logout |
| Axios | Requisições à API REST |
| mockapi.io | API REST dos contatos |
| AsyncStorage | Mantém o usuário logado ao fechar o app |

## Telas

| # | Tela | Integração |
|---|---|---|
| 1 | Splash | - |
| 2 | Cadastro de usuário | Firebase Auth |
| 3 | Login | Firebase Auth |
| 4 | Lista de contatos | API `GET /contatos` |
| 5 | Novo contato | API `POST /contatos` |
| 6 | Editar contato | API `PUT /contatos/:id` |
| 7 | Detalhes do contato | API `GET /contatos/:id` |
| 8 | Confirmação de exclusão | API `DELETE /contatos/:id` |
| 9 | Perfil / Logout | Firebase Auth |
| 10 | Lista vazia | Exibida quando a API retorna `[]` |
| 11 | Erro de API | Exibida quando a requisição falha |

## API REST

Base: `https://6ab463aa217e43658831bb76.mockapi.io/api/v1`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/contatos?userId={uid}` | Lista os contatos do usuário |
| GET | `/contatos/:id` | Busca um contato |
| POST | `/contatos` | Cadastra um contato |
| PUT | `/contatos/:id` | Atualiza um contato |
| DELETE | `/contatos/:id` | Exclui um contato |

Modelo do recurso `contatos`:

```json
{
  "id": "1",
  "nome": "João Silva",
  "telefone": "(81) 98765-4321",
  "cidade": "Recife",
  "anotacao": "Amigo da faculdade",
  "userId": "uid do usuário no Firebase"
}
```

O campo `userId` guarda o identificador do usuário do Firebase, para que cada pessoa veja apenas os seus contatos.

## Como executar

### Pré-requisitos

- Node.js instalado
- App **Expo Go** no celular (ou um emulador Android)
- Um projeto no Firebase com o login **E-mail/senha** ativado

### Passo a passo

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/fabiana-falcao/meuappmobile4.git
   cd meuappmobile4
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o Firebase em `src/services/firebaseConfig.js`, colocando as chaves do seu projeto (Console Firebase > Configurações do projeto > Seus apps).

4. Configure a API em `src/services/api.js`, alterando a constante `BASE_URL`. O recurso `contatos` deve ter os campos `nome`, `telefone`, `cidade`, `anotacao` e `userId`.

5. Inicie o projeto:

   ```bash
   npx expo start
   ```

6. Leia o QR Code com o Expo Go. O celular e o computador precisam estar na mesma rede Wi-Fi. Se a conexão falhar, use `npx expo start --tunnel`.

## Estrutura do projeto

```
meuappmobile4/
├── App.js                  # Ponto de entrada (importa src/App.js)
└── src/
    ├── App.js              # Navegação e controle de autenticação
    ├── theme.js            # Cores e estilos comuns
    ├── components/
    │   ├── ConfirmarExclusaoModal.js
    │   ├── ContatoForm.js
    │   ├── EstadoErro.js
    │   └── EstadoVazio.js
    ├── screens/
    │   ├── SplashScreen.js
    │   ├── CadastroScreen.js
    │   ├── LoginScreen.js
    │   ├── ContatosScreen.js
    │   ├── NovoContatoScreen.js
    │   ├── DetalhesScreen.js
    │   ├── EditarContatoScreen.js
    │   └── PerfilScreen.js
    └── services/
        ├── api.js           # Requisições à API REST (Axios)
        ├── authErrors.js    # Mensagens de erro do Firebase em português
        └── firebaseConfig.js
```

## Capturas de tela

Adicione aqui os prints do aplicativo (por exemplo, em uma pasta `prints/`):

```md
![Login](prints/login.png)
![Lista de contatos](prints/lista.png)
```

## Autora

Fabiana Falcão
