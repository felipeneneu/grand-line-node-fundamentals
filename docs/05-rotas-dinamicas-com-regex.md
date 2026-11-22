# 🧭 Capítulo 05: Rotas Dinâmicas e Expressões Regulares (RegEx)

> *"O Log Pose não aponta apenas para uma pedra fixa; ele detecta o campo magnético invisível na água."* — Silvers Rayleigh

Quando você cria rotas como:
- `GET /piratas`
- `POST /piratas`

Comparar a URL é muito fácil: basta fazer `if (url === '/piratas')`.

Mas e quando você precisa **deletar ou atualizar um pirata específico**?  
A URL precisa carregar o identificador único daquele pirata:
- `DELETE /piratas/f40707c1-2332-4bb7-a20a-b74fc88a20c0`
- `PUT /piratas/f40707c1-2332-4bb7-a20a-b74fc88a20c0`

Como o nosso servidor descobre qual rota executar se o ID que vem na URL muda a cada requisição? Com **Expressões Regulares (RegEx)**!

---

## 1. Os 3 Tipos de Parâmetros na Web

Memorize esta tabela para o resto da sua carreira de backend:

| Tipo | Onde fica? | Para que serve? | Exemplo |
| :--- | :--- | :--- | :--- |
| **Route Params** | No caminho da URL | Identificar um recurso único | `/piratas/:id` |
| **Query Params** | No final da URL (após `?`) | Filtros, busca e paginação (opcionais) | `/piratas?search=Luffy&pagina=2` |
| **Request Body** | No corpo oculto da requisição | Dados ricos para criar/editar recursos | `{ "nome": "Zoro" }` |

---

## 2. Construindo o Utilitário `buildRoutePath`

Nós criamos uma função que pega uma rota genérica (ex: `/piratas/:id`) e a transforma em uma **Expressão Regular** capaz de identificar o ID e qualquer parâmetro de busca:

```javascript
// src/utils/build-route-path.js
export function buildRoutePath(path) {
  // 1. Procura por qualquer palavra que comece com dois pontos (ex: :id)
  const routeParametersRegex = /:([a-zA-Z]+)/g

  // 2. Substitui por um grupo de captura nomeado do Regex (?<id>[a-z0-9-_]+)
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\\-_]+)')

  // 3. Permite também capturar query parameters no final da URL (?search=...)
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
```

---

## 3. Como Isso Funciona no `server.js`?

Quando o cliente acessa `DELETE /piratas/f40707c1`:

1. O servidor testa a URL contra o Regex da rota:
   ```javascript
   const route = routes.find(route => {
     return route.method === method && route.path.test(url)
   })
   ```
2. Se der positivo, extraímos os parâmetros com `match()`:
   ```javascript
   const routeParams = request.url.match(route.path)
   
   // routeParams.groups terá: { id: "f40707c1", query: undefined }
   request.params = routeParams.groups
   ```
3. O seu handler recebe `request.params.id` limpo e pronto para deletar ou atualizar no banco!

---

## 4. O Roteador Modular `routes.js`

Em vez de encher o `server.js` com dezenas de `if/else`, colocamos todas as rotas em uma lista organizada:

```javascript
// src/routes.js
export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/piratas'),
    handler: (req, res) => {
      const piratas = database.select('piratas')
      return res.writeHead(200).end(JSON.stringify(piratas))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/piratas/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const deletado = database.delete('piratas', id)

      if (!deletado) {
        return res.writeHead(404).end(JSON.stringify({ message: "Pirata não encontrado." }))
      }

      return res.writeHead(204).end()
    }
  }
]
```

---

## 🏆 Você Dominou os Fundamentos do East Blue!

Agora que você entendeu:
- Como criar um servidor HTTP puro (`node:http`).
- Como ler requisições com Streams e Buffers.
- Como tratar dados em JSON com middlewares.
- Como persistir em disco com `node:fs` e `randomUUID()`.
- Como rotear requisições dinâmicas com Regex.

É hora de provar o seu valor e construir sua primeira aplicação completa sozinho na **Boss Fight do Baratie**!

👉 [Abrir a Especificação da Missão: Baratie SPEC.md](../missoes/01-east-blue/SPEC.md)
