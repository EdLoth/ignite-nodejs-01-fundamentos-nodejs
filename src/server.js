import http from 'http';

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

try {
  req.body = JSON.parse(Buffer.concat(buffers).toString())
} catch {
  req.body = null
}

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-Type', 'application/json')
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
