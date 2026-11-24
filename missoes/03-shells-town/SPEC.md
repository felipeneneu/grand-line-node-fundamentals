# 🎯 Missão 03: Os Cartazes de Procurado da Marinha em Shells Town

> **Nível de Dificuldade:** 🟢 **EASY (Fundamentos Puros de HTTP & Semântica)**  
> **Arco:** East Blue  
> **Recompensa ao Concluir:** + ฿ 10.000.000 Berries  
> **Restrição Rígida:** Apenas módulos nativos do Node.js (`node:http`, `node:crypto`).  

---

## 1. Visão Geral do Cenário
Na base da Marinha em Shells Town, o Tenente Morgan comanda com punho de ferro. Ele precisa de um serviço HTTP simples e rápido para registrar novos piratas avistados e emitir seus cartazes de procurado com recompensa oficial.

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [ ] **RF01:** Registrar um novo cartaz de pirata procurado (`POST /procurados`).
- [ ] **RF02:** Listar todos os piratas cadastrados (`GET /procurados`).
- [ ] **RF03:** Buscar piratas por status de captura via query parameter (`GET /procurados?capturado=true` ou `false`).

### Regras de Negócio (RNs)
- [ ] **RN01:** O corpo da requisição do `POST /procurados` deve conter obrigatoriamente:
  - `nome` (string, não vazia)
  - `recompensa` (número inteiro positivo)
  - `bando` (string, opcional — se não fornecido, assumir `"Desconhecido"`)
- [ ] **RN02:** Ao cadastrar, gerar um identificador único criptográfico `id` via `crypto.randomUUID()`, definir `capturado: false` e a data de emissão `emitido_em` com a data/hora atual em formato ISO 8601 UTC.
- [ ] **RN03:** Se `nome` ou `recompensa` não forem enviados ou forem inválidos, responder com status `400 Bad Request` e `{ "erro": "Campos obrigatórios ausentes ou inválidos." }`.

### Requisitos Não-Funcionais (RNFs)
- [ ] **RNF01:** Utilizar exclusivamente o módulo nativo `node:http`.
- [ ] **RNF02:** O servidor deve responder todas as requisições com o cabeçalho `Content-Type: application/json`.
- [ ] **RNF03:** Responder com status semântico estrito: `201 Created` no cadastro e `200 OK` na listagem.

---

## 3. Onde Desenvolver
Crie o servidor em: `missoes/03-shells-town/src/server.js`
Ao terminar, chame o Rayleigh para o Code Review!
