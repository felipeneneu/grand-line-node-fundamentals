# 🎯 Missão 08: O Arsenal de Munições Especiais do Capitão Usopp

> **Nível de Dificuldade:** 🟡 **NORMAL (Operações Atômicas de Estoque & Regras de Integridade)**  
> **Arco:** East Blue  
> **Recompensa ao Concluir:** + ฿ 25.000.000 Berries  
> **Restrição Rígida:** Apenas módulos nativos do Node.js (`node:http`, `node:fs/promises`, `node:crypto`).  

---

## 1. Visão Geral do Cenário
Na oficina do Going Merry, Usopp inventa projéteis especiais para o seu estilingue Pachinko: Shuriken Stars, Fire Stars, Smoke Stars e Tabasco Stars. Usopp precisa controlar com precisão militar o estoque de munição para não ficar sem tiros no meio de uma batalha naval contra os homens-peixe.

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [ ] **RF01:** Cadastrar um novo tipo de projétil (`POST /municoes`).
- [ ] **RF02:** Listar todas as munições disponíveis com status de estoque (`GET /municoes`).
- [ ] **RF03:** Disparar/consumir uma quantidade de munição (`POST /municoes/:id/disparar`).
- [ ] **RF04:** Recarregar/produzir novas unidades de munição (`POST /municoes/:id/recarregar`).

### Regras de Negócio (RNs)
- [ ] **RN01:** Ao cadastrar: `nome`, `efeito` (ex: `"explosivo"`, `"incendiario"`, `"fumaça"`), `quantidade` (inteiro >= 0).
- [ ] **RN02 (Proteção contra Estoque Negativo):**
  - Na rota de disparo (`POST /municoes/:id/disparar`), o corpo recebe `{ "quantidade": X }`.
  - Se `X` for maior do que o estoque atual, a operação deve ser rejeitada com `400 Bad Request` e a mensagem: `{ "erro": "Estoque insuficiente para disparo." }`. O estoque não pode ficar negativo!
- [ ] **RN03:** Na recarga (`POST /municoes/:id/recarregar`), o valor recebido deve ser somado ao estoque atual.
- [ ] **RN04:** Salvar o histórico das alterações na propriedade `ultima_movimentacao_em` com carimbo ISO UTC.

### Requisitos Não-Funcionais (RNFs)
- [ ] **RNF01:** A mutação de estoque deve ocorrer de forma consistente na memória antes de disparar o `this.#persist()`.
- [ ] **RNF02:** Uso estrito de códigos semânticos: `200 OK` retornando o saldo atualizado, `400 Bad Request` para erros de negócio e `404 Not Found` para munição inexistente.

---

## 3. Onde Desenvolver
Crie o servidor em: `missoes/08-arsenal-usopp/src/server.js`
