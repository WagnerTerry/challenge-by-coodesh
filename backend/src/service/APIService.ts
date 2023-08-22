import axios from 'axios'

async function fetchDataFromAPI(url) {
    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        throw new Error("Error message")
    }
}

module.exports = { fetchDataFromAPI };