import { Request, Response } from 'express'; 'express'
import express from 'express';
const apiService = require('./src/service/APIService');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
//const { MongoClient, ServerApiVersion } = require('mongodb');

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