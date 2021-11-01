import React, {useState} from "react";
import { useFormik } from "formik";
import { heroName } from "./api";
import { useHistory, Redirect } from "react-router";
import {Button, Card, Container,Grid} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const validate = (values)=>{
    let errors={};
    if(!values.name){
        errors.name ="Required";
    }
    return errors;
};


const Search = ({addTeam})=>{
    const [heroSearch,setHeroSearch] = useState([]) 
    const SearchForm=()=>{
        let history=useHistory();
        const formik = useFormik({
            initialValues:{
                name:"",
            },
            validate,
            onSubmit: async(values) =>{
                //alert(JSON.stringify(values,null,2))
                const res = await heroName(values.name)
                console.log(res)
                setHeroSearch(res.results)
            },
        });
        return(
            <form onSubmit={formik.handleSubmit} >
                <label htmlFor="name"> Search </label>
                <input
                 id="name"
                 name="name"
                 type="search"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.name} 
                />
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div>:null}
                <br/><Button type="submit" variant="primary mb-2">search</Button>{' '}
                <br/><Button type="button"  variant="primary mb-2" onClick={()=>{history.push('/heroes')}}>check my team</Button>
            </form>
        )
    }
        const displayResults = heroSearch.length ? (
            heroSearch.map((hero,i) =>{
                return(
                    <Container key={hero.id}>
                        <Card style={{width:'18rem'}}>
                            <Card.Body>
                                <Card.Title variant="center">
                                    {hero.name}
                                </Card.Title>
                                <Card.Img variant="bottom" size="small" src={hero.image.url} />
                                <Button variant="primary mt-3 mb-2" onClick={()=>{addTeam(heroSearch[i])}}>add to team</Button>

                            </Card.Body>
                        </Card>
                    </Container>
                )
            })
        ):(<span> no results yet</span>)

    if(!window.localStorage.isLogged ){
        return  <Redirect to="/"/>
            }else{
         return(
                 <div variant="container">
                     <Container variant="center">
                    <SearchForm />
                    {displayResults}
                    </Container>
                </div>
               )
            }
}
export default Search;