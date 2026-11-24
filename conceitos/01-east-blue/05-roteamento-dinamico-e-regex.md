# 🧭 Conceito 05: Roteamento Dinâmico com Expressões Regulares (RegExp)

## 1. A Dor do Mundo Real (O Porquê)
Em qualquer API REST, as URLs contêm dados dinâmicos:
- Identificadores de recurso nos caminhos: `/pedidos/3b1f52d9-c089-45f8-b3ff-7e4871032dfa`
- Parâmetros de busca e paginação na query string: `/pedidos?status=preparando&page=2`

Se você tentar fazer isso com comparações literais simples:
```javascript
// ❌ O Pesadelo das Rotas Estáticas
if (url === '/pedidos/1') { ... }
if (url === '/pedidos/2') { ... }
```
Você precisaria prever todos os IDs do universo! Se tentar usar `url.split('/')`, o código fica frágil, quebrando quando barras extras ou query parameters são inseridos.

---

## 2. A Mecânica da Solução com Regex
A técnica utilizada em frameworks modernos (como Express e Fastify) consiste em compilar a rota declarativa em uma **Expressão Regular** no momento da inicialização:

Transformamos:
`/pedidos/:id`

Na seguinte Expressão Regular:
```javascript
const routeParametersRegex = /:([a-zA-Z]+)/g;
const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9-_]+)');
const routeRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
```

### O Poder dos Grupos de Captura Nomeados:
O recurso `(?<nome_do_grupo>...)` do ECMAScript permite que a regex não apenas teste se a URL combina, mas devolva um objeto pronto com os nomes das variáveis preenchidos no `groups`:

```javascript
const match = request.url.match(routeRegex);
// match.groups => { id: '3b1f52d9-c089-45f8-b3ff-7e4871032dfa', query: '?status=preparando' }
```

---

## 3. A Metáfora de One Piece
> Imagine navegar na Grand Line sem uma bússola mágica.
> 
> Uma bússola comum aponta para o Norte fixo. Isso é a string estática (`if (url === '/users')`). Se a ilha se mover ou tiver uma coordenada desconhecida, você nunca chega.
> 
> O roteador com Expressão Regular é o **Log Pose da Nami**: ele sente o campo magnético da ilha de destino. Não importa se a ilha se chama Ilha dos Tritões ou Punk Hazard (se o `:id` for `123` ou um UUID de 36 caracteres); a agulha oscila, reconhece o padrão magnético e trava na coordenada correta.

---

## 4. Onde o Código Nativo Pode Ser Melhorado
- **Performance de Casamento (Radix Tree vs Regex):** Quando você tem 500 rotas, testar uma por uma em um loop (`routes.find(...)`) é linear $O(n)$. Frameworks ultra-rápidos como Fastify compilam as rotas em uma estrutura de dados chamada **Árvore Radix (Radix Tree / Trie)**, encontrando a rota em tempo praticamente constante $O(1)$.
- **Sanitização de Query Strings:** O parser de query params simples pode quebrar com caracteres especiais codificados em URL (como `%20` para espaços ou acentos). Usar a API nativa `new URLSearchParams()` garante a decodificação perfeita dos parâmetros.

---

## 5. Como Comandar IAs Generativas com Este Conceito
**O Prompt de Mestre:**
> *"Implemente uma função utilitária em Node.js nativo para compilação de rotas REST dinâmicas (`buildRoutePath`). A função deve aceitar caminhos com parâmetros nomeados (ex: `/recursos/:id/detalhes`) e convertê-los em uma `RegExp` utilizando grupos de captura nomeados do ECMAScript. A regex deve aceitar opcionalmente query strings no final da URL e garantir correspondência exata do início ao fim da linha (`^...$`)."*
