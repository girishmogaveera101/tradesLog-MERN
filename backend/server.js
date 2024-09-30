const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('mongoose')


const server = express();
server.use(cors());
server.use(bodyParser.text());
server.use(bodyParser.json());

mongo.connect('mongodb://127.0.0.1:27017/MyDatabase')
    .then(() => {console.log("db connected..")})
    .catch(err=> console.log(err));

const UserSchema = new mongo.Schema({
    username : String,
    email : String,
    phone : String,
    password : String
});

const signinData = mongo.model('signinData',UserSchema);

server.post('/signin', async(req,res) => {
    const {username, email, phone , password} = req.body;

    if(!username){
        res.status(404).json({msg:"error"});
    }
    const newUserData = {username, email, phone, password};
    const existUser = await signinData.findOne({username : username});
    if(existUser){
        res.status(400).json({msg:"username already in use.."})
    }
    else{
        const temp = new signinData(newUserData);
        await temp.save();
        // const newUser = {...temp,"msg":"signin successfull.."};
        res.status(200).json(temp);
    }
});


server.post('/login', async(req,res) => {
    const {username,password} = req.body;

    if(!username){
        res.json({msg:"error"});
    }
    const trueUser = await signinData.findOne({username});
    if(trueUser){
        res.status(200).json(trueUser)
    }
    else{
        res.status(404).json({"msg" : "User not found.."});
    }
});

server.post('/home',async(req,res)=> {
    const {tradeID,comment} = req.body;
    if(tradeID){
        console.log(tradeID);
    }
    res.send({msg:"new Entry Recieved"});
});


server.post('/allTrades',async(req,res)=> {
    const {tradeID,comment} = req.body;
    if(tradeID){
        console.log(tradeID);
    }
    res.send({msg:"new Entry Recieved"});
})


server.listen(3001,() => {
    console.log("Server listening on port 3001...")
});