import axios from 'axios';

const heroToken ='10227448334653232'

export const getHeroes = async()=>{
    const heroToken ='10227448334653232'
    await axios.get(`https://superheroapi.com/api.php/10227448334653232/69`)
    .then(res =>{
        console.log(res.data)
    }).catch((error) =>{
        console.log(error)
    })
    console.log("heroe's list")
}

export const heroName =  async(name)=>{
    //https://superheroapi.com/api.php/access-token/search/name
    
    await axios.get(`https://superheroapi.com/api.php/${heroToken}/search/${name}`)
    .then(res =>{
        console.log(res.data)
    }).catch((error)=>{
        console.log(error)
    })
}


