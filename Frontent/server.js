import express from 'express'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const app = express()
const PORT = 50000
const HOST = '0.0.0.0'

app.use('/', express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(PORT, HOST)
