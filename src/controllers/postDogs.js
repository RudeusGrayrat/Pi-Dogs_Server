const { Dog, Temperaments } = require('../db');
const { v2: cloudinary } = require('cloudinary');

const postDogs = async (req, res) => {

    cloudinary.config({
        cloud_name: 'dig187b3x',
        api_key: '246788155498993',
        api_secret: 'zlE4YHUn0k6QG-cL8Sz_llYSx7k'
    });
    console.log('Body de la solicitud:', req.body);

    const {
        name,
        height,
        weight,
        life_span,
        temperament
    } = req.body;


    try {
        let imageUrl = null;
        if (req.file) {
            // Sube la imagen a Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        console.log("name", name);

        // Si no existe, crear el nuevo Pokémon
        const newDog = await Dog.create({
            imagen: imageUrl,
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