// missoes/02-loguetown/src/server.js
// Aqui você ergue o servidor do Arsenal de Loguetown!
// Lembre-se: Use apenas módulos nativos do Node.js.
// Consulte a especificação completa em ../SPEC.md

import http from 'node:http';

const PORT = 3334;

const server = http.createServer(async (request, response) => {
  // TODO: Implementar middleware de contenção de erros e limites de payload
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ mensagem: 'Arsenal de Loguetown aguardando forja!' }));
});

server.listen(PORT, () => {
  console.log(`⚓ Arsenal de Loguetown ativo na porta :${PORT}!`);
});
