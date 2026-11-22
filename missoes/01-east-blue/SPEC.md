# ⚔️ Missão 01: O Sistema de Comandas do Restaurante Baratie

> **Arco:** East Blue (Fundamentos Nativos de Node.js)  
> **Requisito Prévio:** Concluir o módulo de Fundamentos (Streams, Buffers, Middlewares e persistência em arquivo).  
> **Recompensa ao Concluir:** + ฿ 30.000.000 Berries & Passaporte para a Grand Line  
> **Restrição Rígida:** **PROIBIDO** o uso de Express, Fastify ou qualquer framework externo. Apenas módulos nativos (`node:http`, `node:fs`, `node:crypto`, `node:buffer`).  
> **Status:** 🏆 **MISSÃO CUMPRIDA COM SUCESSO!**

---

## 1. Visão Geral do Produto
O Chefe Zeff precisa de um sistema rápido no terminal para gerenciar as comandas e pratos servidos no Restaurante Baratie enquanto piratas e marinheiros entram e saem sem parar. 

Como o restaurante fica no meio do mar e não possui conexão com serviços de nuvem complexos, todo o servidor deve rodar com ferramentas puras do Node.js, processando dados via streams e mantendo os pedidos salvos em um arquivo físico de disco para não perder o registro se o restaurante for atacado.

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [x] **RF01:** Deve ser possível criar um novo pedido (`POST /pedidos`).
- [x] **RF02:** Deve ser possível listar todos os pedidos ativos (`GET /pedidos`).
- [x] **RF03:** Deve ser possível buscar pedidos filtrando pelo nome do cliente ou status via query params (`GET /pedidos?status=preparando`).
- [x] **RF04:** Deve ser possível atualizar o status de um pedido para "entregue" (`PATCH /pedidos/:id/entregar`).
- [x] **RF05:** Deve ser possível cancelar/remover um pedido (`DELETE /pedidos/:id`).

### Regras de Negócio (RNs)
- [x] **RN01:** Um pedido deve conter obrigatoriamente: `id` (UUID único), `cliente` (string), `prato` (string), `mesa` (número), `status` (valores permitidos: `"pendente"`, `"preparando"`, `"entregue"`), `criado_em` (data ISO).
- [x] **RN02:** Se o cliente tentar criar um pedido sem `cliente` ou `prato`, o sistema deve recusar com status semântico adequado e mensagem de erro em JSON.
- [x] **RN03:** Ao cancelar ou atualizar um pedido com `id` inexistente, o sistema deve retornar `404 Not Found`.

### Requisitos Não-Funcionais (RNFs)
- [x] **RNF01:** A leitura do corpo da requisição (`body`) deve ser feita manipulando streams nativas (`ReadableStream` e `Buffer`).
- [x] **RNF02:** Os dados devem persistir fisicamente em um arquivo local (`db.json`) usando `node:fs/promises`.
- [x] **RNF03:** O servidor deve responder todas as requisições com os cabeçalhos apropriados (`Content-Type: application/json`).

---

## 3. Onde Desenvolver
Você criará sua solução dentro do diretório:
`missoes/01-east-blue/src/server.js`

Ao terminar, chame o Rayleigh no chat:  
> *"Rayleigh, concluí a Missão do Baratie! Pode fazer o Code Review completo."*
