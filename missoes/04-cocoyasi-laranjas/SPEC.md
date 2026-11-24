# 🍊 Missão 04: O Almoxarifado de Laranjas da Vila Cocoyasi

> **Nível de Dificuldade:** 🟢 **EASY (Query Params, Cálculos em Memória & Deleção Semântica)**  
> **Arco:** East Blue  
> **Recompensa ao Concluir:** + ฿ 12.000.000 Berries  
> **Restrição Rígida:** Apenas módulos nativos do Node.js (`node:http`, `node:crypto`).  

---

## 1. Visão Geral do Cenário
No pomar de laranjeiras de Bell-mère na Vila Cocoyasi, Nojiko e Nami precisam controlar as caixas de laranjas colhidas para abastecer a vila e juntar fundos. O sistema deve permitir cadastrar caixas, listar o total de quilos colhidos e remover caixas vendidas ou estragadas.

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [ ] **RF01:** Cadastrar um novo lote de laranjas (`POST /lotes`).
- [ ] **RF02:** Listar os lotes permitindo filtrar pelo tipo da laranja via query string (`GET /lotes?tipo=lima` ou `GET /lotes?tipo=pera`).
- [ ] **RF03:** Obter o relatório de peso total de laranjas disponíveis no armazém (`GET /lotes/resumo`).
- [ ] **RF04:** Dar baixa/remover um lote vendido (`DELETE /lotes/:id`).

### Regras de Negócio (RNs)
- [ ] **RN01:** O cadastro deve receber: `tipo` (string: `"lima"`, `"pera"` ou `"bahia"`), `quilos` (número positivo maior que 0) e `colhido_por` (string).
- [ ] **RN02:** A rota `GET /lotes/resumo` deve calcular e retornar:
  ```json
  {
    "total_lotes": 5,
    "peso_total_kg": 250,
    "media_por_lote": 50
  }
  ```
- [ ] **RN03:** Se o cliente tentar remover um lote com `id` inexistente no `DELETE /lotes/:id`, responder com status `404 Not Found`. Se existir e for removido com sucesso, responder estritamente com `204 No Content` sem corpo.

### Requisitos Não-Funcionais (RNFs)
- [ ] **RNF01:** Extração dinâmica de parâmetros de rota com Expressão Regular (`buildRoutePath`).
- [ ] **RNF02:** Resposta sempre com `Content-Type: application/json`.

---

## 3. Onde Desenvolver
Crie o servidor em: `missoes/04-cocoyasi-laranjas/src/server.js`
