import React from "react";
import { useFormik } from "formik";
import {Redirect, useHistory} from 'react-router-dom';
import axios from "axios";
import "./styles.css";


const validate = (values) =>{
    let errors ={};
    if(!values.firstName){
        errors.firstName ="Required";
    }else if(values.firstName.length <4){
        errors.firstName="Must be longer than 4 characters"
    }
    if(!values.lastName){
        errors.lastName="Required"
    }else if(values.lastName.length <4){
        errors.lastName="must be at least 4 characters long"
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
              firstName:"",
              lastName:"", 
              email: "" 
              },
              validate,
          onSubmit: async(values) => {
            //alert(JSON.stringify(values, null, 2));
            //token(values.email,values.lastName)
            const data ={email:values.email,password:values.lastName} 
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
          <div>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur ={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div>:null}
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div>:null}
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div>:null}
            <br/>
            <button type="submit">Submit</button>
          </form>
          </div>
        );
      };
      return(
          <div>
              <SignupForm />
          </div>
      )      
}
export default Login;