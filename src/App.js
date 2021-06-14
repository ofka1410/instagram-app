
import './App.css';
import Loged from './loggedComp/Loged'
import Main from './mainComp/Main'
import  {useState,useEffect} from 'react';
function App() {
  const[token,setToken]=useState('')
  useEffect(async()=>{
    const user= (localStorage.getItem('userNow'))
    console.log(user)
     if (user!==null){
       setToken('ok')
     }
    },[])
    if(!token){
      return(
        <div  className="App">
  <Loged
  setToken={setToken}
  token={token}/>
        </div>
      )
    }
    else{
      return (
        <div className="App">
         <Main
         setToken={setToken}
         token={token}/>
        </div>
      );}
      
}

export default App;
