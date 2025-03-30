const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('mongoose');
const { default: mongoose } = require('mongoose');
require('dotenv').config();



const port = process.env.PORT || 3000;





const server = express();
// server.use(cors());


const corsOptions = {
    origin: 'https://tradeslog.vercel.app', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  };
  
server.use(cors(corsOptions));
// server.use(bodyParser.text());
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.json());













// local machine
// mongo.connect('mongodb://127.0.0.1:27017/MyDatabase')
mongo.connect(process.env.MONGO_URI)
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
        const userCol = mongoose.connection.createCollection(username);
        // const newUser = {...temp,"msg":"signin successfull.."};
        res.status(200).json(temp);
    }
});






server.post('/login', async(req,res) => {
    const {username,password} = req.body;

    if(!username){
        res.json({msg:"error"});
    }
    // console.log(username,password)
    const trueUser = await signinData.findOne({username,password});
    const trueUser1 = await signinData.findOne({username});
    console.log(trueUser)
    if(trueUser1){
        if(trueUser){
            // console.log(trueUser)
            res.status(200).json(trueUser)
            console.log("successfull login")
        }
        else{
            res.status(401).json({"msg" : "Incorrect Password.."})
            console.log("incorrect password")
        }
    }
    else{
        res.status(404).json({"msg" : "User not found.."});
        console.log("user not found")
    }
});








server.post('/entry',async(req,res)=> {
    const { username, tradeID, coin, amount, strategy, leverage, entryPrice, entryOn, closePrice, closeOn, pnl, comment } = req.body;
    if(!username || !tradeID){
        res.status(404).send({msg:"error 1"});
    }
    // const tradeID = Math.floor(1000 + Math.random() * 9000);
    const userCol = mongoose.connection.collection(username);
    const isTradedID = await userCol.findOne({tradeID});
    console.log(isTradedID)
    if(isTradedID){
        console.log("tradeId already exists");
        return res.status(400).send({msg:"TradeID already Exists!"});
    }
    const entry = { tradeID,coin, amount, strategy, leverage, entryPrice, entryOn, closePrice, closeOn, pnl, comment }
    console.log(entry);
    const status = await userCol.insertOne(entry);
    if(status){
        return res.status(200).send({msg:"Success"})
    }
    else{
        return res.status(404).send({msg:"error 2"});
    }
   
});






server.post('/allentry', async(req,res) => {
    const {username} = req.body;
    const userCollect = mongoose.connection.collection(String(username));
    const allEntry = await userCollect.find({}).toArray();
    // console.log(allEntry)
    if(allEntry){
        // res.send({msg : "ok"});
        return res.send(allEntry).status(200);
    }
    return res.send({msg : "No entry found!"}).status(404);
    // console.log("Username : ",username)
});











server.post('/updatetrade', async(req,res)=> {
    const {username, tradeID, closePrice, closeOn, pnl, comment} = req.body;
    if(!username){
        res.send({msg:"error"}).status(400);
    }
    const userCollection = mongoose.connection.collection(String(username));
    const tradeData = await userCollection.findOneAndUpdate({tradeID : tradeID},[{ $set: { closePrice: closePrice,closeOn:closeOn,pnl:pnl,comment:comment } }],{new:true});
    console.log(tradeData);
    if(tradeData.length==0){
        res.send({msg:"data not found"}).status(404);
    }
    res.send({msg:"updated sucessfully"}).status(200);



})










server.listen(port,() => {
    console.log("Server listening on port : ",port)
});