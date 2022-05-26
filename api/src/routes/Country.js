const { Router } = require('express');
const { Country } = require('../db.js');
const axios = require("axios")

const router = Router();

router.use("/", async (req, res, next)=>{
    let countries
    try{
        countries = await axios.get("https://restcountries.com/v3/all")
        countries = countries.data.map(c=>{ return{
            id: c.cca3,
            name: {common: c.name.common, official: c.name.official},
            flag: c.flags[1],
            continents: c.continents,
            capital: c.capital ? c.capital : ["NO CAPITAL"],
            subregion: c.subregion,
            area: c.area,
            population: c.population,
        }})
        await Country.bulkCreate(countries, {ignoreDuplicates: true,});
    }catch(e){
        next(e);
    }
    next();
})
router.get("/:id", async (req, res, next)=>{
    let {id} = req.params;
    try{
        let country = await Country.findByPk(id)
        res.status(200).json(country)
    }catch(e){
        next(e);
    }
})

router.get("/", async (req, res, next)=>{
    let {name} = req.query;
    try{
        let countries = await Country.findAll()
        // countries = countries.map(c=> {return c.dataValues})
        if(name){
            countries = countries.filter(c=> { return(
                (c.name.toLowerCase()).includes(name.toLowerCase())
            )})
            if(countries.length === 0){
                return res.status(404).send("No country with that name was found")
            }
        }
        res.status(200).json(countries)
    }catch(e){
        next(e);
    }

})


module.exports= router;