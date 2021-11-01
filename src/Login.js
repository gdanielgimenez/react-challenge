import React from "react";
import { useFormik } from "formik";
import {Redirect, useHistory} from 'react-router-dom';
import axios from "axios";
import "./styles.css";
import {Button, Card, Container,Grid, Row,Col,Alert,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const validate = (values) =>{
    let errors ={};
    if(!values.password){
        errors.password ="Required";
    }else if(values.password.length <4){
        errors.password="Must be longer than 3 characters"
    }
    if(!values.email){
        errors.email="required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
    return errors;
};

function Login(props){ 
    //const {token,checkAuth,auth} = props;
    let history = useHistory();
    const SignupForm = () => {
        const formik = useFormik({
          initialValues: {
              password:"", 
              email: "" 
              },
              validate,
          onSubmit: async(values) => {
            //alert(JSON.stringify(values, null, 2));
            //token(values.email,values.lastName)
            const data ={email:values.email,password:values.password} 
             await axios.post('http://challenge-react.alkemy.org',data)
            .then(res =>{
              if(res.data.token){
                window.localStorage.setItem('access_token',res.data.token);
                window.localStorage.setItem('isLogged',true)
                console.log(res.status);
                history.push('/heroes')
                return res.status;
              }else{
                alert("Login failed")
              }
            }).catch((error)=>{
                console.log(error);
                alert((error));
            })
           //____________
          }
        });
        return (
          <Container rows={3} variant="center">
          <Form onSubmit={formik.handleSubmit}>
           <Form.Group >
            <Form.Label   htmlFor="password">Password</Form.Label>
            <Form.Control
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                />
                
                {formik.touched.password && formik.errors.password ? (
                
                  <Alert variant="danger mt-3 mb-2">
                  {formik.errors.password}
                  </Alert>
                  ):null}
                  </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <Alert variant="danger mt-3 mn-2">{formik.errors.email}</Alert>:null}
           </Form.Group>
           <br/>
            <Button type="submit" variant="primary" size="lg">Submit</Button>
          </Form>
          </Container>
        );
      };
      return(
          <Container sm={6} lg={8} variant="center">
              <SignupForm />
          </Container>
      )      
}
export default Login;