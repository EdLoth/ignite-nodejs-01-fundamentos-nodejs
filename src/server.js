import http from 'http';
import { json } from './middlewares/json.js';

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email
    })

    return res.end('Criação de Usuarios - nome:' + name + ', email:' + email + '.👌');
  }

  return res.end('Hello, IGNITE!');
})

server.listen(3333);
console.log("Servidor Rodando na porta: 3333🚀")
