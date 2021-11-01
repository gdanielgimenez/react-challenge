import React, { useState,useEffect,useLayoutEffect } from 'react';
import {Redirect, useHistory} from 'react-router-dom'
import {Button, Card, Container, Row,Col, Navbar} from 'react-bootstrap';

function Heroes({team,deleteMember}){
    const [teamUp,setTeamUp] = useState(team)
   
    let history = useHistory();
    const logOut = ()=>{
     window.localStorage.clear();
     window.location.reload();   
    }
    const eraser = (member)=> {
         let newTeam = team;
          console.log(newTeam)
         const updatedMembers = newTeam[0].filter(hero => hero.id !== member.id)
        console.log(updatedMembers)
        newTeam[0]=updatedMembers;
        team =newTeam;
        setTeamUp(team)
        console.log("team at zero")
       deleteMember(newTeam, member)
       history.push("/search")
    
    }
    const displayTeam =  team[0] && team[0].length>0 ? (
            team[0].map((member,i) =>{
            return(
                <Col sm={12} md={6} lg={4}>                
                <Card key={member.id}  className="m-3" lg={12} md={6} style={{width:'18rem'}} >
                     <Card.Body>
                         <Card.Title variant="center">
                            {member.name}
                         </Card.Title>
                         <Card.Img variant="bottom"  src={member.image} />
                         <div className="d-grid">
                         <Button variant="primary mt-3 mb-2" size="lg"  onClick={()=>{eraser(member)}}>Remove</Button>
                         </div>
                     </Card.Body>
                 </Card>
             </Col> 
            )
        })
    ):(null)                    
    //useLayoutEffect(()=>{
    //},[])

     if(!window.localStorage.hasOwnProperty('isLogged')){
        return <Redirect to="/"/>;
    }else{
        return(
            <div>        
                <Navbar bg="primary" variant="dark">
                        <Container>
                        <Navbar.Brand >
                        Build your team of heroes!
                        </Navbar.Brand>
                        </Container>
                    </Navbar>
                <Container>
                <Button variant="secondary mt-3" onClick={()=>{logOut()}}>log out</Button>
                <Button variant="primary mt-3" onClick={()=>{history.push('/search')}}>Search heroes</Button>
                
            </Container>
            <Row>
            {displayTeam}
            </Row>
        </div>
        )}
    }
export default Heroes;