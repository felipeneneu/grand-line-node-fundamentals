# 🏴‍☠️ Grand Line Backend: Módulo 01 — East Blue (Node.js Fundamentals)

> *"O aprendiz deve ser capaz de explicar cada linha do código que escrever. Se ele não souber explicar, o navio não sai do cais."*  
> — **Silvers Rayleigh**, O Rei das Trevas & Mentor Sênior

[![GitHub Repository](https://img.shields.io/badge/GitHub-felipeneneu%2Fgrand--line--node--fundamentals-blue?style=for-the-badge&logo=github)](https://github.com/felipeneneu/grand-line-node-fundamentals)
[![Node.js](https://img.shields.io/badge/Node.js-18%20%7C%2024%2B-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

---

## 🧭 O Que é Este Projeto?

O **Grand Line Backend** é um método imersivo e socrático de aprendizado de engenharia de software backend com **Node.js Nativo**. 

Ele une três forças:
1. **Inteligência Artificial como Mentor Socrático (Silvers Rayleigh):** Um agente que se recusa a entregar código pronto, cobrando explicação linha a linha e forçando você a debugar de verdade.
2. **Gamificação no Universo de One Piece:** Acompanhamento de evolução através de Níveis de Haki e Recompensas em Berries na sua própria Ficha de Pirata.
3. **Boss Fights com Especificações Reais:** Mini-projetos práticos desenvolvidos sem tutoriais guiados, baseados em requisitos funcionais (RFs), regras de negócio (RNs) e critérios de aceite.

Este primeiro repositório cobre **100% do East Blue** (Fundamentos Nativos do Node.js: Streams, Buffers, Roteamento com Regex e Persistência em Disco sem frameworks).

---

## 📚 Apostila Completa & Tutoriais Passo a Passo

Para quem está começando do absoluto zero e nunca programou um servidor na vida, todo o conteúdo conceitual e prático foi dividido em capítulos detalhados dentro da pasta [`docs/`](./docs/):

| Capítulo | Tema Abordado | O Que Você Aprende |
| :--- | :--- | :--- |
| **[Capítulo 01](./docs/01-como-criar-um-servidor-http.md)** | **O que é Node.js e HTTP Nativo** | V8, Event Loop, Cliente/Servidor, Métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`) e Status Codes. |
| **[Capítulo 02](./docs/02-streams-e-buffers-na-pratica.md)** | **Streams & Buffers na Prática** | O rio de dados, Chunks binários, alocação de memória RAM e consumo com `for await`. |
| **[Capítulo 03](./docs/03-middlewares-e-tratamento-json.md)** | **Middlewares e Parser de JSON** | O ciclo de interceptação, cabeçalhos `Content-Type` e proteção contra payloads vazios com `try/catch`. |
| **[Capítulo 04](./docs/04-persistencia-em-disco-e-uuid.md)** | **Persistência em Disco & UUIDs** | Memória RAM vs Arquivo Físico (`node:fs/promises`), perigos de `length + 1` e chaves com `randomUUID()`. |
| **[Capítulo 05](./docs/05-rotas-dinamicas-com-regex.md)** | **Rotas Dinâmicas & Expressões Regulares** | Route Params vs Query Params, captura com Named Groups `(?<id>...)` e modularização em `routes.js`. |

---

## 📓 O Caderno Físico (Quadros de 1 Página)

Seguindo a **Regra do Caderno Físico**, cada tópico estudado possui um quadro fechado em ASCII para ser transcrito à mão com caneta no seu caderno físico de estudos. Eles estão catalogados em:

- [`apostila/01-east-blue/01-http-status-codes-memoria.md`](./apostila/01-east-blue/01-http-status-codes-memoria.md)
- [`apostila/01-east-blue/02-streams-buffers-pipe.md`](./apostila/01-east-blue/02-streams-buffers-pipe.md)
- [`apostila/01-east-blue/03-persistencia-fs-database.md`](./apostila/01-east-blue/03-persistencia-fs-database.md)
- [`apostila/01-east-blue/04-rotas-regex-parametros.md`](./apostila/01-east-blue/04-rotas-regex-parametros.md)

---

## 💻 Requisitos Mínimos

- **Node.js:** Versão 18.0.0 ou superior (testado e homologado no **Node.js v24+**).
- **Git:** Para clonar e versionar o seu código.
- **Cliente HTTP:** Qualquer cliente para testar requisições (Insomnia, Thunder Client, Postman ou extensões do VS Code / Antigravity).
- **Editor / IDE com Agente de IA:** Antigravity, Cursor, Claude Code ou similar (que leia o arquivo de regras [`AGENTS.md`](./AGENTS.md)).

---

## 🚀 Como Iniciar a Sua Jornada do Zero

### 1. Clonar o Repositório
```bash
git clone https://github.com/felipeneneu/grand-line-node-fundamentals.git
cd grand-line-node-fundamentals
```

### 2. A Cerimônia de Iniciação com Silvers Rayleigh
1. Abra este projeto no seu editor com IA habilitada.
2. Abra o chat com o assistente e envie a mensagem:
   > *"Silvers Rayleigh, cheguei ao cais do East Blue e quero iniciar o meu treinamento!"*
3. O Rayleigh executará a **Cerimônia de Iniciação**: ele perguntará o seu nome e seu grande objetivo como engenheiro, personalizando o seu arquivo [`diario/PIRATA.md`](./diario/PIRATA.md) com a sua recompensa inicial de **฿ 0 Berries**.

### 3. Rodar o Servidor
```bash
# Executa o servidor nativo em modo watch (reinicia a cada alteração)
npm run dev
```

---

## ⚔️ A Boss Fight do East Blue: O Restaurante Baratie

Ao terminar os 5 capítulos teóricos e o código de treino em `src/`, você enfrentará a sua primeira missão profissional autônoma:

👉 **[`missoes/01-east-blue/SPEC.md`](./missoes/01-east-blue/SPEC.md)**

Você deverá construir um sistema de comandas 100% nativo para o Chefe Zeff, atendendo a todos os requisitos de negócio e restrições de engenharia em `missoes/01-east-blue/src/server.js`.

Ao finalizar, chame o Rayleigh para realizar o **Code Review de Engenharia Sênior**:
> *"Rayleigh, terminei a Missão do Baratie! Pode auditar o meu código?"*

Se aprovado, sua recompensa sobe para **฿ 45.000.000 de Berries**, seu **Haki do Conquistador** é despertado e você ganha o passaporte para o **Arco de Alabasta**!

---

## 📁 Estrutura do Repositório

```text
├── .agents/
│   └── skills/
│       └── revisao-arco/          # Habilidade de auditoria socrática da IA
├── apostila/
│   └── 01-east-blue/              # Quadros fechados para cópia no caderno físico
├── diario/
│   ├── PIRATA.md                  # Ficha do Pirata do aluno (Bounties e Hakis)
│   ├── exemplos/                  # Exemplos de fichas aprovadas (ex: Felipe)
│   └── YYYY-MM-DD-*.md            # Diários de bordo e sabatinas
├── docs/                          # Tutoriais passo a passo para iniciantes
│   ├── 01-como-criar-um-servidor-http.md
│   ├── 02-streams-e-buffers-na-pratica.md
│   ├── 03-middlewares-e-tratamento-json.md
│   ├── 04-persistencia-em-disco-e-uuid.md
│   └── 05-rotas-dinamicas-com-regex.md
├── missoes/
│   └── 01-east-blue/
│       ├── SPEC.md                # Especificação da Boss Fight do Baratie
│       └── src/                   # Solução construída de forma autônoma
├── src/                           # Código das aulas guiadas de treino
├── AGENTS.md                      # Personalidade e regras socráticas do Rayleigh
└── package.json
```

---

## 📜 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

Desenvolvido por **Felipe** ([@felipeneneu](https://github.com/felipeneneu)). Sinta-se livre para clonar, estudar, criar conteúdo e navegar pelos mares do backend! 🏴‍☠️
