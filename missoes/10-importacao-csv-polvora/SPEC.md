# 💣 Missão 10: A Importação Massiva de Pólvora via Streams Nativas

> **Nível de Dificuldade:** 🔴 **HARD (Streams Puras, Chunks, Leitura de CSV sem Dependências)**  
> **Arco:** East Blue  
> **Recompensa ao Concluir:** + ฿ 45.000.000 Berries  
> **Restrição Rígida:** **PROIBIDO** o uso de `csv-parser` ou qualquer lib externa! Use apenas `node:http`, `node:fs`, `node:readline` e `node:stream`.  

---

## 1. Visão Geral do Cenário
Um galeão mercante naufragou próximo aos rochedos do East Blue e centenas de caixas de pólvora foram resgatadas. A Marinha gerou um arquivo bruto `polvora.csv` contendo 10.000 linhas de registros de munições. 

Se você tentar carregar esse CSV inteiro para a memória com `fs.readFile()` para depois fazer `.split('\n')`, o servidor travará com sobrecarga de RAM. Você deve construir uma API que recebe um upload via stream HTTP e processa o CSV linha a linha em tempo real!

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [ ] **RF01:** Rota para envio e processamento do arquivo CSV (`POST /importar-polvora`).
- [ ] **RF02:** Listar os lotes de pólvora importados com paginação manual (`GET /polvora?page=1&limit=10`).
- [ ] **RF03:** Obter o total de pólvora importada e o número de linhas processadas (`GET /polvora/resumo`).

### Regras de Negócio (RNs)
- [ ] **RN01:** O arquivo CSV possui o seguinte formato de cabeçalho:
  ```csv
  lote,quilos,fabricante,grau_explosivo
  LOTE-001,50,Oficina de Loguetown,A
  LOTE-002,120,Estaleiro de Water 7,S
  ```
- [ ] **RN02:** Durante a leitura do arquivo pela stream, cada linha deve ser convertida em um objeto JSON válido, gerando um `id` via `crypto.randomUUID()`.
- [ ] **RN03:** Linhas vazias ou sem campos obrigatórios devem ser ignoradas sem interromper o processamento das linhas seguintes.

### Requisitos Não-Funcionais (RNFs) — *A Prova dos Mestres de Streams*
- [ ] **RNF01 (Processamento em Chunks com `node:readline`):**
  - O processamento DEVE utilizar `node:readline/promises` ou uma `TransformStream` customizada acoplada diretamente à `request` stream.
  - É proibido carregar o CSV completo na memória RAM antes de processar.
- [ ] **RNF02 (Persistência em Lote / Batch Write):**
  - Não chame o disco a cada linha processada! Acumule os registros em blocos ou persista ao final da stream (`request.on('end')` ou término do `for await`).
- [ ] **RNF03:** Resposta final com status `201 Created` retornando:
  ```json
  { "mensagem": "Importação concluída com sucesso!", "total_processado": 10000 }
  ```

---

## 3. Onde Desenvolver
Crie o servidor em: `missoes/10-importacao-csv-polvora/src/server.js`
