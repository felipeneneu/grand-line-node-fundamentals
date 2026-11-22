# 🗄️ Capítulo 04: Persistência em Disco e Identificadores Únicos (UUID)

> *"A memória do capitão é rápida, mas se ele dormir, esquece tudo. O diário de bordo talhado em pedra dura para sempre."* — Silvers Rayleigh

Quando você cria uma variável em JavaScript:
```javascript
const piratas = []
```
Essa lista vive exclusivamente na **Memória RAM** do computador.

- Se você desligar o computador: **os dados somem**.
- Se você salvar um arquivo e o servidor reiniciar com `--watch`: **os dados somem**.
- Se o servidor cair por um erro: **os dados somem**.

Para criar uma aplicação de verdade, precisamos de **Persistência**. No East Blue, antes de usarmos bancos relacionais complexos como PostgreSQL, construímos nosso próprio banco de dados em arquivo local (`db.json`) com o módulo nativo **`node:fs/promises`**.

---

## 1. O Que é o Módulo `node:fs/promises`?

O módulo `fs` (File System) é o carpinteiro do Node.js. Ele tem permissão para:
- Ler arquivos no computador (`fs.readFile`).
- Criar e escrever em arquivos (`fs.writeFile`).
- Deletar arquivos (`fs.unlink`).

O sufixo `/promises` significa que todas as funções são assíncronas (retornam *Promises*), ou seja, **elas não travam o servidor enquanto o disco rígido está gravando o arquivo**.

---

## 2. A Classe `Database`

Veja como estruturamos nosso cofre em `src/database.js`:

```javascript
import fs from 'node:fs/promises'

// Define o caminho físico do arquivo db.json relativo a este arquivo
const dataBasePath = new URL('../db.json', import.meta.url)

export class Database {
  // A hashtag '#' indica que essa propriedade é PRIVADA (ninguém de fora pode alterar na mão)
  #database = {}

  constructor() {
    // Ao ligar o servidor, tenta ler os dados salvos previamente
    fs.readFile(dataBasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        // Se o arquivo ainda não existir, cria um arquivo vazio
        this.#persist()
      })
  }

  // O Escriba: grava o que está na memória RAM para o disco
  #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#database, null, 2))
  }

  // Selecionar dados de uma tabela
  select(table) {
    const data = this.#database[table] ?? []
    return data
  }

  // Inserir novo registro
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    // REGRA DE OURO: Atualizou a memória? Chame o #persist() para salvar no disco!
    this.#persist()

    return data
  }
}
```

---

## 3. O Perigo de Criar IDs Sequenciais (`length + 1`)

Muitos iniciantes tentam gerar o identificador (ID) de um registro assim:
```javascript
const id = lista.length + 1
```

### Por que isso é um erro grave na engenharia?
1. **Problema da Exclusão:** Imagine que você tem 3 piratas com IDs `1, 2, 3`. Você remove o pirata `2`. Sua lista agora tem tamanho `2`. Se você adicionar outro pirata, o `length + 1` vai gerar o ID `3` de novo! Você terá **dois registros com o mesmo ID**!
2. **Problema de Segurança (IDOR):** Se um pirata tem o link `/perfil/1`, ele facilmente tenta `/perfil/2`, `/perfil/3` e descobre dados de todo mundo.

---

## 4. A Solução Profissional: `randomUUID()`

O Node.js possui um módulo nativo de segurança chamado **`node:crypto`**. Ele contém a função **`randomUUID`** que gera uma chave universal única de 36 caracteres:

```javascript
import { randomUUID } from 'node:crypto'

const pirata = {
  id: randomUUID(), // Exemplo: 'f40707c1-2332-4bb7-a20a-b74fc88a20c0'
  nome: 'Luffy',
  recompensa: 1500000000
}
```

A chance matemática de dois UUIDs colidirem é tão astronômica que é considerada impossível na computação moderna.

No próximo capítulo, você vai aprender a criar **Rotas Dinâmicas** com Expressões Regulares para buscar, editar e deletar esses registros pelo ID!

👉 [Capítulo 05: Rotas Dinâmicas com Expressões Regulares](./05-rotas-dinamicas-com-regex.md)
