# 🌊 Conceito 02: Streams, Buffers e a Prevenção do Out-of-Memory (OOM)

## 1. A Dor do Mundo Real (O Porquê)
Imagine que sua API precisa receber um arquivo CSV de 1 GB contendo transações financeiras ou uma imagem de alta resolução.

Se você utilizar a abordagem comum e ingênua de ler o arquivo inteiro para uma variável:
```javascript
// ❌ O Caminho da Morte por Memória RAM
const arquivoCompleto = fs.readFileSync('gigante.csv'); // Aloca 1 GB imediatamente na RAM
```
Se 5 usuários simultâneos fizerem esse upload, o processo do Node tentará alocar 5 GB de RAM. Como a engine V8 possui limites padrões de memória (geralmente entre 1.4 GB e 4 GB), o sistema operacional dispara um **OOM Killer** e mata o processo Node.js na hora. **Todos os clientes conectados caem.**

---

## 2. A Mecânica Técnica: Streams & Chunks
Uma **Stream** é uma coleção de dados que não está disponível de uma só vez na memória, mas sim em pequenos blocos sequenciais distribuídos no tempo chamados **Chunks**.

### Os 4 Tipos Fundamentais de Streams:
1. **Readable (Leitura):** Fonte de onde dados são lidos aos poucos (ex: `request`, `fs.createReadStream`).
2. **Writable (Escrita):** Destino para onde enviamos dados aos poucos (ex: `response`, `fs.createWriteStream`).
3. **Transform (Transformação):** Recebe chunks, altera seu conteúdo binário e repassa para frente (ex: compressores gzip, criptografia, conversão de maiúsculas).
4. **Duplex (Dupla):** Permite leitura e escrita simultâneas (ex: WebSockets, TCP Sockets).

### O que é um Buffer?
Um `Buffer` é um pedaço contíguo de memória física alocada fora da Heap do V8. Quando o dado trafega pela rede, ele não viaja como texto bonitinho `"Olá"`; viaja como octetos binários brutos (ex: `<Buffer 4f 6c c3 a1>`). O Buffer é a estrutura de dados que permite ao Node.js manipular esses bytes diretamente antes de decodificá-los para strings ou salvá-los no disco.

---

## 3. A Metáfora de One Piece
> Imagine que o armazém de Alabasta precisa receber 5.000 sacos de mantimentos do navio.
>
> O marujo desajeitado tenta pegar os 5.000 sacos nos ombros de uma só vez. As pernas dele quebram sob o peso e ele morre esmagado (**Out-of-Memory Crash**).
>
> O marinheiro disciplinado instala uma **esteira rolante** ligando o porão ao cais:
> - A esteira é a **Stream**.
> - Cada saco passando pela esteira a cada segundo é um **Chunk**.
> - O espaço físico do saco de pano que envolve os grãos é o **Buffer**.
> - O comando `.pipe()` é a junção perfeita de duas esteiras rolantes sem deixar nenhum grão cair no mar.

---

## 4. Onde o Código Nativo Pode Melhorar: Backpressure
Quando uma esteira de leitura cospe dados mais rápido do que a esteira de destino consegue engolir (ex: lendo um SSD rápido e enviando para uma internet 3G lenta), ocorre o fenômeno chamado **Backpressure (Contrapressão)**.

Se você não respeitar o retorno booleano de `.write()` ou não usar o método seguro `stream.pipeline()`, os chunks se acumulam na fila de memória RAM do Node, gerando vazamento de memória invisível.

---

## 5. Como Comandar IAs Generativas com Este Conceito
Se você disser *"faça upload de um arquivo"*, a IA quase sempre usará bibliotecas pesadas que guardam tudo em memória temporária.

**O Prompt de Mestre:**
> *"Implemente uma rotina de processamento de dados utilizando Node.js Streams puras (`node:stream`), conectando uma `ReadableStream` diretamente a uma `TransformStream` para sanitização e desaguando em uma `WritableStream` via pipeline seguro (`node:stream/promises`). Não acumule os chunks em arrays de memória para evitar sobrecarga de heap e garantir suporte a backpressure."*
