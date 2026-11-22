# 📜 Caderno de Bordo: Capítulo 04 — A Bússola das Rotas: Route & Query Parameters

> **Instrução para o Aprendiz:** Abra o seu caderno físico na **Página Esquerda** e copie o quadro fechado abaixo.  
> Na **Página Direita**, anote a anatomia completa de uma URL HTTP.

---

```text
+-------------------------------------------------------------------------+
| DATA: 22/11/2026   | ARCO: East Blue   | TEMA: Rotas, Regex e Parâmetros|
+-------------------------------------------------------------------------+
| 1. OS 3 TIPOS DE PARÂMETROS NO BACKEND (MEMORIZE!)                      |
| -> ROUTE PARAMS: /pirates/:id -> Identifica um recurso único.           |
| -> QUERY PARAMS: /pirates?search=Luffy&page=1 -> Filtros e paginação.   |
| -> REQUEST BODY: Dados complexos no corpo da requisição (POST / PUT).   |
+-------------------------------------------------------------------------+
| 2. A METÁFORA DE ONE PIECE                                              |
| -> Route Param (:id): É o Cartaz de Procurado com a foto de um pirata.  |
| -> Query Param (?search=): É a ordem dada ao vigia no topo do mastro:    |
|    "Aviste todos os navios que tenham a bandeira dos Chapéus de Palha!" |
| -> Regex (buildRoutePath): O Log Pose que guia o navio para a ilha      |
|    certa mesmo com coordenadas variáveis na água.                       |
+-------------------------------------------------------------------------+
| 3. O FLUXO DO ROTEADOR NATIVO (DESENHE NO PAPEL)                        |
|                                                                         |
|   GET /pirates?search=Zoro                                              |
|        │                                                                |
|        ▼                                                                |
|   ┌─────────────────────────────────────────────────────────────┐       |
|   │ 1. buildRoutePath('/pirates')                               │       |
|   │    Gera Regex: ^/pirates(?<query>\?(.*))?$                  │       |
|   └──────────────────────────────┬──────────────────────────────┘       |
|                                  │                                      |
|                                  ▼                                      |
|   ┌─────────────────────────────────────────────────────────────┐       |
|   │ 2. request.url.match(route.path)                            │       |
|   │    Extrai: routeParams.groups.query = '?search=Zoro'        │       |
|   └──────────────────────────────┬──────────────────────────────┘       |
|                                  │                                      |
|                                  ▼                                      |
|   ┌─────────────────────────────────────────────────────────────┐       |
|   │ 3. extractQueryParams('?search=Zoro')                       │       |
|   │    Transforma em Objeto: { search: 'Zoro' }                 │       |
|   └──────────────────────────────┬──────────────────────────────┘       |
|                                  │                                      |
|                                  ▼                                      |
|   ┌─────────────────────────────────────────────────────────────┐       |
|   │ 4. route.handler(req, res)                                  │       |
|   │    Acessa: req.params e req.query limpos e prontos!         │       |
|   └─────────────────────────────────────────────────────────────┘       |
|                                                                         |
+-------------------------------------------------------------------------+
| 4. LIÇÃO DE SANGUE (CICATRIZ DE GUERRA)                                 |
| ⚠️ O CONEXÃO HANGING NO DELETE:                                         |
|    Fazer 'response.writeHead(204)' SEM '.end()' deixa a conexão         |
|    aberta para sempre! O cliente HTTP nunca recebe resposta e trava.   |
|    REGRA: Todo fluxo de resposta HTTP DEVE terminar com .end()!        |
+-------------------------------------------------------------------------+
```
