# 📦 Capítulo 02: Streams e Buffers na Prática

> *"Nunca tente carregar dez mil barris nas costas de uma só vez. Instale uma esteira rolante."* — Silvers Rayleigh

Um dos maiores diferenciais do Node.js em relação a outras linguagens é o suporte nativo a **Streams** e **Buffers**. Se você entender este capítulo, você estará à frente de 80% dos desenvolvedores júnior do mercado.

---

## 1. O Problema da Memória RAM

Imagine que um usuário quer subir um vídeo de 1 Gigabyte para o seu servidor.

### O Jeito Ingênuo (Sem Streams):
O servidor tenta receber o arquivo inteiro, aloca 1 Gigabyte direto na memória RAM e só aí começa a processar.  
Se 10 usuários enviarem o vídeo no mesmo segundo: `10 x 1GB = 10GB de RAM ocupados`!  
O servidor esgota a memória e **cai instantaneamente** (`Process out of memory`).

### O Jeito Inteligente com Streams:
O arquivo é lido e enviado aos pedaços pequenos chamados **Chunks** (ex: 64 Kilobytes por pedaço). O servidor processa o pedaço que acabou de chegar, libera a memória e espera o próximo. A memória RAM nunca se esgota!

---

## 2. A Metáfora dos Barris e da Esteira

```
   [ NAVIO NO CAIS ]              [ A ESTEIRA (STREAM) ]             [ O ARMAZÉM ]
  (Arquivo no Cliente)                                              (Nosso Servidor)
        ┌───┐                       ┌───┐      ┌───┐                    ┌───┐
        │   │ ────────► ───────►    │   │ ───► │   │ ───────► ────────► │   │
        └───┘                       └───┘      └───┘                    └───┘
     1.000 Barris                Chunk #1   Chunk #2                 Processando
      (Dados Brutos)                                                 aos pedaços
```

- **Chunk:** É cada barril individual que desce pela esteira.
- **Buffer:** É o espaço físico da madeira do barril (bytes puros na memória).
- **Stream:** É a esteira rolante em movimento constante.

---

## 3. O Que é um Buffer?

O computador não entende letras como `"Luffy"`. Ele entende números binários (`0` e `1`).  
O Node.js agrupa esses números em formato hexadecimal (Base 16). Um **Buffer** é uma porção de memória que armazena esses bytes brutos.

Faça o teste no seu terminal executando `node`:

```javascript
const buffer = Buffer.from("Luffy")

console.log(buffer)
// Saída: <Buffer 4c 75 66 66 79>
```

Cada par de caracteres (`4c`, `75`, `66`, `66`, `79`) representa uma letra da palavra "Luffy" na tabela ASCII!

E para transformar de volta em texto humano:
```javascript
console.log(buffer.toString())
// Saída: "Luffy"
```

---

## 4. O HTTP Nativo do Node é uma Stream!

No Node.js:
- O objeto **`request`** (o que o cliente envia) é uma **Readable Stream** (Stream de Leitura).
- O objeto **`response`** (o que nós respondemos) é uma **Writable Stream** (Stream de Escrita).

Quando o cliente envia dados no corpo da requisição (`POST`), esses dados chegam aos pedaços. Como juntamos todos os pedaços para ler o texto completo?

```javascript
// Criamos uma lista para guardar os pedaços que vão chegando
const buffers = []

// O 'for await' escuta a esteira e puxa cada pedaço (chunk) assim que ele chega
for await (const chunk of request) {
  buffers.push(chunk)
}

// Concatena todos os pedaços e converte para string
const corpoCompleto = Buffer.concat(buffers).toString()

console.log(corpoCompleto)
```

No próximo capítulo, veremos como transformar essa leitura de streams em um **Middleware reutilizável** que converte texto em formato **JSON** automaticamente!

👉 [Capítulo 03: Middlewares e Tratamento de JSON](./03-middlewares-e-tratamento-json.md)
