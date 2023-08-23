import { Request, Response } from 'express'; 'express'
import express from 'express';

const apiService = require('./src/service/APIService');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

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

        const page: number = parseInt(req.query.page as string, 10) || 1; // Página padrão é 1
        const limit: number = parseInt(req.query.limit as string, 10) || 4; // Limite padrão é 4
        const itemName = req.query.name || ''; // Nome padrão é vazio

        const filteredItems = apiData.filter(item => item.name.includes(itemName));

        const totalItems: number = filteredItems.length;
        const totalPages: number = Math.ceil(totalItems / limit); // Arredondamento para cima

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedItems = filteredItems.slice(startIndex, endIndex);

        const hasNext: boolean = page < totalPages;
        const hasPrevious: boolean = page > 1;

        res.json({
            results: paginatedItems,
            page,
            totalPages,
            hasNext,
            hasPrevious
        });

    } catch (error) {
        res.status(400).json({ "message": "Error message" })
    }
})

// conexão com o mongoDB Atlas
const PORT = process.env.PORT || 3003
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.j3kkis4.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Conectado ao MongoDB Atlas na porta: ", PORT)
        app.listen(PORT)
    })
    .catch((error: string) => {
        console.log("erro ao conectar ao banco.", error)
    })