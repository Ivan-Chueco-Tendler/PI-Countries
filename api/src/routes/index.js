const { Router } = require('express');
const CountriesRoutes = require("./Country")
const ActivitiesRoutes = require("./Activity")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", CountriesRoutes);
router.use("/activity", ActivitiesRoutes);


module.exports = router;
