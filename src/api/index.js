import axios from 'axios';

const heroToken ='10227448334653232'
const url ='https://superheroapi.com/api.php/'

export const heroName =  async(name)=>{

    try{
        const {data : {results}} = await axios.get(`${url}${heroToken}/search/${name}`);
        return {results};
       // return {id:results[0].id,name:results[0].name,powerstats:results[0].powerstats, image:results[0].image};
    }catch(error){
        console.log(error);
    }
}
