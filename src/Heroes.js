import React, { useState,useEffect,useLayoutEffect } from 'react';
import {Redirect, useHistory} from 'react-router-dom'


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
    //const [members] =team;
    const [totalStats] = team;
    console.log(totalStats)
    const teamStats =  team[1] && team[1].length? (
        
        team[1].map((stat,i)  =>{
            return(
            <div key={i}>
                <p>stats</p>
                <ul> combat : {stat.combat} </ul>    
                <ul> durability :{stat.durability} </ul> 
                <ul> combat :{stat.combat} </ul> 
                <ul> combat :{stat.combat} </ul> 
                <ul> combat :{stat.combat} </ul> 
                <ul> combat :{stat.combat} </ul> 
            </div>
        )
    })
    ):(null)

    const displayTeam =  team[0] && team[0].length>0 ? (
            team[0].map((member,i) =>{
            return(
                <div key={member.id}>
                    <h3> {member.name}</h3>
                    < img alt="profile" src={member.image} width="200" height="200"/><br />
                    <button>more details</button>
                    <button onClick={()=>{eraser(member)}}>remove</button>
                </div>
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
            <h3>Build your team of Super heroes! </h3>
                <button onClick={()=>{logOut()}}>log out</button>
                <button onClick={()=>console.log("test")}>Heroes</button>
                <button onClick={()=>{history.push('/search')}}>Search heroes</button>
                {teamStats}
                {displayTeam}
        </div>
        )}
    }
export default Heroes;