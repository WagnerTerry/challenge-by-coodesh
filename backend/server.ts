import express from 'express';

const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const launch = require('./src/routes/launch')

// middleware
const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use("/", launch)

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