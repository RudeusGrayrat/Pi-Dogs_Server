const { Dog, Temperaments } = require('../db');

const postDogs = async (req, res) => {
    const {
        imagen,
        name,
        height,
        weight,
        life_span,
        temperament
    } = req.body;


    try {

        const existingDog = await Dog.findOne({
            where: {
                name: name
            }
        });

        // Si ya existe, enviar un mensaje de error
        if (existingDog) {
            return res.status(400).json({
                error: 'Ya existe un Perro con ese nombre.'
            });
        }

        // Si no existe, crear el nuevo Pokémon
        const newDog = await Dog.create({
            imagen,
            name,
            height,
            weight,
            life_span,
        });

        const temperamentsToAssociate = await Temperaments.findAll({
            where: {
                name: temperament
            }
        });

       
        await newDog.setTemperaments(temperamentsToAssociate);

        res.status(200).json(newDog);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al crear el nuevo Perro'
        });
    }
};

module.exports = postDogs;