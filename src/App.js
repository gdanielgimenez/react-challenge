import React,{useState, useEffect} from "react";
import Login from './Login'
import Heroes from "./Heroes";
import Search from "./Search";
import { BrowserRouter as Router,Route, Switch,Redirect, useHistory } from "react-router-dom";

function App() {
  let totalStats,heightAverage,weightAverage;
  let members=[];
  const [team, setTeam] = useState([members,totalStats=[], heightAverage=0,weightAverage=0])
  const [authorize,setAuthorize]=useState([])
  const [good,setGood]=useState(0)
  const [evil,setEvil]=useState(0)
  //const [averages,setAverages]=useState([totalStats=0,heightAverage=0, weightAverage=0])  
  //setAverages([totalStats,heightAverage, weightAverage])
  let history=useHistory();

    useEffect(()=>{
       setAuthorize(window.localStorage.getItem('access_token')? true:false)
    },[team])
      
      //averageCalculations
      const hAverage = ()=>{
        console.log("hi")
      }
      //conditional of evil or good members
      const alignCheck = (member)=>{
        if(member.alignment==="good"){
            setGood(good+1);
            console.log("good hero added")
        }else{
            setEvil(evil+1)
            console.log("anti hero added")
        }
      }
      //function to add new members
    const  addTeam = (data) =>{ 
      const membs =[...members];
      let arrMembers = []
      let member={id:data.id,title:data.name,fullName:data.biography['full-name'], alias:data.biography.aliases, alignment:data.biography.alignment,image:data.image.url, powerstats:data.powerstats, work:data.work.base,weight:data.appearance.weight[1],height:data.appearance.height[1],eyes:data.appearance['eye-color'],hair:data.appearance['hair-color']}
      if(evil== 0 && good ==0){  
        arrMembers.push(member)
        //stats calculation
        let calArray= member.powerstats;
        console.log(calArray)
        //alignment check
        alignCheck(member);
        //
        setTeam([members=arrMembers,totalStats=calArray, heightAverage=parseInt(member.height,10),weightAverage=parseInt(member.weight,10)])
        console.log("first HERO added to the team")
        //setAverages([totalStats])
      }else{
        if((evil+good) <7){
            if(member.alignment ==="good" && good<3){
              let member={id:data.id,title:data.name,fullName:data.biography['full-name'], alias:data.biography.aliases, alignment:data.biography.alignment,image:data.image.url, powerstats:data.powerstats, work:data.work.base,weight:data.appearance.weight[1],height:parseInt(data.appearance.height[1],10),eyes:data.appearance['eye-color'],hair:data.appearance['hair-color']}
                //getting new member data and current team info so that we can update it
                console.log("adding good hero");
                alignCheck(member)
                let [members] = team;
                const tempArray = [...members];
                tempArray.push(member)
                console.log(tempArray)
                //add new member
                //setTeam([team[0]=tempArray])
                console.log("height acumulative")
                console.log(tempArray.length)
                let Stats = team[1];
                let totStats = [{combat:parseInt(Stats.combat,10)+ parseInt(member.powerstats.combat,10),durability :parseInt(Stats.durability,10)+parseInt(member.powerstats.durability,10), intelligence :parseInt(Stats.intelligence,10)+parseInt(member.powerstats.intelligence,10),speed :parseInt(Stats.speed,10)+parseInt(member.powerstats.speed,10), strength : parseInt(Stats.strength,10)+parseInt(member.powerstats.strength,10), power: parseInt(Stats.power,10)+parseInt(member.powerstats.power,10)}]; 
                let hStats = (team[2]+member.height)/(tempArray.length);
                console.log(hStats)
                console.log(totStats)
                console.log("total stats check")
                setTeam([members=tempArray, totalStats=totStats])
              }else if(member.alignment ==="bad" && evil<3){
                //add evil hero
                console.log("adding evil hero")
                let member={id:data.id,title:data.name,fullName:data.biography['full-name'], alias:data.biography.aliases, alignment:data.biography.alignment,image:data.image.url, powerstats:data.powerstats, work:data.work.base,weight:data.appearance.weight[1],height:data.appearance.height[1],eyes:data.appearance['eye-color'],hair:data.appearance['hair-color']}
                alignCheck(member)
                const tempArray = [...team[0]];
                tempArray.push(member)
                console.log(tempArray)
                //add new member
                setTeam([team[0]=tempArray])
                
              }else if(member.alignment ==="good"  && good==3 && evil<3){
                  alert("max 3 good aligment heroes per team")
              }else if( member.alignment ==="bad" && evil==3 && good<3){
                  alert("max 3 evil aligment heroes per team")
                }else if(member.alignment ==="neutral"){
                  alert("Neutral alignment not allowed")
                }
              }if((evil+good)> 5){
              alert("Full team! remove member to add a new one")
            }
          }
        }
        //function to remove a member from the team
       const deleteMember =  (newTeam, member)=>{ 
          setTeam(newTeam)
          member.alignment ==="good"?(
            setGood(good-1)
          ):(setEvil(evil-1))
          
          setTeam(newTeam)
          alert("team member removed!")     
        }    
  return (
         <div>
            <Router>
                <Switch>
                 <Route exact path="/">
                     <div>
                        <Login />
                    </div>
                </Route>
                <Route  exact path="/heroes">
                    < Heroes team={team}  deleteMember={deleteMember}/>
                </Route>
                <Route  exact path="/search">
                    < Search team={team} addTeam={addTeam}/>
                </Route>
                </Switch>
            </Router>
        </div>
          )
}
export default App;