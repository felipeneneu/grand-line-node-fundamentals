# 🗺️ Missão 06: A Cartografia Náutica e Rotas da Nami

> **Nível de Dificuldade:** 🟡 **NORMAL (Rotas Dinâmicas Aninhadas & Persistência em Disco)**  
> **Arco:** East Blue  
> **Recompensa ao Concluir:** + ฿ 22.000.000 Berries  
> **Restrição Rígida:** Apenas módulos nativos do Node.js (`node:http`, `node:fs/promises`, `node:crypto`).  

---

## 1. Visão Geral do Cenário
Nami está desenhando o mapa completo do mundo. Ela precisa organizar os mapas por arquipélago e ilha, registrando as rotas de navegação seguras entre cada porto. Esta API precisa de suporte a **rotas dinâmicas com múltiplos parâmetros aninhados** e persistência permanente em arquivo JSON.

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [ ] **RF01:** Cadastrar uma nova ilha no mapa náutico (`POST /ilhas`).
- [ ] **RF02:** Cadastrar uma rota marítima específica para uma ilha (`POST /ilhas/:ilhaId/rotas`).
- [ ] **RF03:** Listar todas as rotas pertencentes a uma ilha específica (`GET /ilhas/:ilhaId/rotas`).
- [ ] **RF04:** Excluir uma rota marítima específica de uma ilha (`DELETE /ilhas/:ilhaId/rotas/:rotaId`).

### Regras de Negócio (RNs)
- [ ] **RN01:** Ao cadastrar uma ilha, os dados são: `nome`, `clima` (ex: `"tropical"`, `"invernal"`), `perigo` (escala 1 a 5).
- [ ] **RN02:** Ao cadastrar uma rota para a ilha (`ilhaId`), validar se a ilha existe no banco. Se não existir, responder `404 Not Found` com `{ "erro": "Ilha de destino não encontrada." }`.
- [ ] **RN03:** O roteamento dinâmico deve suportar **dois route params na mesma URL** (`:ilhaId` e `:rotaId`), extraídos via Expressão Regular.
- [ ] **RN04:** Todos os dados devem persistir no arquivo `db-nami.json` usando `node:fs/promises`.

### Requisitos Não-Funcionais (RNFs)
- [ ] **RNF01:** A função `buildRoutePath` deve ser adaptada para capturar múltiplos parâmetros dinâmicos na mesma URL sem conflito.
- [ ] **RNF02:** Persistência assíncrona não-bloqueante no disco.

---

## 3. Onde Desenvolver
Crie o servidor em: `missoes/06-cartografia-nami/src/server.js`
