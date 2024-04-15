const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require("../controllers/getDogs");
const getDogsById = require("../controllers/getDogsById");
const getTemperaments = require("../controllers/getTemperaments");
const postDogs = require("../controllers/postDogs");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", getDogs);
router.get("/dogs/:idRaza", getDogsById);
router.get("/temperaments", getTemperaments);
router.post("/dogs", postDogs);

module.exports = router;
