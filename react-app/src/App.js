 import logo from './logo.svg';
import './App.css';
 import { useEffect, useState } from 'react';

function App() {
    const [form, setForm] = useState({});  // use state is used to store the event //form is the object and setform is its setter
    const [users, setUsers] = useState([]); 

  const handleForm = (e)=>{
    setForm({
      ...form,                                   //No changes will be overridden it will be continues in form object
      [e.target.name] : e.target.value           //Thus username:Meet will bw stored in form object         
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();                                          //thus it helps us to see event on console without it being lost
    const response = await fetch('http://localhost:8080/demo',{  //here url in fetch is of the server get   
      method:'POST',                                             //also here we can also write get and there is a link between this get and the get we have used in node server it helps to connect the same
      body:JSON.stringify(form),                                 //also whatever we take throught get gets reflected through url
      headers:{                                                  //Here POST METHOD IS USED TO SEND DATA TO SERVER 
                                                                 //HERE IN BODY WE CAN SEND DATA AND WE HAVE TO SEND IT IN STRING FORMA
        'Content-Type':'application/json'                        //HEADERS HELPS IN GIVING ADDITIONAL INFORMATION 
      }
    }) 
    const data = await response.json();
   console.log(data);
  }

  const getUsers = async ()=>{
    const response = await fetch('http://localhost:8080/demo',{          //Fetching the data from database
      method:'GET',
    })
   const data = await response.json();                                   //reading it in json format
   setUsers(data);
  }

  useEffect(()=>{
    getUsers();
  },[])

  return (
    <div>
      <form onSubmit={handleSubmit}>                                                        
        <span>username</span>
        <input type="text" name="username" onChange={handleForm}></input>                   
        {/* //here handle form will track the event change and will store the value */}
                                                                                            
        <span>password</span>
        <input type="text" name="password" onChange={handleForm}></input>
        <input type="submit"></input>
      </form>
      { <div>
        <ul>
          {users.map(user=><li key={user._id}>{user.username},{user.password}</li>)}
        </ul>
      </div> }
    </div>
  )
}

export default App;


