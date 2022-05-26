const { Router } = require('express');
const {Op} = require("sequelize")
const { Activity, Country } = require('../db.js');


const router = Router();

router.post("/", async (req, res, next)=>{
    let {name, difficulty, duration, season, countries} = req.body;
    try{
        if (!name){
            res.status(400).send("A name for the activity is needed.")
        }
        const createdAct = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        })
        const countriesModels = await Country.findAll({
            where: {
                name: countries
            }
        })
        await createdAct.addCountries(countriesModels)
        res.status(200).send(`Activity ${name} created successfully!`)
    }catch(e){
        next(e);
    }
})

module.exports= router;