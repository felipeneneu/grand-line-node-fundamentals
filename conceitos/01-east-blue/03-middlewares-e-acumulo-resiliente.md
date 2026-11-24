# 🛡️ Conceito 03: Middlewares Nativos e Blindagem de Payload

## 1. A Dor do Mundo Real (O Porquê)
Em uma aplicação HTTP, o corpo (`body`) de uma requisição `POST` ou `PUT` chega em pedaços de bytes picados pela rede TCP. Se você tentar rodar `JSON.parse()` no primeiro pedaço, ele é apenas metade do JSON (ex: `{"tit`). A aplicação quebra com `SyntaxError`.

Além disso, existe um perigo mortal de segurança: o **Ataque de Denegação de Serviço por Payload Gigante (DoS via Memory Inflation)**. Se um cliente malicioso começar a enviar 2 GB de dados no corpo de um POST sem parar, e seu servidor continuar acumulando esses buffers na memória sem checar o tamanho, seu servidor entrará em colapso.

---

## 2. A Mecânica do Middleware Nativo
Um middleware é uma função que intercepta o ciclo de vida da requisição antes que ela atinja a rota de negócio:

```javascript
export async function json(request, response) {
  const buffers = [];
  let totalBytes = 0;
  const MAX_BYTES = 1024 * 1024; // Limite de segurança: 1 MB

  for await (const chunk of request) {
    totalBytes += chunk.length;
    if (totalBytes > MAX_BYTES) {
      response.writeHead(413, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Payload Too Large' }));
      return;
    }
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    request.body = null;
  }

  response.setHeader('Content-Type', 'application/json');
}
```

1. **`for await ... of`:** Consome a stream de entrada de forma assíncrona respeitando o fluxo natural dos pacotes de rede.
2. **`Buffer.concat(buffers)`:** Aloca um único buffer com o tamanho exato da soma dos pedaços e copia os dados binários com máxima eficiência de memória.
3. **`try / catch`:** Se o cliente enviou um JSON quebrado (ex: `{"nome":`), o servidor não crasha; apenas define `body = null` para que a camada de rotas decida como tratar.

---

## 3. A Metáfora de One Piece
> Imagine o posto de alfândega na entrada do porto do **Reino de Drum**.
>
> Nenhum comerciante pode entrar no castelo com caixas lacradas sem passar pela esteira de inspeção do Dr. Dalton. 
> 
> O guarda não analisa um grão por vez; ele espera todos os sacos daquela carga descerem da carroça. Se a carroça for maior do que o portão suporta (payload acima de 1 MB), o guarda fecha as grades imediatamente e expulsa o comerciante com um sinal vermelho (`413 Payload Too Large`).
> 
> Se a carga for inspecionada e o lacre estiver violado ou podre (`JSON inválido`), o inspetor anota que a carga está vazia/corrompida em vez de deixar veneno entrar na cozinha real.

---

## 4. Onde o Código Nativo Pode Ser Melhorado
- **Streaming Parsers:** Em vez de acumular 100% dos buffers para depois fazer `JSON.parse`, APIs industriais de altíssimo desempenho utilizam parsers que processam o JSON token por token enquanto os bytes fluem (ex: `stream-json`).
- **Validação de Content-Type:** Se a requisição não possuir o cabeçalho `Content-Type: application/json`, o middleware não deveria sequer tentar parsear os dados como JSON.

---

## 5. Como Comandar IAs Generativas com Este Conceito
**O Prompt de Mestre:**
> *"Crie um middleware assíncrono para servidor `node:http` nativo que intercepte a `ReadableStream` do request. O middleware deve impor um limite rígido de tamanho de payload (máximo 50KB). Se o payload exceder o limite, encerre a conexão imediatamente com status `413 Payload Too Large`. Se o parse JSON falhar, trate a exceção silenciosamente atribuindo `null` a `request.body` sem derrubar o processo."*
