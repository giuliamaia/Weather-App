import httpClient from "../api";

export async function getWeather({city, state}) {
    try {
        const CITY = city.replace(/ /g, '%20')
        const STATE = state.replace(/ /g, '%20')
        const response = await httpClient.get(`/city/?city=${CITY},${STATE}`)
        return response.data
    } catch (error) {
        console.log('error: getWallets')
    }
}