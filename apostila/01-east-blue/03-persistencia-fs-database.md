# 📜 Caderno de Bordo: Capítulo 03 — Persistência com File System (node:fs) & Database Local

> **Instrução para o Aprendiz:** Abra o seu caderno físico na **Página Esquerda** e copie o quadro fechado abaixo com caneta preta e azul.  
> Na **Página Direita**, anote a diferença vital entre a memória volátil (RAM) e o disco permanente (fs).

---

```text
+-------------------------------------------------------------------------+
| DATA: 22/11/2026   | ARCO: East Blue   | TEMA: Persistência com node:fs  |
+-------------------------------------------------------------------------+
| 1. O PROBLEMA REAL (A DOR DO MUNDO REAL)                                |
| "Se eu salvar dados apenas em variáveis (const arr = []), quando o     |
| servidor reiniciar, todos os clientes e dados somem. Como persistir    |
| sem precisar subir um banco de dados pesado como PostgreSQL agora?"    |
| -> Solução: Criar um banco de dados em arquivo local (db.json) usando   |
|    as APIs nativas de leitura e escrita assíncronas do Node: node:fs.   |
+-------------------------------------------------------------------------+
| 2. A METÁFORA DE ONE PIECE (O MODELO MENTAL)                            |
| -> Memória RAM (#database = {}): É a cabeça do Luffy. Rápida, mas se    |
|    ele dormir ou apagar, tudo some da mente.                            |
| -> Arquivo Físico (db.json): É o Diário de Bordo talhado em pedra.      |
| -> #persist(): É a caneta do escriba. Se o pirata subir a bordo mas o   |
|    escriba não for chamado para riscar o papel, ele não existe no mapa! |
| -> randomUUID(): A marca d'água da Marinha. Nenhum pirata no mundo tem  |
|    a mesma identidade.                                                  |
+-------------------------------------------------------------------------+
| 3. O DIAGRAMA DO COFRE (DESENHE NO PAPEL)                               |
|                                                                         |
|   Requisição POST                                                       |
|        │                                                                |
|        ▼                                                                |
|   ┌──────────────────────────────────────────────────────────────┐      |
|   │ database.insert('pirates', { id: randomUUID(), ... })        │      |
|   └──────────────────────────────┬───────────────────────────────┘      |
|                                  │                                      |
|            ┌─────────────────────┴──────────────────────┐               |
|            ▼                                            ▼               |
|   [ MEMÓRIA VOLÁTIL / RAM ]                    [ DISCO PERMANENTE ]     |
|   this.#database['pirates'].push(data)         this.#persist()          |
|   (Rápido, mas morre no restart)               fs.writeFile(db.json)    |
|                                                (Sobrevive à tempestade) |
|                                                                         |
+-------------------------------------------------------------------------+
| 4. LIÇÕES DE SANGUE (GOTCHAS DA GRAND LINE)                             |
| ⚠️ ESQUECER O #persist(): Atualizar o array em memória dá sensação de   |
|    sucesso, mas se não chamar fs.writeFile, o db.json fica vazio!       |
| ⚠️ ID POR LENGTH: 'arr.length + 1' quebra se deletar itens (colisão).   |
|    Use sempre 'import { randomUUID } from "node:crypto"'.               |
| ⚠️ IMPORT.META.URL: Use new URL('../db.json', import.meta.url) para      |
|    garantir que o caminho do arquivo seja sempre relativo ao módulo.    |
+-------------------------------------------------------------------------+
```
