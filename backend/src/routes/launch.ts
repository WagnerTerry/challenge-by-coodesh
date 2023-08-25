import { Request, Response } from 'express';
import express from 'express';
import { ParsedQs } from 'qs';
const Launch = require('../model/Launch')

const apiService = require('../service/APIService');

// middleware
const router = express()
router.use(express.json())

let savedData: any = null;

// routes
const BASEURL = 'https://api.spacexdata.com/v5/launches'

router.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: "Fullstack Challenge 🏅 - Space X API" })
})

router.get('/launches', async (req: Request, res: Response) => {
    try {
        const apiData = await apiService.fetchDataFromAPI(BASEURL);

        const page: number = parseInt(req.query.page as string, 10) || 1; // Página padrão é 1
        const limit: number = parseInt(req.query.limit as string, 10) || 4; // Limite padrão é 4
        const itemName = req.query.name || ''; // Nome padrão é vazio

        const filteredItems = apiData.filter((item: { name: (string | ParsedQs | string[] | ParsedQs[])[]; }) => item.name.includes(itemName));

        const totalItems: number = filteredItems.length;
        const totalPages: number = Math.ceil(totalItems / limit); // Arredondamento para cima

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedItems = filteredItems.slice(startIndex, endIndex);

        const hasNext: boolean = page < totalPages;
        const hasPrevious: boolean = page > 1;

        const totalDocs = paginatedItems.length * totalPages

        savedData = {
            results: paginatedItems,
            totalDocs,
            page,
            totalPages,
            hasNext,
            hasPrevious
        }

        res.json({
            results: paginatedItems,
            totalDocs,
            page,
            totalPages,
            hasNext,
            hasPrevious
        });

    } catch (error) {
        res.status(400).json({ "message": "Error message" })
    }
})

router.get('/launches/stats', async (req: Request, res: Response) => {
    const launchResult: { [key: string]: number } = {};

    const allLaunches = await apiService.fetchDataFromAPI(BASEURL);
    const countLaunch = allLaunches.map((launch: { success: any; }) => launch.success)
    countLaunch.forEach((item: string | number) => {
        if (launchResult[item] !== undefined) {
            return launchResult[item]++;
        } else {
            return launchResult[item] = 1;
        }
    })
    const rocket = allLaunches.map((launch: { name: any; rocket: any; cores: { reused: any; }[]; }) => { return { name: launch.name, rocket: launch.rocket, reused: launch.cores[0].reused } })

    res.status(200).json({ launchResult, rocket })
})

router.get("/launch", async (req: Request, res: Response) => {
    try {
        const launch = await Launch.find()
        await Launch.create(launch)
        res.status(200).json(launch)
    } catch (error) {
        res.status(500).json({ message: "Error message", error })
    }
})


router.post("/launch", async (req: Request, res: Response) => {
    const { name, rocket, success } = req.body

    const launch = {
        name,
        rocket,
        success
    }

    try {
        await Launch.create(launch)
        res.status(204).send()
    } catch (error) {
        res.status(400).json({ message: "Error message", error })
    }
})

module.exports = router