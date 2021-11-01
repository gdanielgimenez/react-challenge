import React, {useState} from "react";
import { useFormik } from "formik";
import { heroName } from "./api";
import { useHistory, Redirect } from "react-router";
import {Button, Card, Container,Grid, Row,Col,Alert,Form} from 'react-bootstrap';
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
            <Form onSubmit={formik.handleSubmit} >
                <Form.Group>
                <Form.Label htmlFor="name"> Search </Form.Label>
                <Form.Control 
                size="sm"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                
                    <Alert size="lg" variant="danger center mt-2 mb-0">
                        {formik.errors.name}
                    </Alert>
                
                ):null}
                </Form.Group>
                
                <Button type="submit" variant="primary mb-2">search</Button>{' '}
                <br/><Button type="button"  variant="primary mb-2" onClick={()=>{history.push('/heroes')}}>check my team</Button>
                
            </Form>
        )
    }
        const displayResults = heroSearch.length ? (
            heroSearch.map((hero,i) =>{
                return(
                    
                    <Col sm={12} md={6} lg={4}>                
                       <Card  className="m-3" lg={12} md={6} style={{width:'18rem'}} key={hero.id}>
                            <Card.Body>
                                <Card.Title variant="center">
                                    {hero.name}
                                </Card.Title>
                                <Card.Img variant="bottom"  src={hero.image.url} />
                                <div className="d-grid">
                                <Button variant="primary mt-3 mb-2" size="lg"  onClick={()=>{addTeam(heroSearch[i])}}>add to team</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col> 
                )
            })
        ):(null)

    if(!window.localStorage.isLogged ){
        return  <Redirect to="/"/>
            }else{
         return(
                <div>
                <Container variant="center">
                     <SearchForm />
                    <Row > 
                        {displayResults}
                    </Row> 
                </Container>
               
                </div>
               )
            }
}
export default Search;