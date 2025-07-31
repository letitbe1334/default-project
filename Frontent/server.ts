'use strict'

import express, { Request, Response } from 'express'

const app = express()
const port = 50001

app.get('/', (req: Request, res: Response) => {
  res.type('text/plain')
  res.send(`Hello, Typescript!`)
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
