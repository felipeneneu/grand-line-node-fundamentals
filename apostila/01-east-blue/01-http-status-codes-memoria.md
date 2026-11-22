# 📜 Caderno de Bordo: Capítulo 01 — HTTP Nativo & Status Codes

> **Instrução para o Aprendiz:** Abra uma folha em branco do seu caderno físico.  
> Copie o quadro fechado abaixo exatamente como está desenhado. Ele contém a síntese completa da aula em 1 página.

---

```text
+-------------------------------------------------------------------------+
| DATA: 21/11/2026   | ARCO: East Blue   | TEMA: HTTP Nativo & Memória    |
+-------------------------------------------------------------------------+
| 1. O PROBLEMA REAL (A DOR DO MUNDO REAL)                                |
| "Como dois computadores conversam pela rede sem se conhecerem?"         |
| -> Protocolo HTTP: Verbos (GET/POST), rotas (/times) e códigos.         |
| -> Sem ele, cada máquina falaria um dialeto diferente e nada funcionaria|
+-------------------------------------------------------------------------+
| 2. A METÁFORA DE ONE PIECE (O MODELO MENTAL)                            |
| -> O servidor é o Going Merry ancorado no porto :3333.                  |
| -> Guardar em memória (`times = []`) é empilhar barris soltos no convés.|
| -> Se vier uma tempestade e o servidor cair, tudo vai para o mar!       |
| -> O cliente é o marinheiro que pede o serviço; ele NÃO guarda os dados.|
+-------------------------------------------------------------------------+
| 3. O DIAGRAMA DE FLUXO (DESENHE COM CAIXAS E SETAS NO PAPEL)            |
|                                                                         |
|      [ Marinheiro / Cliente HTTP ]                                      |
|                   │                                                     |
|                   │ 1. POST /times (metadados no cabeçalho)             |
|                   ▼                                                     |
|      ┌───────────────────────────────┐                                  |
|      │   Porta :3333 (node:http)     │                                  |
|      │   Servidor ativo no terminal  │                                  |
|      └────────────┬──────────────────┘                                  |
|                   │                                                     |
|                   │ 2. times.push({ id: times.length + 1, ... })        |
|                   ▼                                                     |
|      ┌───────────────────────────────┐                                  |
|      │   Memória RAM do Servidor     │                                  |
|      │   Array `const times = []`    │ ──► 💥 SE REINICIAR O PROCESSO,  |
|      └────────────┬──────────────────┘        O ARRAY É ZERADO!         |
|                   │                                                     |
|                   │ 3. writeHead(201)                                   |
|                   ▼                                                     |
|      [ Resposta: 201 Created ] ──► Avisa que a carga foi criada         |
|                                                                         |
+-------------------------------------------------------------------------+
| 4. OS 3 SINAIS MARÍTIMOS (STATUS CODES SEMÂNTICOS)                      |
| -> 200 OK: "Tome aqui a encomenda que você pediu." (ex: GET)            |
| -> 201 Created: "Novo recurso foi criado no navio com sucesso." (POST)  |
| -> 404 Not Found: "Essa coordenada ou ilha não existe no mapa."         |
| -> Content-Type: application/json: A etiqueta que diz a língua da carta.|
+-------------------------------------------------------------------------+
| 5. LIÇÃO DE SANGUE (O QUE NÃO PODE ERRAR EM ENTREVISTA)                 |
| ⚠️ setHeader vs writeHead:                                              |
|    - setHeader: Apenas prepara uma etiqueta na fila.                    |
|    - writeHead: Carimba o Status Code e despacha a resposta na água.    |
| ⚠️ O cliente não armazena estado nos headers; a carga fica no servidor! |
+-------------------------------------------------------------------------+
```
