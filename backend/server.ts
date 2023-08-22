import { Request, Response } from 'express'; 'express'
import express from 'express';

// middleware
const app = express()
app.use(express.json())

// routes
app.get('/health', (req: Request, res: Response) => {
    res.status(200).send({message: "Servidor Ok"})
})

// Server
app.listen(3002, () => console.log("Servidor rodando na porta 3002"))