import express, { request } from 'express'

import { Router, Request, Response } from 'express';

const app = express();

const route = Router()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Testing API' })
})

app.use(route)

app.listen(3333, () => 'server running on port 3333')