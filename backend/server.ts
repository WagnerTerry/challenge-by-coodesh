import express from 'express';

const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const launch = require('./src/routes/launch')
const Launch = require('./src/model/Launch')
const cron = require('node-cron');


// middleware
const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use("/", launch)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


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

// Configurando CRON
cron.schedule('0 */9 * * *', async () => {
    console.log("iniciar cron")
    try {

        const launch = await Launch.find()
        await Launch.create(launch)

        const newLaunch = launch[0]

        const novoDado = new Launch({
            name: newLaunch.name,
            rocket: newLaunch.rocket,
            success: newLaunch.success,
            reused: newLaunch.reused

        });

        await novoDado.save();
        console.log('Lançamento salvo!');

    } catch (error) {
        console.error('Erro ao armazenar informação:', error);
    }
});