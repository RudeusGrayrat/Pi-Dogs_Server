const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Temperaments } = require('../db');

const getTemperaments = async (req, res) => {
    try {

        const temperamentsInDB = await Temperaments.findAll();
        if (temperamentsInDB.length == 0) {
            const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?apy_key=${YOUR_API_KEY}`);
            const apiTemperaments = apiResponse.data;
            const temp = new Set();
            apiTemperaments.forEach(dog => {
                dog.temperament?.split(', ').forEach(temperament => temp.add(temperament.trim()));
            });
            const uniqueTemperaments = [...temp];
            const savedTemperaments = await Temperaments.bulkCreate(
                uniqueTemperaments.map((temperament) => {
                    return { name: temperament };
                })
            );
            res.status(200).json(savedTemperaments);
        } else {
            res.status(200).json(temperamentsInDB);


        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los tipos de Pokémon' });
    }
};

module.exports = getTemperaments;
