const { Router } = require('express');
const axios = require ('axios');
const {Dog , Temperament} = require ('../db.js')
const router = Router();



const dogsApi = async ()=> {
    const doggyApi = await axios ('https://api.thedogapi.com/v1/breeds')
    const dogMap = await doggyApi.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name ,
            height :hgt=dog.height.metric?.split(" - "),
            heightMin:hgt[0],
            heightMax:hgt[1],
            weight : wgt= dog.weight.metric?.split(" - "),
            weightMin:wgt[0],
            weightMax: wgt[1],
            life_span : dog.life_span,
            temp : dog.temperament,
            image: dog.image.url,
        }
    })
    return dogMap
}

    
                     


 const databaseDog = async () => {
              return await Dog.findAll({
                     include: {
                         model: Temperament,
                         attributes : ['name'],
                         through: {
                         attributes: [],
                     },
                 }
             })
        }

 const getAllDogs = async ()=>{
     let dogMap = await dogsApi();
     const dbMap = await databaseDog();
     const allMap = await dogMap.concat(dbMap);
     return allMap;
 }


router.get ('/',async (req , res)=>{
    const name = req.query.name
    let allDogs = await getAllDogs();
    if(name){
        let dogsName = await allDogs.filter(all => all.name.toLowerCase().includes(name.toLowerCase()))
        dogsName.length?
        res.status(200).send(dogsName) :
        res.status(404).send('Name of dog not found');
    } else {
        res.status(200).send(allDogs)
    }
}) 

router.post('/', async function(req, res, next) {
    const {name, heightmin,heightmax, weightmin,weightmax, life_span,image } = req.body
    const createdDog = await Dog.create({
      name,
      life_span,
      heightmin,
      heightmax,
      weightmin,
      weightmax,
      image,
    });
    res.send(createdDog)
  });

  router.get('/:id', async (req, res)=>{
    const id= req.params.id;
    const dogsTotal = await getAllDogs()
    if(id){
        let dogId = await dogsTotal.filter(el => el.id == id)
        dogId.length?
        res.status(200).json(dogId):
        res.status(404).send("race couldnt found")
    }
})
module.exports = router;