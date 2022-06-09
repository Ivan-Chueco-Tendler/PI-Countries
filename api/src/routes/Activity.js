const { Router } = require('express');
const {Op} = require("sequelize")
const { Activity, Country } = require('../db.js');


const router = Router();

router.get("/", async (req, res, next)=>{
    try{
        let activities = await Activity.findAll()
        res.status(200).json(activities)
    }catch(e){
        next(e);
    }
})

router.post("/", async (req, res, next)=>{
    let {name, difficulty, hours, minutes, seasons, countries} = req.body;
    try{
        if(hours === "") {
            hours = "0";
        } else if (minutes === ""){
            minutes = "0"
        }
        if (!name){
            res.status(400).send("A name for the activity is needed.")
        }
        let existingActivity = await Activity.findAll({include:{model: Country, attributes: ["name"]}})
        
        existingActivity = existingActivity.map(act=>{
            if(act.dataValues.name === name && 
            act.dataValues.difficulty === difficulty && 
            act.dataValues.duration === `${hours} hour(s) ${minutes} minute(s)` &&
            act.dataValues.seasons[0] === seasons[0])
            return act;
        })
        if(existingActivity[0]){
            return res.status(200).send(`Activity ${name} already exists!`)
        } else {
            const createdAct = await Activity.create({
                name,
                difficulty,
                duration: `${hours} hour(s) ${minutes} minute(s)`,
                seasons,
            })
            const countriesModels = await Country.findAll({
                where: {
                    name: countries
                }
            })
            await createdAct.addCountries(countriesModels)
            res.status(200).send(`Activity ${name} created successfully!`)
        }
    }catch(e){
        next(e);
    }
})

module.exports= router;