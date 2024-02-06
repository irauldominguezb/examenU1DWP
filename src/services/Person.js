import  api from "../config/http-client.gateway"

const saveCar = async (vehicle) => {
    try {
        const response = await api.doPost("vehiculos", vehicle)
        return response
    } catch (error) {
        throw new Error(error)
    }
}

const getCars = async (pagination) => {
    try {
        const response = await api.doPost("vehiculos/page", pagination)
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export default {
    saveCar, getCars
}