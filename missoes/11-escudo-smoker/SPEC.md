# 💨 Missão 11: O Escudo de Fumaça do Capitão Smoker (Rate Limiting & DoS Protection)

> **Nível de Dificuldade:** 🔴 **HARD (Proteção contra DoS, Limite de Conexões por IP & Backpressure)**  
> **Arco:** East Blue  
> **Recompensa ao Concluir:** + ฿ 48.000.000 Berries  
> **Restrição Rígida:** Apenas módulos nativos do Node.js (`node:http`, `node:crypto`).  

---

## 1. Visão Geral do Cenário
O Capitão Smoker comeu a Moku Moku no Mi (Fruta da Fumaça) e consegue cobrir uma cidade inteira de névoa densa para interceptar invasores. Piratas mal-intencionados estão tentando sobrecarregar os servidores da delegacia de Loguetown disparando milhares de requisições por segundo e enviando corpos de requisições gigantescos para exaurir a memória do servidor.

Você deve implementar o **Escudo de Fumaça de Smoker**: um sistema de defesa nativo que protege a API contra abusos sem precisar de nenhum pacote npm externo.

---

## 2. Requisitos do Sistema

### Requisitos Funcionais (RFs)
- [ ] **RF01:** Rota militar protegida para emissão de salvo-conduto (`POST /salvo-conduto`).
- [ ] **RF02:** Rota pública de consulta de status da cidade (`GET /status-cidade`).

### Regras de Negócio (RNs)
- [ ] **RN01:** Um salvo-conduto exige: `capitao` (string), `navio` (string), `motivo` (string).

### Requisitos Não-Funcionais (RNFs) — *Defesa de Borda Nativa*
- [ ] **RNF01 (Rate Limiting Nativo em Memória por IP):**
  - O sistema deve monitorar o IP do cliente (`request.socket.remoteAddress`).
  - Cada IP tem direito a no máximo **5 requisições a cada janela de 10 segundos**.
  - Se o IP disparar a 6ª requisição dentro da janela de 10s, o servidor deve recusar imediatamente com o status **`429 Too Many Requests`** e o cabeçalho `Retry-After: 10`, sem processar nenhuma rota!
- [ ] **RNF02 (Corte Imediato de Stream por Tamanho):**
  - O corpo do `POST /salvo-conduto` não pode ultrapassar **10 KB**.
  - Se a stream ultrapassar 10 KB, o servidor deve abortar a conexão imediatamente com `request.destroy()` ou responder **`413 Payload Too Large`**.
- [ ] **RNF03 (Escudo Global de Exceções):**
  - Todo o ciclo de requisição deve estar envelopado em um tratador global de erros. Se qualquer função quebrar, devolver **`500 Internal Server Error`** em formato JSON estruturado.

---

## 3. Onde Desenvolver
Crie o servidor em: `missoes/11-escudo-smoker/src/server.js`
