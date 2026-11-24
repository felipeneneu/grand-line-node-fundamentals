# 🦈 Missão 12: O Cofre Subterrâneo do Arlong Park (Transações Atômicas & Mutex Robusto)

> **Nível de Dificuldade:** 🔴 **HARD (Atomic Write via .tmp + rename, Fila Mutex & Prevenção de Corrupção)**  
> **Arco:** East Blue  
> **Recompensa ao Concluir:** + ฿ 50.000.000 Berries & Título: *"Lorde Supremo dos Fundamentos"*  
> **Restrição Rígida:** Apenas módulos nativos do Node.js (`node:http`, `node:fs/promises`, `node:crypto`).  

---

## 1. Visão Geral do Cenário
No topo do Arlong Park, os Homens-Peixe guardam o tesouro extorquido dos 20 vilarejos do East Blue: 100 milhões de Berries. O cofre precisa processar pagamentos de tributos e retiradas simultâneas de dezenas de capangas ao mesmo tempo. 

Se duas escritas concorrentes acontecerem no mesmo milissegundo ou se o servidor sofrer uma interrupção súbita no meio de uma gravação de arquivo, o banco `db-arlong.json` **NUNCA PODE FICAR CORROMPIDO**.

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [ ] **RF01:** Depositar tributo no cofre com descrição do vilarejo (`POST /tributos`).
- [ ] **RF02:** Sacar Berries do cofre (`POST /tributos/sacar`).
- [ ] **RF03:** Consultar o saldo total em Berries e o histórico de transações (`GET /cofre/saldo`).

### Regras de Negócio (RNs)
- [ ] **RN01:** Um depósito exige: `origem_vila` (string), `valor` (número positivo maior que 0).
- [ ] **RN02:** Um saque exige: `destino` (string), `valor` (número positivo).
- [ ] **RN03 (Integridade Financeira):** Se o valor de saque for maior do que o saldo total disponível no cofre, a transação deve ser abortada com **`400 Bad Request`** e a mensagem: `{ "erro": "Saldo insuficiente no cofre de Arlong." }`. O saldo jamais pode ficar negativo!
- [ ] **RN04:** Cada movimentação deve receber um UUID e timestamp UTC.

### Requisitos Não-Funcionais (RNFs) — *A Forja Inquebrável de Persistência*
- [ ] **RNF01 (Escrita Atômica - Atomic File Write):**
  - Nunca grave diretamente por cima de `db-arlong.json`.
  - Grave primeiro em um arquivo temporário com nome único (`db-arlong.json.tmp.<uuid>`).
  - Após a gravação completa e bem-sucedida do arquivo temporário, execute a operação atômica de renomear (`fs.rename()`) substituindo o arquivo final. Isso garante que mesmo se o servidor for desligado da tomada no meio da gravação, o arquivo original permanecerá íntegro!
- [ ] **RNF02 (Fila Mutex Encadeada por Promise):**
  - Múltiplas requisições simultâneas devem ser enfileiradas na memória. Uma escrita só é iniciada após o término da gravação anterior.
- [ ] **RNF03:** Tratamento resiliente de erro com status `500` e log semântico caso ocorra falha de I/O em disco.

---

## 3. Onde Desenvolver
Crie o servidor em: `missoes/12-cofre-arlong-park/src/server.js`
