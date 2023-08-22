import { Request, Response } from 'express'; 'express'
import express from 'express';
const apiService = require('./src/service/APIService');
// import apiService from './src/service/APIService'
// middleware
const app = express()
app.use(express.json())

// routes
const BASEURL = 'https://api.spacexdata.com/v5/launches'
app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: "Fullstack Challenge 🏅 - Space X API" })
})

app.get('/launches', async (req: Request, res: Response) => {
    try {
        const apiData = await apiService.fetchDataFromAPI(BASEURL);
        res.json(apiData)
    } catch (error) {
        res.status(400).json({ "message": "Error message" })
    }
})

// Server
app.listen(3002, () => console.log("Servidor rodando na porta 3002"))