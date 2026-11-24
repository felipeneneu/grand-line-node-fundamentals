# 🏰 Missão 02: Loguetown — Instruções de Execução e Testes

Bem-vindo a Loguetown, marujo! Aqui a brincadeira ficou séria. Esta missão não é uma cópia da aula: ela exige a aplicação real de engenharia de software para resolver problemas de concorrência, limite de payload e validação estrita.

---

## 🚀 Como Iniciar o Desenvolvimento

1. Navegue até a pasta da missão:
   `missoes/02-loguetown/src/`
2. Implemente os arquivos de acordo com o [SPEC.md](./SPEC.md).
3. Para iniciar o seu servidor:
   ```bash
   node missoes/02-loguetown/src/server.js
   ```
   *(Recomenda-se rodar na porta 3334 para não conflitar com a missão do Baratie na 3333).*

---

## 🧪 Roteiro de Testes Recomendado (Via cURL / PowerShell / HTTP Client)

### 1. Criar um armamento com sucesso (`201 Created`):
```bash
curl -X POST http://localhost:3334/arsenal \
  -H "Content-Type: application/json" \
  -d '{"nome": "Canhão de Bronze 12 Libras", "tipo": "arma", "quantidade": 4}'
```

### 2. Testar validação de campos obrigatórios (`400 Bad Request`):
```bash
curl -X POST http://localhost:3334/arsenal \
  -H "Content-Type: application/json" \
  -d '{"nome": "AB", "tipo": "invalido", "quantidade": -5}'
```
*Deve retornar array com a lista dos 3 erros de validação.*

### 3. Testar a Blindagem de Payload (`413 Payload Too Large`):
Envie um payload JSON com mais de 50 KB de texto para o `POST /arsenal`. O servidor deve rejeitar antes de parsear!

### 4. Testar métricas e inventário (`GET /arsenal/metricas`):
```bash
curl http://localhost:3334/arsenal/metricas
```

### 5. Transição de estados proibida:
Tentar alocar um armamento avariado deve retornar `400 Bad Request`.
