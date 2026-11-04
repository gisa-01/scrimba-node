import http, { createServer } from 'node:http'
import { getDataFromDB } from './database/db.js'

const PORT = 8000

const server = createServer(async(req, res) => {
  const destinations = await getDataFromDB()
  if (req.url === '/api' && req.method === 'GET'){
    res.end(JSON.stringify(destinations))
  }
  
})

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))