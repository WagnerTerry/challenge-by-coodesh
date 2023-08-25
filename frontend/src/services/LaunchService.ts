import axios from 'axios'

const BaseURL = "http://localhost:3002"

export default class LaunchService {
    static showMessage = async () => {
        const result = await axios.get(`${BaseURL}`)
        return result.data
    }

    static getStats = async () => {
        const result = await axios.get(`${BaseURL}/launches/stats`)
        return result.data
    }
}