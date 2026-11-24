# 📜 Mural de Recompensas e Missões de Travessia (Boss Fights)

Bem-vindo ao **Mural de Missões da Grand Line**. Aqui você não é apenas um aluno assistindo a aulas; você é o capitão e o arquiteto de software do seu navio.

Ao final das aulas ou para testar o seu domínio de Haki, o **Sensei Silvers Rayleigh** disponibiliza as especificações de missões divididas por nível de dificuldade, todas 100% nativas em Node.js (sem frameworks externos).

---

## 🎯 Quadro de Missões do East Blue (Fundamentos Nativos)

### 🟢 Nível Fácil (Easy) — *Fundamentos Puros, Status Codes e Validações*
| ID | Missão | Foco Técnico | Recompensa | Especificação |
| :--- | :--- | :--- | :--- | :--- |
| **03** | **Os Cartazes de Shells Town** | HTTP puro, status codes semânticos, `crypto.randomUUID()`. | + ฿ 10.000.000 | [Ver SPEC](./03-shells-town/SPEC.md) |
| **04** | **O Almoxarifado de Cocoyasi** | Query strings simples, cálculos agregados em memória e deleção semântica (`204`). | + ฿ 12.000.000 | [Ver SPEC](./04-cocoyasi-laranjas/SPEC.md) |
| **05** | **O Livro de Receitas de Sanji** | Validação de arrays em JSON, atualização parcial com `PATCH` e integridade de tipos. | + ฿ 15.000.000 | [Ver SPEC](./05-receitas-sanji/SPEC.md) |

---

### 🟡 Nível Médio (Normal) — *Rotas com Regex, Persistência e Filtros Dinâmicos*
| ID | Missão | Foco Técnico | Recompensa | Especificação |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **O Restaurante Baratie (Boss Fight)** | CRUD completo nativo, middleware JSON e persistência `node:fs`. | + ฿ 30.000.000 | [Ver SPEC](./01-east-blue/SPEC.md) |
| **06** | **A Cartografia Náutica de Nami** | Rotas dinâmicas aninhadas com múltiplos parâmetros regex (`:ilhaId/rotas/:rotaId`). | + ฿ 22.000.000 | [Ver SPEC](./06-cartografia-nami/SPEC.md) |
| **07** | **O Catálogo de Espadas de Tashigi** | Busca dinâmica indexada por múltiplos campos (`Object.entries.some`). | + ฿ 25.000.000 | [Ver SPEC](./07-forja-espadas/SPEC.md) |
| **08** | **O Arsenal de Munições de Usopp** | Operações atômicas de estoque, prevenção de saldo negativo e auditoria ISO. | + ฿ 25.000.000 | [Ver SPEC](./08-arsenal-usopp/SPEC.md) |
| **09** | **O Registro de Ataques de Kuro** | Middleware nativo de auditoria de latência (`X-Response-Time` nos headers). | + ฿ 28.000.000 | [Ver SPEC](./09-vila-syrup-kuro/SPEC.md) |

---

### 🔴 Nível Difícil (Hard) — *Streams Avançadas, Concorrência, Mutex e Proteção DoS*
| ID | Missão | Foco Técnico | Recompensa | Especificação |
| :--- | :--- | :--- | :--- | :--- |
| **02** | **O Arsenal de Loguetown** | Trava de concorrência na escrita, blindagem de payload (50KB) e máquina de estados. | + ฿ 40.000.000 | [Ver SPEC](./02-loguetown/SPEC.md) |
| **10** | **Importação Massiva de Pólvora** | Upload e processamento de CSV via Streams puras (`node:readline`) sem libs externas. | + ฿ 45.000.000 | [Ver SPEC](./10-importacao-csv-polvora/SPEC.md) |
| **11** | **O Escudo de Fumaça de Smoker** | Rate Limiting nativo por IP (`429`), corte de stream por tamanho (`413`) e error boundary. | + ฿ 48.000.000 | [Ver SPEC](./11-escudo-smoker/SPEC.md) |
| **12** | **O Cofre de Arlong Park** | Escrita atômica em disco (`.tmp` + `rename`) e fila Mutex contra corrupção concorrente. | + ฿ 50.000.000 | [Ver SPEC](./12-cofre-arlong-park/SPEC.md) |

---

## Como Realizar Qualquer Missão:
1. Abra a especificação da missão (`SPEC.md`).
2. Crie o servidor em `missoes/<pasta-da-missao>/src/server.js`.
3. Desenvolva do zero sem frameworks.
4. Chame o Rayleigh no chat:
   > *"Rayleigh, concluí a Missão [Nome da Missão]! Pode fazer o Code Review completo."*
