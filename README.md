# 🏴‍☠️ Grand Line Backend: Guia Definitivo do East Blue (Fundamentos do Node.js)

> *"O aprendiz deve ser capaz de explicar cada linha do código que escrever. Se ele não souber explicar, o navio não sai do cais."*  
> — **Silvers Rayleigh**, O Rei das Trevas & Mentor Sênior de Backend

Bem-vindo ao **East Blue**, o ponto de partida de qualquer engenheiro de software que deseja dominar **Node.js de verdade**. 

Este repositório foi desenhado para quem **nunca viu um vídeo sobre Node.js** ou quer fugir do *"tutorial hell"* (a ilusão de apenas copiar código alheio). Aqui você vai aprender os fundamentos primitivos da computação em servidores modernos, sem recorrer a frameworks mágicos como Express ou Fastify de início.

---

## 🧭 O Que é o Método Grand Line?

Neste repositório, você não estuda passivamente. Você é treinado por um **Mentor Sênior com Inteligência Artificial (Silvers Rayleigh)** que segue regras rigorosas:

1. **Abordagem Socrática:** Ele **nunca** te dá o código corrigido de primeira. Ele faz perguntas que forçam você a debugar e entender a causa raiz do erro.
2. **Metáforas Vivas (One Piece):** Todo conceito técnico abstrato (Streams, Buffers, RAM, Persistência) é ancorado na tripulação dos Chapéus de Palha e na física dos oceanos.
3. **A Regra do Caderno Físico:** Cada conceito concluído gera um quadro fechado em ASCII na pasta [`apostila/01-east-blue/`](./apostila/01-east-blue/) para você transcrever à mão com caneta no seu caderno.
4. **RPG de Carreira (Ficha do Pirata):** Você começa com recompensa **฿ 0 Berries**. Conforme resolve desafios e domina o Haki, sua recompensa sobe até os **฿ 45.000.000 de Berries**.
5. **A Boss Fight Autônoma:** Ao final do guia, você deve construir a sua própria API sozinho a partir de uma especificação profissional ([`missoes/01-east-blue/SPEC.md`](./missoes/01-east-blue/SPEC.md)).

---

## 🌊 O Que é o Node.js e Como Ele Funciona?

O **Node.js** não é uma linguagem de programação nem um framework: é um **ambiente de execução JavaScript (Runtime)** construído sobre o motor **V8 do Google Chrome** e a biblioteca assíncrona **libuv**.

### O Event Loop e a Single-Thread Não-Bloqueante
Em servidores tradicionais antigos (como Apache com PHP ou Java clássico), cada usuário que acessava o servidor ocupava uma *Thread* do sistema operacional. Se 500 pessoas acessassem ao mesmo tempo, 500 threads pesadas disputavam a memória do servidor até ele explodir.

O Node.js funciona de forma diferente:
- **A Single-Thread do JavaScript:** Existe apenas um cozinheiro principal no convés (a thread principal de execução).
- **I/O Não-Bloqueante:** Quando o servidor precisa ler um arquivo pesado no disco (`fs.readFile`) ou consultar um banco de dados, o cozinheiro não fica parado esperando! Ele delega o trabalho para a tripulação no porão (o *Worker Pool* da `libuv`) e continua atendendo novos clientes imediatamente.
- **O Event Loop:** É a vigília constante que avisa: *"Capitão, o arquivo que estava sendo lido no disco terminou de chegar! Execute a resposta agora!"*.

---

## 📦 Streams & Buffers: O Rio de Dados

A maioria dos desenvolvedores iniciantes comete o erro de achar que a internet envia dados inteiros de uma vez só. 

> **A Dor do Mundo Real:** Se um cliente enviar um arquivo de vídeo de 2 Gigabytes para o seu servidor e você tentar colocar tudo em uma variável comum (`const data = ...`), a memória RAM do servidor esgota e o navio afunda (`FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed`).

### 1. O que é um Buffer?
Um **Buffer** é um espaço físico na memória RAM reservado para armazenar **dados binários brutos** (sequências de bytes como `4c 75 66 66 79`). Ele é a madeira crua do barril antes de você esculpir e transformar em texto legível (`Buffer.from("Luffy")`).

### 2. O que é uma Stream?
Uma **Stream** é a transferência de dados **aos pedaços (Chunks)** ao longo do tempo, em vez de enviar tudo de uma vez.
- **A Metáfora:** Imagine 10.000 caixas de provisões no cais. Em vez do marinheiro carregar todas as 10.000 nas costas (estouro de RAM), você instala uma **esteira rolante** (Stream) e processa caixa por caixa conforme elas chegam.

Existem 4 tipos de Streams no Node.js:
1. **Readable Stream:** De onde você lê dados aos pedaços (ex: `request` HTTP, leitura de arquivo).
2. **Writable Stream:** Para onde você envia dados aos pedaços (ex: `response` HTTP, gravação de arquivo).
3. **Transform Stream:** Lê um chunk, transforma ele (ex: criptografa ou compacta) e cospe do outro lado.
4. **Duplex Stream:** Permite ler e escrever ao mesmo tempo (ex: sockets de rede).

### Como consumir uma Stream no Node Moderno:
```javascript
const buffers = []

// O 'for await' consome cada caixote (chunk) conforme ele chega pela esteira
for await (const chunk of request) {
  buffers.push(chunk)
}

// Junta todos os pedaços e converte para texto legível
const fullBody = Buffer.concat(buffers).toString()
```

---

## 🗄️ Persistência em Disco: RAM vs Arquivo Físico

Qualquer dado guardado em variáveis comuns de JavaScript (como `const piratas = []` ou `#database = {}`) vive na **memória RAM**.
- **A Memória RAM é volátil:** Se você fechar o terminal ou reiniciar o computador, tudo evapora instantaneamente.
- **O Disco Permanente (`node:fs/promises`):** Para o dado sobreviver a tempestades, precisamos gravá-lo com tinta permanente no diário de bordo (`db.json`).

### O Padrão UUID (Universally Unique Identifier)
Nunca use identificadores sequenciais baseados no tamanho da lista (`arr.length + 1`):
1. **Colisão:** Se você tiver 3 itens, deletar o segundo e criar outro, haverá dois itens com ID `3`.
2. **Segurança (IDOR):** Qualquer usuário consegue vasculhar dados de outras pessoas apenas mudando `id=1` para `id=2` na URL.

No Node moderno, importamos nativamente o gerador de identidades criptográficas:
```javascript
import { randomUUID } from 'node:crypto';

const novoItem = {
  id: randomUUID(), // Gera: 'f40707c1-2332-4bb7-a20a-b74fc88a20c0'
  nome: 'Zoro'
}
```

---

## 🧭 A Bússola das Rotas: Route Params vs Query Params

Em uma API REST bem projetada, existem 3 formas de enviar dados do cliente para o servidor:

| Tipo | Onde fica na requisição? | Para que serve? | Exemplo |
| :--- | :--- | :--- | :--- |
| **Route Parameters** | No caminho (Path) da URL | Identificar um recurso específico | `DELETE /piratas/71ac5f52` |
| **Query Parameters** | No final da URL (após `?`) | Filtros, ordenação e paginação | `GET /piratas?search=Luffy&page=1` |
| **Request Body** | No corpo oculto da requisição | Criação e alteração com dados ricos | `POST /piratas` com JSON |

### Como criar um Roteador Dinâmico com Expressões Regulares (Regex):
Para permitir rotas como `/pedidos/:id`, usamos o utilitário nativo de Regex que substitui `:parametro` por um grupo nomeado `(?<parametro>[a-z0-9-_]+)`:

```javascript
// src/utils/build-route-path.js
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\\-_]+)')
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
```

---

## 🚀 Como Iniciar a Sua Jornada com o Rayleigh

### 1. Requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18+ ou 24+ recomendada).
- Um editor com suporte a Agentes de IA (como **Antigravity**, **Cursor**, **Claude Code** ou extensões equivalentes).

### 2. A Cerimônia de Iniciação
1. Clone este repositório no seu computador:
   ```bash
   git clone https://github.com/SEU_USUARIO/grand-line-node-fundamentals.git
   cd grand-line-node-fundamentals
   npm install
   ```
2. Abra o chat do seu Agente de IA e diga:
   > *"Silvers Rayleigh, estou pronto para iniciar o meu treinamento no East Blue!"*
3. O Rayleigh vai acolher você, perguntar o seu **nome de desenvolvedor**, seus **objetivos** e registrar a sua ficha oficial em [`diario/PIRATA.md`](./diario/PIRATA.md)!

---

## ⚔️ A Boss Fight do East Blue: O Restaurante Baratie

Quando você estudar as aulas e entender o código de exemplo em `src/`, sua provação final será abrir a especificação oficial:

👉 **[`missoes/01-east-blue/SPEC.md`](./missoes/01-east-blue/SPEC.md)**

Você deverá implementar um sistema de comandas 100% autônomo dentro de `missoes/01-east-blue/src/server.js` atendendo a todos os:
- **Requisitos Funcionais (RFs):** `POST /pedidos`, `GET /pedidos`, filtros, `PATCH /pedidos/:id/entregar`, `DELETE /pedidos/:id`.
- **Regras de Negócio (RNs):** Validação com `400 Bad Request`, `404 Not Found` para IDs inexistentes, status inicial pendente e ISO dates.
- **Requisitos Não-Funcionais (RNFs):** Zero frameworks (apenas `node:http`, `node:fs`, `node:crypto`).

Ao terminar, chame o Rayleigh no chat:
> *"Rayleigh, terminei a Missão do Baratie! Pode auditar o meu código?"*

Se aprovado, você receberá a sua recompensa de **฿ 45.000.000 de Berries** e o passaporte oficial para o **Arco de Alabasta**!

---

## 📜 Licença e Créditos

Este projeto é de código aberto sob a licença MIT. Criado e documentado como uma metodologia livre de aprendizado acelerado de backend. 

Sinta-se livre para usar esta estrutura para os seus próprios estudos, gravar vídeos, compartilhar com a comunidade e forjar os seus próprios aprendizes no caminho até o One Piece! 🏴‍☠️
