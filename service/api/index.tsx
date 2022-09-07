import axios from "axios";

const httpClient = axios.create({
    baseURL: 'https://weather.contrateumdev.com.br/api/weather'
})

export default httpClient