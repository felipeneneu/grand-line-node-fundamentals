# 🍳 Missão 05: O Livro de Receitas do Going Merry

> **Nível de Dificuldade:** 🟢 **EASY (Validação de Tipos, Arrays em JSON & Atualização PATCH)**  
> **Arco:** East Blue  
> **Recompensa ao Concluir:** + ฿ 15.000.000 Berries  
> **Restrição Rígida:** Apenas módulos nativos do Node.js (`node:http`, `node:crypto`).  

---

## 1. Visão Geral do Cenário
Na cozinha do Going Merry, Sanji é rigoroso com o desperdício de comida. Luffy vive roubando mantimentos da despensa durante a madrugada. Sanji precisa de uma API para registrar as receitas da tripulação e atualizar a lista de ingredientes conforme eles acabam ou são reabastecidos.

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [ ] **RF01:** Cadastrar uma nova receita (`POST /receitas`).
- [ ] **RF02:** Listar todas as receitas cadastradas (`GET /receitas`).
- [ ] **RF03:** Atualizar parcialmente uma receita adicionando ou modificando ingredientes (`PATCH /receitas/:id`).
- [ ] **RF04:** Consultar uma única receita pelo seu ID (`GET /receitas/:id`).

### Regras de Negócio (RNs)
- [ ] **RN01:** Uma receita deve conter:
  - `id` (UUID v4)
  - `nome` (string)
  - `tempo_preparo_minutos` (número inteiro positivo)
  - `destinado_a` (string: ex: `"Luffy"`, `"Zoro"`, `"Nami"` ou `"Tripulação"`)
  - `ingredientes` (array de strings contendo no mínimo 1 ingrediente)
- [ ] **RN02:** No `PATCH /receitas/:id`, deve ser possível atualizar apenas o `tempo_preparo_minutos` ou a lista de `ingredientes`, preservando todos os demais dados intactos (Object Merging).
- [ ] **RN03:** Se o ID informado no `GET /receitas/:id` ou no `PATCH` não for localizado, responder `404 Not Found`.

### Requisitos Não-Funcionais (RNFs)
- [ ] **RNF01:** Parsing e validação manual do corpo da requisição sem frameworks.
- [ ] **RNF02:** Resposta de atualização com status `204 No Content` ou `200 OK` retornando a receita atualizada.

---

## 3. Onde Desenvolver
Crie o servidor em: `missoes/05-receitas-sanji/src/server.js`
