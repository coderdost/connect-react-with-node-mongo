const express = require('express');  //express is used to make a web server
const cors = require('cors');        //is used to grant permission to communicate node server with react server
const bodyParser = require('body-parser');   //THIS IS A MIDDLE WARE WHICH IS USED TO READ INSIDE BODY OF POST
const mongoose = require('mongoose');        //this is a help in interacting with mongodb and making changes to it`

main().catch(err => console.log(err));       //Used to catch error in database if it appears

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  console.log('db connected')
}
const userSchema = new mongoose.Schema({             //Here we assign datatype to the data and validate and filter the data
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);     //Here user is the name the collection and user scheme has data inside it
                                                     //User acts as a class                                                    

const server = express();                    //used to create a server

server.use(cors());                          //this is .use which is a middleware it can change request between client and server
server.use(bodyParser.json());               //WE HAVE TO USE JSON IN BODYPARSER

// CRUD - Create
server.post('/demo',async (req,res)=>{
     
    let user = new User();                   //This Stateme is creating object of User class and in user there is information 
                                             //For changing database change the object and the changes will be reflected in database

    user.username = req.body.username;       //REQ IS DATA FROM FRONTEND WHICH HAS A BODY AND INSIDE IT IT HAS USERNAME
    user.password = req.body.password;       
    const doc = await user.save();          //In mongodb it will be saved as doc and it will be documnet 

    console.log(doc);                        //PRINTS WHATEVER FRONTEND HAS SEND 
    res.json(doc);                           //SEND THE RESPONSE TO FRONTEND 
})

server.get('/demo',async (req,res)=>{       //get is a server method where /demo is path  req is request  res is respond
    const docs = await User.find({});       //req is any data from frontend comes to req
    res.json(docs)                          //respond is any data which has to be send to frontend comes to res
                                            //get request can be run through url
})

server.listen(8080,()=>{                    //server.listen at request to port 8080 will listen here
    console.log('server started')                
})
