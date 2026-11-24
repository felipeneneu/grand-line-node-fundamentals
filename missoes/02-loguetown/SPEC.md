# ⚔️ Missão 02: O Arsenal de Loguetown & O Bloqueio do Capitão Smoker

> **Arco:** East Blue (Desafio Avançado de Engenharia Nativa)  
> **Local:** Loguetown — A Cidade do Começo e do Fim  
> **Requisito Prévio:** Ter completado a Missão 01 (Baratie) e compreendido o perigo de concorrência e sobrecarga de memória.  
> **Recompensa ao Concluir:** + ฿ 40.000.000 Berries & Título: *"Artífice do Casco Blindado"*  
> **Restrição Inegociável:** **ZERO DEPENDÊNCIAS EXTERNAS.** Apenas módulos nativos (`node:http`, `node:fs/promises`, `node:crypto`, `node:buffer`, `node:stream`).  
> **Status:** ⏳ **MISSÃO LANÇADA! AGUARDANDO IMPLEMENTAÇÃO DO APRENDIZ**

---

## 1. Visão Geral do Cenário de Batalha
Antes de cruzar a Reverse Mountain rumo à Grand Line, o bando precisa reabastecer os armamentos no porto militar de Loguetown. Porém, o Capitão Smoker e os fuzileiros da Marinha monitoram todas as comunicações da ilha.

Para evitar interceptações, você deve construir o **Sistema de Controle de Arsenal e Cargas de Loguetown**. 

Diferente do sistema do Baratie (que era apenas um CRUD básico de pedidos), este sistema lida com operações sob ataque de concorrência, risco de sobrecarga de dados por espiões da Marinha e regras rigorosas de integridade de estado militar.

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [ ] **RF01:** Registrar um novo lote de armamento/suprimento (`POST /arsenal`).
- [ ] **RF02:** Listar os armamentos com suporte a múltiplos filtros combinados via query parameters (`GET /arsenal?tipo=canhao&status=disponivel`).
- [ ] **RF03:** Obter o inventário sumarizado do arsenal (`GET /arsenal/metricas`), retornando: total de itens, quantidade por status e data da última alteração.
- [ ] **RF04:** Atualizar o ciclo de vida do armamento com ação semântica:
  - Alocar armamento para uma embarcação (`PATCH /arsenal/:id/alocar`).
  - Marcar como avariado/inspecionado (`PATCH /arsenal/:id/avariar`).
- [ ] **RF05:** Baixar/remover permanentemente um item do inventário militar (`DELETE /arsenal/:id`).

### Regras de Negócio (RNs)
- [ ] **RN01:** O payload de criação (`POST /arsenal`) deve exigir:
  - `nome` (string, mín. 3 caracteres)
  - `tipo` (string: `"arma"`, `"municao"` ou `"provisao"`)
  - `quantidade` (número inteiro positivo maior que 0)
  - `calibre` ou `peso` (opcional, dependendo do tipo)
- [ ] **RN02 (Validação Estrita de Entrada):** Se qualquer campo obrigatório estiver ausente ou inválido (ex: `quantidade` negativa ou texto vazio), retornar `400 Bad Request` com lista detalhada dos erros no formato `{ "erros": [ "..." ] }`.
- [ ] **RN03 (Máquina de Estados Finita):** O ciclo de vida do status deve obedecer estritamente a estas regras:
  - Ao criar: status inicial sempre `"disponivel"`.
  - De `"disponivel"` pode ir para `"alocado"` ou `"avariado"`.
  - Um item `"avariado"` NÃO pode ser diretamente alocado; retornar `400 Bad Request` informando a impossibilidade de negócio.
- [ ] **RN04 (Identificadores Criptográficos):** Todo item deve receber um `id` gerado via `crypto.randomUUID()` e os carimbos de tempo `criado_em` e `atualizado_em` em formato ISO 8601 UTC.
- [ ] **RN05 (Resposta Silenciosa de Exclusão):** Ao deletar ou alterar item inexistente, responder estritamente com `404 Not Found`.

### Requisitos Não-Funcionais (RNFs) — *A Prova de Fogo do Haki*
- [ ] **RNF01 (Blindagem de Payload / DoS Protection):** O middleware de recepção de JSON deve impor um **limite máximo de 50 KB** para o corpo da requisição. Se a stream de dados ultrapassar 50 KB, o servidor deve interromper imediatamente a recepção e devolver `413 Payload Too Large`.
- [ ] **RNF02 (Resiliência a Concorrência / Fila de Escrita Assíncrona):** O arquivo de persistência (`db-loguetown.json`) NÃO pode sofrer com condições de corrida. A classe de banco de dados deve implementar uma **fila de gravação sequencial (Mutex por Promise)** garantindo que gravações disparadas simultaneamente aconteçam uma após a outra sem corrupção.
- [ ] **RNF03 (Escudo de Exceções Não Tratadas):** O servidor deve conter um bloco global de contenção de erros (`try/catch` na borda da requisição no `server.js`). Nenhuma falha interna não tratada pode derrubar o processo do Node; deve responder `500 Internal Server Error` com payload JSON padronizado.

---

## 3. Onde Desenvolver
Você desenvolverá todo o código dentro do diretório:
`missoes/02-loguetown/src/`

Estrutura sugerida de arquivos:
```
missoes/02-loguetown/
├── SPEC.md                      <- Esta especificação
├── README.md                    <- Instruções de execução e testes
└── src/
    ├── server.js                <- Entrada do servidor HTTP puro
    ├── routes.js                <- Roteador com regex
    ├── database.js              <- Banco nativo com proteção de concorrência
    ├── middlewares/
    │   └── json.js              <- Middleware com limite de 50KB
    └── utils/
        ├── build-route-path.js
        └── extract-query-params.js
```

Quando estiver pronto e todos os testes forem executados com sucesso, chame o Rayleigh:
> *"Rayleigh, o Arsenal de Loguetown está forjado e pronto para auditoria!"*
