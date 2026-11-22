# 📜 Caderno de Bordo: Capítulo 02 — Streams, Buffers e HTTP Streaming

> **Instrução para o Aprendiz:** Abra o seu caderno físico na **Página Esquerda** e copie o quadro fechado abaixo.  
> Na **Página Direita**, anote o seu primeiro log de erro real: o erro `duplex: 'half'` do Node 24!

---

```text
+-------------------------------------------------------------------------+
| DATA: 21/11/2026   | ARCO: East Blue   | TEMA: Streams & Buffers no Node|
+-------------------------------------------------------------------------+
| 1. O PROBLEMA REAL (A DOR DO MUNDO REAL)                                |
| "Como processar arquivos gigantes (1GB+) ou conexões lentas sem estourar|
| a memória RAM do servidor?"                                             |
| -> Sem Streams: O Node tenta colocar tudo na RAM de uma vez e CRASHA.   |
| -> Com Streams: O dado é lido e processado em pequenos pedaços (Chunks).|
+-------------------------------------------------------------------------+
| 2. A METÁFORA DE ONE PIECE (O MODELO MENTAL)                            |
| -> 1.000 barris no cais: Não carregue todos nas costas de uma vez.      |
| -> Stream: É a esteira rolante ligando o navio ao armazém.              |
| -> Chunk: É cada barril passando pela esteira.                          |
| -> Buffer: O espaço físico da madeira do barril (memória binária pura). |
| -> .pipe(): O cano que conecta uma esteira na outra sem vazamento.      |
+-------------------------------------------------------------------------+
| 3. O DIAGRAMA DO PIPELINE (DESENHE NO PAPEL)                            |
|                                                                         |
|      ┌─────────────────────────┐                                        |
|      │  READABLE STREAM        │ ──► Emite dados em Chunks (Buffers)    |
|      │  (OneToHundredStream)   │     Ex: 1, 2, 3... a cada 1s           |
|      └───────────┬─────────────┘                                        |
|                  │ .pipe()                                              |
|                  ▼                                                      |
|      ┌─────────────────────────┐                                        |
|      │  TRANSFORM STREAM       │ ──► Altera o pedaço antes de repassar  |
|      │  (InverseNumberStream)  │     Ex: multiplica por -1              |
|      └───────────┬─────────────┘                                        |
|                  │ .pipe()                                              |
|                  ▼                                                      |
|      ┌─────────────────────────┐                                        |
|      │  WRITABLE STREAM        │ ──► Destino final (grava ou exibe)     |
|      │  (Terminal / res HTTP)  │     Ex: console.log() ou cliente HTTP  |
|      └─────────────────────────┘                                        |
|                                                                         |
+-------------------------------------------------------------------------+
| 4. O HTTP NATIVO É UMA STREAM!                                          |
| -> request (req)  = ReadableStream (vem do cliente aos pedaços).        |
| -> response (res) = WritableStream (você cospe de volta aos pedaços).   |
| -> Podemos fazer: req.pipe(transform).pipe(res)!                        |
+-------------------------------------------------------------------------+
| 5. LIÇÃO DE SANGUE (CICATRIZ DE Batalha DO NODE 24)                     |
| ⚠️ TypeError: RequestInit: duplex option is required when sending body!  |
| -> No Node moderno (18+ / 24), enviar Stream via fetch exige:           |
|    fetch(url, { method: 'POST', body: stream, duplex: 'half' })         |
| -> 'half': Envia primeiro o corpo e depois aguarda a resposta.          |
+-------------------------------------------------------------------------+
```
