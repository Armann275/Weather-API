const axios = require('axios');
const {createClient} =  require('redis');
const client = createClient();
require('dotenv').config();
const CACHE_TTL = 24 * 60 * 60;

async function connectRedis() {
    try {
        await client.connect(); 
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Error connecting to Redis', err);
    }
}

async function saveCache(city,forecast){
    await client.setEx(city,CACHE_TTL,JSON.stringify(forecast));
}

async function getCache(city) {
    const data = await client.get(city);
    return data
}

async function getWeatherApi(city){
        const cachedData = await getCache(city);
        if (cachedData) { 
            return JSON.parse(cachedData);
        }
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${process.env.API}&contentType=json`;
        const response = await axios.get(url);
        const data = response.data;

        const forecast = data.days.slice(0, 3).map(day => ({
            date: day.datetime,
            tempMax: day.tempmax,
            tempMin: day.tempmin,
            conditions: day.conditions
        }));
        await saveCache(city,forecast);
        return forecast
}

async function getWeather(req,res,next){
    try {
        const weather = await getWeatherApi(req.params.city);
        return res.status(200).json(weather);
    } catch (error) {
        next(error);
    }
}

connectRedis();
module.exports = {getWeather}
