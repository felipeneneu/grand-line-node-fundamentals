import { request } from "node:http";
import { Database } from "./database.js"
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from "./utils/build-route-path.js";


const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/pirates'),
    handler: (request, response) => {
      const { search } = request.query
      // console.log(request.query)

      const pirates = database.select('pirates', search ? {
        name: search,
        tripulacao: search
      } : null)

      return response
        .writeHead(200)
        .end(JSON.stringify(pirates))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/pirates'),
    handler: (request, response) => {
      const { name, recompensa, tripulacao } = request.body
      const pirate = {
        id: randomUUID(),
        name,
        recompensa,
        tripulacao,
      }

      database.insert('pirates', pirate)

      return response.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/pirates/:id'),
    handler: (request, response) => {
      const { id } = request.params
      const { name, tripulacao, recompensa } = request.body

      database.update('pirates', id, {
        name,
        tripulacao,
        recompensa
      })

      return response.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/pirates/:id'),
    handler: (request, response) => {
      const { id } = request.params

      database.delete('pirates', id)

      return response.writeHead(204).end()
    }
  }
]