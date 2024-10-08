const axios = require('axios');

const getDogsByName = async (req, res) => {
    try {
        const { name } = req.query

        const apiResponse = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
        const apiPokemon = apiResponse.data;
        return res.status(200).json(apiPokemon);
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los tipos de Pokémon' });
    }
};

module.exports = getDogsByName;
