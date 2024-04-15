require('dotenv').config();
const { Op } = require('sequelize');
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Dog, Temperaments } = require("../db");

const getDogs = async (req, res) => {
    try {
        const { name } = req.query;

        if (name) {

            const localDog = await Dog.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`,
                    },
                },
                include: {
                    model: Temperaments,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                },
            });
            if (localDog.length === 0) {
                const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/search?name=${name}&api_key=${YOUR_API_KEY}`);
                const apiName = apiResponse.data;
                return res.status(200).json(apiName);
            }
            return res.status(200).json(localDog);

        } else {
            const dogsBD = await Dog.findAll({
                include: {
                    model: Temperaments,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                },
            });
            const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
            const dogs = apiResponse.data;
        
            const allDogs = [...dogsBD, ...dogs]
            return res.status(200).json(allDogs);
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los tipos de Pokémon' });
    }
};

module.exports = getDogs;
