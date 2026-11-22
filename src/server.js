import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-querry-params.js';

// - Criar usuarios
// - Listagem usuarios
// - Editar usuarios
// - Remocao usuarios

// - HTTP
// - Metodo HTTP
// - URL

// - API REST

// GET, POST, PUT, PATCH, DELETE

// Get => Buscar uma informação no servidor
// Post => Criar uma informação no servidor
// Put => Alterar uma informação no servidor
// Patch => Alterar uma informação específica no servidor
// Delete => Deletar uma informação no servidor

// Stateful - Stateless

// Cabecalhos (requisicao/resposta) => Metadados

// Http Status Code

// Query Parameters: URL Stateful => Filtros, paginacao, nao-obrigatorios
// Route Parameters: identificacao de recursos
// Request Body: Envio de informacoes de um formulario, obrigatorio para criacao/edicao de recursos




const server = http.createServer(async(request, response)=> {
 
  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route){
    const routeParams = request.url.match(route.path)

    // console.log(extractQueryParams(routeParams.groups.query))

    const { query, ...params } = routeParams.groups

    request.params = params
    request.query = query ? extractQueryParams(query) : {}
    
    return route.handler(request, response)
  }

  return response.writeHead(404).end()
})

server.listen(3333)