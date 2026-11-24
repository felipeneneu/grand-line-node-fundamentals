# ⚔️ Missão 07: O Catálogo de Espadas de Tashigi e Zoro

> **Nível de Dificuldade:** 🟡 **NORMAL (Busca Flexível Indexada por Múltiplos Campos)**  
> **Arco:** East Blue  
> **Recompensa ao Concluir:** + ฿ 25.000.000 Berries  
> **Restrição Rígida:** Apenas módulos nativos do Node.js (`node:http`, `node:fs/promises`, `node:crypto`).  

---

## 1. Visão Geral do Cenário
A Segundo-Tenente Tashigi coleciona registros de todas as espadas célebres (Meito) do mundo para impedir que caiam em mãos de piratas gananciosos. Roronoa Zoro também quer catalogar espadas para encontrar as melhores lâminas. Eles precisam de uma API com um mecanismo de **busca indexada flexível por múltiplos parâmetros simultâneos** via query string.

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [ ] **RF01:** Cadastrar uma nova espada no catálogo (`POST /espadas`).
- [ ] **RF02:** Listar espadas com busca dinâmica indexada (`GET /espadas?search=wado` ou `GET /espadas?grau=O-Wazamono`).
- [ ] **RF03:** Atualizar o portador atual da espada (`PATCH /espadas/:id/portador`).
- [ ] **RF04:** Deletar uma espada quebrada/destruída (`DELETE /espadas/:id`).

### Regras de Negócio (RNs)
- [ ] **RN01:** Uma espada deve conter:
  - `id` (UUID v4)
  - `nome` (string: ex: `"Wado Ichimonji"`, `"Sandai Kitetsu"`, `"Yubashiri"`)
  - `grau` (string: `"Wazamono"`, `"Ryo-Wazamono"`, `"O-Wazamono"` ou `"Saijo-O-Wazamono"`)
  - `forjador` (string)
  - `portador` (string)
- [ ] **RN02 (Busca Indexada Dinâmica):**
  - Se o cliente enviar `?search=valor`, o sistema deve buscar registros onde `nome`, `grau` OU `forjador` contenham o termo pesquisado (busca case-insensitive, sem diferenciar maiúsculas e minúsculas).
  - Utilizar o padrão `Object.entries(search).some(...)` na camada de banco de dados.
- [ ] **RN03:** Não permitir cadastrar espadas sem `nome` ou `grau`. Retornar `400 Bad Request`.

### Requisitos Não-Funcionais (RNFs)
- [ ] **RNF01:** Leitura do arquivo `db-espadas.json` na inicialização do servidor e escrita assíncrona após mutações.
- [ ] **RNF02:** Extração de query strings com parser semântico nativo.

---

## 3. Onde Desenvolver
Crie o servidor em: `missoes/07-forja-espadas/src/server.js`
