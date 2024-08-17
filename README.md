# API Blog dos Professores
## Instalação

Para começar a usar o projeto, siga os passos abaixo:

#### 1. Clone o repositório

Clone o projeto para o seu ambiente de desenvolvimento usando o comando git clone:

```bash
  git clone https://github.com/FIAP-G4/api-blog-professores.git
```

#### 2. Entre no diretório do projeto

Navegue para o diretório recém-clonado usando o comando cd:

```bash
  cd api-blog-professores
```

#### 3. Instale as dependências

Use o gerenciador de pacotes Node.js (npm) para instalar todas as dependências do projeto:

```bash
  npm install
```
#### 4. Configure os arquivos de exemplo

Há arquivos/pastas de exemplo no projeto que você deve configurar para suas necessidades. Para fazer isso, siga estas etapas:

- Localize os arquivos/pastas com nomes terminando em `.exemple` e faça cópias deles sem a extensão `.exemple`. Por exemplo, `.env.exemple` deve ser renomeado para `.env`.

#### 5. Inicie o aplicativo com o Docker

Certifique-se de ter o Docker instalado em sua máquina e execute o seguinte comando para iniciar o aplicativo:

```bash
  docker compose up -d
```

#### 6. Execute as migrations

Após o container iniciado por completo execute o seguinte comando para realizar as migrações do banco:

**Obs:** Certifique-se de que o container e o banco esteja de pé

```bash
  npm run migrate
```

#### 7. Acesso ao banco

```bash
  URL: localhost
  banco: blog
  user: fiap
  password: fiap
  port: 3306
```

#### 8. Acesse a API

Esse projeto utiliza a documentação dinâmica do swagger, para acessar navegue a seguinte URL

```bash
  localhost:3000
```
