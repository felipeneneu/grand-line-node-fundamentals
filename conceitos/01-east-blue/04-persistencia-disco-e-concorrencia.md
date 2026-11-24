# 💾 Conceito 04: Persistência em Disco e o Perigo de Concorrência

## 1. A Dor do Mundo Real (O Porquê)
Quando você guarda dados em variáveis de memória como `const database = []`:
- A leitura e escrita são quase instantâneas (nanossegundos).
- **Porém, a memória RAM é volátil.** Qualquer reinicialização, deploy ou queda de energia faz o estado evaporar no ar.

Para manter os dados vivos, precisamos gravá-los no disco rígido (SSD/HD). Mas o acesso a disco é ordens de magnitude mais lento que a RAM. Se você utilizar chamadas síncronas (`fs.writeFileSync`), você paralisa o **Event Loop** do Node.js, impedindo que qualquer outro usuário seja atendido enquanto o disco escreve.

Por isso, utilizamos **`node:fs/promises`**, que delega a escrita para a Thread Pool do Node (gerenciada pela `libuv`) de forma assíncrona.

---

## 2. A Mecânica da Concorrência: Condição de Corrida (Race Condition)
Mesmo com chamadas assíncronas, surge um perigo grave quando múltiplos clientes fazem requisições ao mesmo tempo:

```
Requisição A (POST /users) ──► Modifica RAM ──► Dispara fs.writeFile() ──┐ (Escrita lenta)
                                                                          ├─► CONFLITO!
Requisição B (POST /users) ──► Modifica RAM ──► Dispara fs.writeFile() ──┘
```

Se o arquivo começar a ser gravado pela Requisição A e, antes de terminar, a Requisição B iniciar outra gravação no mesmo arquivo, o arquivo pode ficar truncado, com pedaços do JSON sobrescritos, corrompendo a base de dados inteira!

### Como Evitar isso Nativamente? (O Padrão da Fila / Mutex)
Podemos encadear as Promises de persistência para que uma gravação em disco só ocorra após a anterior ter sido concluída com sucesso:

```javascript
class Database {
  #writePromise = Promise.resolve();

  async #persist() {
    // Encapsula na cadeia de promises para serializar a escrita
    this.#writePromise = this.#writePromise.then(async () => {
      await fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2));
    });
    return this.#writePromise;
  }
}
```

---

## 3. A Metáfora de One Piece
> O array em memória RAM é a **mente do capitão Luffy**. Ele pensa rápido, reage em milissegundos, mas se ele levar uma pancada na cabeça e desmaiar, ele esquece tudo o que acabou de combinar.
>
> O arquivo `db.json` em disco é o **Diário de Bordo talhado em pedra** pelo escriba do navio.
>
> A condição de corrida é quando dois piratas tentam bater o martelo e o cinzel na mesma pedra no mesmo instante: as letras se misturam, a pedra racha e o mapa fica ilegível.
> 
> O encadeamento de promises (Mutex) é a **fila do escriba**: *"Um pirata de cada vez dita o seu nome; eu risco a pedra, dou o ponto final e só então chamo o próximo marinheiro."*

---

## 4. Onde o Código Nativo Pode Ser Melhorado
1. **Gravação Atômica (Atomic Write):** Em sistemas de missão crítica, nunca se escreve diretamente por cima do arquivo original. Grava-se primeiro em um arquivo temporário (`db.json.tmp`) e, quando a escrita termina com sucesso, renomeia-se o arquivo (`fs.rename`). No nível do sistema operacional, o renomear de arquivo é uma operação atômica e instantânea!
2. **Índices de Busca:** Nosso banco nativo faz varreduras completas no array com `.findIndex()` ou `.filter()`. Se tivermos 50.000 registros, a busca é $O(n)$ (lenta). Bancos industriais usam árvores B-Tree e tabelas Hash para buscas em $O(1)$ ou $O(\log n)$.

---

## 5. Como Comandar IAs Generativas com Este Conceito
**O Prompt de Mestre:**
> *"Crie uma classe de banco de dados em arquivo JSON utilizando `node:fs/promises`. O método de persistência deve ser estritamente não-bloqueante e imune a condições de corrida, utilizando encadeamento de Promises (mutex sequencial) para garantir que gravações simultâneas não corrompam o arquivo. Utilize gravação atômica gravando primeiro em arquivo temporário e executando `rename` ao final."*
