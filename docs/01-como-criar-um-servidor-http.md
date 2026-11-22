# 🏴‍☠️ Capítulo 01: O Que é o Node.js e Como Criar Seu Primeiro Servidor HTTP

> *"Antes de velejar em mar aberto, o carpinteiro precisa entender a madeira do casco."* — Silvers Rayleigh

Se você nunca programou um servidor na vida, bem-vindo a bordo! Este guia foi feito para você entender cada tábua da estrutura sem jargões complicados.

---

## 1. O Que é o Node.js?

Quando você programa JavaScript no navegador (Google Chrome, Firefox), o código serve para mudar botões, cores e interagir com a tela. O navegador tem um motor embutido chamado **V8** (criado pelo Google) que lê e executa JavaScript com velocidade incrível.

Em 2009, um engenheiro chamado Ryan Dahl pensou:
> *"E se a gente tirasse o motor V8 de dentro do navegador e colocasse ele para rodar direto no sistema operacional do computador?"*

Nasceu o **Node.js**: uma ferramenta que permite ao seu computador rodar JavaScript para ler arquivos no disco rígido, conectar-se à internet e responder requisições de outros computadores.

---

## 2. Como Funciona a Comunicação na Web (HTTP)?

Quando você digita `google.com` ou clica em um botão em um aplicativo, acontece uma conversa entre dois computadores através de um protocolo chamado **HTTP**:

1. **Cliente (Client):** É o navegador ou aplicativo que faz uma **Requisição (Request)** — *"Ei, servidor, me dá a lista de piratas!"*.
2. **Servidor (Server):** É o nosso programa Node.js que escuta na internet, processa o pedido e envia uma **Resposta (Response)** — *"Aqui está a lista: Luffy, Zoro, Nami!"*.

```
   [ CLIENTE ]                                       [ SERVIDOR NODE.JS ]
 (Navegador / App)                                      (Nosso Código)
         │                                                    │
         │ ──── 1. Requisição (Request) ────────────────────► │
         │      "Quero ver a lista de piratas!"               │
         │                                                    │
         │ ◄─── 2. Resposta (Response) ────────────────────── │
         │      "Status 200: [Luffy, Zoro, Nami]"             │
```

---

## 3. O Módulo Nativo `node:http`

O Node.js já vem de fábrica com ferramentas prontas chamadas **módulos nativos**. Não precisamos instalar nada da internet para criar um servidor. O módulo responsável por conversar pela web é o **`node:http`**.

Veja o menor servidor web do mundo:

```javascript
import http from 'node:http'

// 1. Criamos o servidor
const server = http.createServer((request, response) => {
  // 2. Enviamos uma mensagem de volta
  return response.end('Ola, Grand Line!')
})

// 3. Mandamos o servidor ficar ouvindo na porta 3333
server.listen(3333)
```

### O que significa cada linha?

- **`http.createServer(...)`**: Constrói o farol do navio. Ele recebe uma função que será executada **toda vez que alguém acessar o servidor**.
- **`request` (ou `req`)**: Traz todos os dados de quem está chamando (qual página ele quer acessar, qual método ele usou, que dados ele mandou).
- **`response` (ou `res`)**: É o megafone do servidor. Usamos ele para mandar a resposta de volta e encerrar a conversa com `.end()`.
- **`server.listen(3333)`**: O seu computador tem milhares de "portas" de comunicação. A porta `3333` é como o número da vaga do cais onde o nosso navio atraca.

---

## 4. Métodos HTTP: As Ações do Navegador

Na web, uma URL não serve apenas para "abrir uma página". Cada requisição tem uma **intenção**, chamada de **Método HTTP**:

| Método | Significado | Exemplo no Mundo Real |
| :--- | :--- | :--- |
| **GET** | Buscar / Ler informações | *"Listar todos os piratas cadastrados"* |
| **POST** | Criar um novo registro | *"Cadastrar um novo pirata na tripulação"* |
| **PUT** | Atualizar todas as informações | *"Alterar nome, recompensa e bando de um pirata"* |
| **PATCH** | Atualizar apenas uma informação específica | *"Apenas mudar o status do pirata para capturado"* |
| **DELETE** | Excluir um registro | *"Remover um pirata do diário de bordo"* |

### Exemplo no Código:
```javascript
const server = http.createServer((request, response) => {
  const { method, url } = request

  if (method === 'GET' && url === '/piratas') {
    return response.end('Lista de Piratas: Luffy, Zoro')
  }

  if (method === 'POST' && url === '/piratas') {
    return response.end('Pirata criado com sucesso!')
  }

  // Se o marinheiro acessar uma rota que não existe:
  return response.writeHead(404).end('Rota nao encontrada!')
})
```

---

## 5. Códigos de Status HTTP (HTTP Status Codes)

Quando o servidor responde, ele envia um número de 3 dígitos dizendo se a viagem foi um sucesso ou se houve tempestade:

- **200 (OK):** Sucesso padrão (usado no `GET` e buscas).
- **201 (Created):** Recurso criado com sucesso (usado no `POST`).
- **204 (No Content):** Sucesso sem conteúdo no corpo (ideal para `DELETE` e `PUT`/`PATCH`).
- **400 (Bad Request):** Erro do cliente (ele esqueceu de preencher um campo obrigatório).
- **404 (Not Found):** Página ou recurso não encontrado no navio.
- **500 (Internal Server Error):** Erro interno no servidor (uma tábua quebrou no motor).

---

No próximo capítulo, você vai descobrir o que são **Streams e Buffers** e por que carregar arquivos grandes sem eles pode explodir a memória do seu computador!

👉 [Capítulo 02: Streams e Buffers na Prática](./02-streams-e-buffers-na-pratica.md)
