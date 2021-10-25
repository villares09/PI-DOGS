 const router = require('express').Router();
 const {Temperament} = require('../db');
 const {default: axios} = require('axios');

 router.get('/', async (req, res)=>{
    const temperamentsUrl = await axios.get ('https://api.thedogapi.com/v1/breeds')
    const temperamentsApi = temperamentsUrl.data.map(response => {
        return {
          temperament: response.temperament
        }
    })
    const allTemps = temperamentsApi.filter(data => data.temperament !== undefined)
    const array1 = []
    const array2 = []
    allTemps.map(el => {
        array1.push(el.temperament.split(','))
        array1.map(ella => {
            for (let i = 0 ; i< ella.length; i++){
                array2.push(ella[i].trim())
            }
        })
    })
    const allTemperaments = array2.reduce((a,e)=>{
        if(!a.find(d => d == e)){
            a.push(e)
        }
        return a

    },[])
     allTemperaments.map((data) => {
        return Temperament.findOrCreate({
          where:{
            name: data,
          }
        })
      })
      let allTemp = await Temperament.findAll();
       res.send (allTemp)
})
 module.exports = router;