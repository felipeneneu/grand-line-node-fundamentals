# 🕶️ Missão 09: O Registro de Ataques de Kuro e o Middleware de Métricas

> **Nível de Dificuldade:** 🟡 **NORMAL (Middlewares de Auditoria, Headers Customizados & Tempo de Resposta)**  
> **Arco:** East Blue  
> **Recompensa ao Concluir:** + ฿ 28.000.000 Berries  
> **Restrição Rígida:** Apenas módulos nativos do Node.js (`node:http`, `node:fs/promises`, `node:crypto`).  

---

## 1. Visão Geral do Cenário
O astuto Capitão Kuro planejou durante três anos o ataque à mansão da senhorita Kaya na Vila Syrup. Kuro é obcecado por pontualidade e velocidade: cada movimento deve ser cronometrado ao milissegundo. Ele quer uma API que registre os planos dos Piratas do Gato Preto e exija que **todas as requisições tenham seu tempo de resposta medido e estampado nos cabeçalhos de resposta**.

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [ ] **RF01:** Cadastrar uma nova estratégia de emboscada (`POST /estrategias`).
- [ ] **RF02:** Listar as estratégias ativas (`GET /estrategias`).
- [ ] **RF03:** Concluir uma estratégia marcando status como executada (`PATCH /estrategias/:id/executar`).

### Regras de Negócio (RNs)
- [ ] **RN01:** Ao cadastrar: `titulo`, `alvo`, `horario_previsto` e `status` (inicia como `"planejada"`).
- [ ] **RN02:** Ao executar (`PATCH`), alterar status para `"executada"` e gravar `executada_em` com a data atual.

### Requisitos Não-Funcionais (RNFs) — *O Foco do Haki*
- [ ] **RNF01 (Middleware de Logging e Latência):**
  - Implementar um middleware que registre no console a cada requisição: `[TIMESTAMP] METODO URL - STATUS (TEMPO ms)`.
  - Exemplo: `[2026-11-23T22:00:00Z] POST /estrategias - 201 (3ms)`.
- [ ] **RNF02 (Header Customizado de Tempo):**
  - O servidor deve estampar no cabeçalho de TODAS as respostas o header: `X-Response-Time: <tempo>ms` calculado com `performance.now()` ou `Date.now()`.
- [ ] **RNF03:** Persistência em disco no arquivo `db-kuro.json`.

---

## 3. Onde Desenvolver
Crie o servidor em: `missoes/09-vila-syrup-kuro/src/server.js`
