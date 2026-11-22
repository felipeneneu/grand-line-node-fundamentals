# ⚙️ Capítulo 03: Middlewares e Tratamento de JSON

> *"Um bom navegador nunca mistura a comida com a pólvora no mesmo convés. Cada tripulante tem uma função clara."* — Silvers Rayleigh

Quando construímos uma API moderna, o cliente (navegador, aplicativo mobile) costuma nos enviar dados no formato **JSON** (JavaScript Object Notation):

```json
{
  "nome": "Luffy",
  "recompensa": 1500000000,
  "tripulacao": "Chapeu de Palha"
}
```

Neste capítulo, você vai aprender o que é um **Middleware** e como tratar essa entrada sem quebrar o servidor se o cliente mandar dados vazios.

---

## 1. O Que é um Middleware?

Um **Middleware** é um interceptador. Ele fica no meio do caminho entre o momento em que a requisição bate no servidor e o momento em que a rota final é executada.

```
 [ REQUISIÇÃO ] ──► [ MIDDLEWARE: json() ] ──► [ ROTA: POST /piratas ] ──► [ RESPOSTA ]
  (Chega do Mar)     - Lê as Streams            - Lê req.body limpo         (201 Created)
                     - Faz parse do JSON        - Salva no banco
                     - Seta cabeçalho JSON
```

---

## 2. Construindo o Middleware `json.js`

Em vez de repetir a leitura de streams em todas as rotas do seu sistema, nós isolamos essa responsabilidade em um arquivo dedicado: `src/middlewares/json.js`.

Veja o código real passo a passo:

```javascript
// src/middlewares/json.js
export async function json(request, response) {
  const buffers = []

  // 1. Coleta todos os chunks que chegam pela stream da requisição
  for await (const chunk of request) {
    buffers.push(chunk)
  }

  // 2. Tenta converter os bytes em um Objeto JavaScript real
  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    // Se a requisição veio vazia (ex: um GET), não quebra o navio!
    request.body = null
  }

  // 3. Avisa ao cliente que todas as respostas serão em formato JSON
  response.setHeader('Content-Type', 'application/json')
}
```

---

## 3. Por Que o `try / catch` é Obrigatório Aqui?

Se você tentar executar:
```javascript
JSON.parse("") // String vazia!
```

O JavaScript dispara um erro fatal:
`SyntaxError: Unexpected end of JSON input`!

Se você não tiver o bloco `try/catch`, qualquer requisição `GET` (que não envia corpo) ou qualquer requisição com formato inválido **vai derrubar o seu servidor na hora**!

Com o `try/catch`:
- Se o JSON for válido: `request.body` vira um objeto `{ nome: 'Luffy' }`.
- Se o corpo estiver vazio ou inválido: o erro é capturado com segurança e `request.body = null`.

---

## 4. Como Usar o Middleware no `server.js`

No seu arquivo principal, basta chamar a função antes de consultar as rotas:

```javascript
import http from 'node:http'
import { json } from './middlewares/json.js'

const server = http.createServer(async (request, response) => {
  // Executa o middleware primeiro!
  await json(request, response)

  // Agora request.body já está pronto para ser usado!
  console.log(request.body)

  return response.writeHead(200).end()
})

server.listen(3333)
```

No próximo capítulo, você vai aprender a **persistir** esses dados em um banco de dados em arquivo para que eles não sumam quando o servidor reiniciar!

👉 [Capítulo 04: Persistência em Disco e UUIDs](./04-persistencia-em-disco-e-uuid.md)
