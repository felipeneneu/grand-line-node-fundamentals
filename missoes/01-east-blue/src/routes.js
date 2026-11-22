import { Database } from "./database.js"
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from "./utils/build-route-path.js";


const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/pedidos'),
    handler: (req, res) => {
      const { search } = req.query

      const pedidos = database.select('pedidos', search ? {
        cliente: search,
        status: search
      } : null)

      return res
        .writeHead(200)
        .end(JSON.stringify(pedidos))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/pedidos'),
    handler: (req, res) => {
      const { cliente, prato, mesa, status, criado_em } = req.body

      const pedido = {
        id: randomUUID(),
        cliente,
        prato,
        mesa,
        status: "pendente",
        criado_em: new Date().toISOString()
      }

      if (!cliente || !prato) {

        return res.writeHead(400).end(JSON.stringify({
          message: "Cliente e prato sao obrigatorios."
        }))

      }

      database.insert('pedidos', pedido)
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/pedidos/:id/entregar'),
    handler: (req, res) => {
      const { id } = req.params

      const isEntregue = database.update('pedidos', id, {
        status: 'entregue'
      })

      if (!isEntregue) {
        return res.writeHead(404).end(JSON.stringify({
          message: "Pedido nao encontrado."
        }))
      }

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/pedidos/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const isDeleted = database.delete('pedidos', id)

      if (!isDeleted) {
        return res.writeHead(404).end(JSON.stringify({
          message: "Pedido nao encontrado."
        }))
      }

      return res.writeHead(204).end()
    }
  }
]