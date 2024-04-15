const axios = require('axios');
const { YOUR_APY_KEY } = process.env;
const { Dog, Temperaments } = require("../db");

const getDogsById = async (req, res) => {
    const isUUID = (str) => {
        const uuidRegex =
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidRegex.test(str);
      };
    try {
        const { idRaza } = req.params
        if (isUUID(idRaza)) {
            const dog = await Dog.findOne({
                where: { id: idRaza },
                include: [
                    {
                        model: Temperaments,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            })

            res.status(200).json(dog);
            
        } else {
            const apiResponse = await axios(`https://api.thedogapi.com/v1/breeds/${idRaza}`);
            const apiDogs = apiResponse.data;

            const ob = await axios(`https://api.thedogapi.com/v1/images/${apiDogs.reference_image_id}?apy_key=${YOUR_APY_KEY}`)
            const imagen = ob.data.url
            apiDogs.imagen = imagen

            return res.status(200).json(apiDogs);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los tipos de Pokémon' });
    }
};

module.exports = getDogsById;
