# ⚔️ Conceito 06: Engenharia de Prompts com Haki (Como Comandar IAs Generativas)

> *"A inteligência artificial é uma espada afiada. Nas mãos de uma criança, corta a própria perna. Nas mãos de um mestre de esgrima, corta montanhas."*  
> — **Silvers Rayleigh**

---

## 1. A Ilusão da Facilidade
Muitos marinheiros acreditam que na era da Inteligência Artificial não é mais necessário saber Node.js puro, entender o Event Loop ou saber o que é um Buffer.

Isso é a receita para o desastre:
1. Modelos de IA são treinados em montanhas de código público na internet — **a maioria do qual é código amador, desatualizado ou cheio de vulnerabilidades**.
2. Quando você faz uma pergunta rasa, a IA recorre ao padrão mais comum (que geralmente é a pior prática).
3. Se você não sabe o que é um vazamento de memória ou uma condição de corrida, você aceitará um código que funciona para 1 usuário local, mas que entrará em colapso com 500 usuários simultâneos em produção.

---

## 2. A Fórmula do Prompt com Haki (O Método Rayleigh)

Para fazer uma IA generativa escrever código digno de Engenharia de Software Sênior, todo prompt técnico de backend deve conter **5 Pilares Inegociáveis**:

```
+─────────────────────────────────────────────────────────────+
|               OS 5 PILARES DO PROMPT COM HAKI               |
+-------------------------------------------------------------+
| 1. CONTEXTO & RESTRIÇÃO TÉCNICA (Nativo vs Frameworks)      |
| 2. CONTRATO DE ENTRADA & SAÍDA (Tipos e Semântica HTTP)     |
| 3. TRATAMENTO DE CONCORRÊNCIA E MEMÓRIA (Streams/Mutex)     |
| 4. POLÍTICA DE RESILIÊNCIA E FALHAS (try/catch e Erros)     |
| 5. CRITÉRIO DE ACEITE / TESTES ESPERADOS                   |
+─────────────────────────────────────────────────────────────+
```

---

## 3. O Duelo de Prompts: Do Aprendiz ao Mestre

### Cenário: Criar um leitor de arquivo de logs para exportação

#### ❌ O Prompt Frágil (Sem Haki)
> *"Cria um código em Node que lê um arquivo de log e devolve as linhas com erro."*
* **Resultado da IA:**
  - Usa `fs.readFileSync('logs.txt')` (congela o servidor todo).
  - Faz `.split('\n')` gerando um array gigantesco na memória RAM.
  - Se o log tiver 2 GB, a máquina reinicia com Out-of-Memory.

#### ⚔️ O Prompt com Haki de Engenharia (Nível Rayleigh)
> *"Atue como um Engenheiro de Software Sênior em Node.js. Crie uma função em Node.js nativo utilizando o módulo `node:readline` acoplado a uma `ReadableStream` criada com `node:fs.createReadStream`. 
> 
> Requisitos Mandatórios:
> 1. O arquivo deve ser processado linha a linha sob demanda (streaming), sem carregar o arquivo inteiro na memória RAM em nenhum momento.
> 2. Implemente tratamento de eventos de erro na stream (`stream.on('error')`).
> 3. Conecte a saída filtrada a uma `TransformStream` que converta as linhas para objetos JSON estruturados.
> 4. Forneça um exemplo de uso demonstrando o consumo assíncrono com `for await`."*

* **Resultado da IA:**
  - Código industrial, limpo, não-bloqueante, seguro e escalável para arquivos de qualquer tamanho.

---

## 4. O Princípio da Auditoria Inegociável
Mesmo com o melhor prompt, você deve **auditar cada linha**:
1. *Há alguma chamada síncrona (`Sync`) no caminho crítico da requisição?* Se houver, mande remover.
2. *Os status codes refletem a verdade da operação?*
3. *Existe risco de concorrência se duas pessoas chamarem essa função no mesmo segundo?*
4. *Os erros estão sendo silenciados com `catch` vazio ou estão sendo reportados com clareza?*

Se você souber responder a essas quatro perguntas, a IA será o seu melhor marujo no convés. Se não souber, ela será o capitão do navio — e você nem saberá para onde o leme está virado!
