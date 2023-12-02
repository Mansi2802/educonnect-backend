const express=require("express");
const app=express();
const cors=require("cors")
const bodyParser = require("body-parser");
const User = require("./db/conn").User;
const Reg = require("./db/conn").Reg;
const Assignment = require("./db/conn").Assignment;
const multer = require("multer");
const upload = multer();

app.use(cors());
app.use(bodyParser.json());
app.use(upload.any());

app.get("/",(req,res)=>{
    res.send("this is the api for educonnect")
});


app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    console.log(email);
    try{
        const check=await User.findOne({email:email,password:password})
        console.log(check);
        if(check){

            res.json("exist")
        }
        else{
            res.json("notexist")
        }
    }
    catch(e){
        res.json("notexist")
        console.log(e)
    }
})

app.post("/EventRegister",async(req,res)=>{
    const {name,email,phone,event}=req.body
    console.log(name,email,phone,event);
    try{
        const regExists = await Reg.findOne({ email: email });
        const userExists = await User.findOne({ email: email});
        if(!userExists){
            res.json("User does not exist");
        }
        if (regExists) {
            res.json("Already registered");
        } else {
            const newReg = new Reg({ name, email, phone, event });
            const savedReg = await newReg.save();
            console.log(savedReg);
            res.json("User registered successfully");
        }
    }
    catch(e){
        res.status(500).json({ error: "Internal Server Error" });
        console.log(e);
    }
})
app.post("/Assignments",async(req,res)=>{
    const {Ano,email}=req.body;
    const files = req.files;
    console.log(Ano,email,files);
    try{
        const rollnoExists = await User.findOne({ email: email });

        if (!rollnoExists) {
            res.json("Wrong Email ID!");
            //alert("Wrong Email Id!");
        } 
        else {
            const newAssignment = new Assignment({Ano,email,files});
            const savedAssignment = await newAssignment.save();
            console.log(savedAssignment);
            res.json("Assignment Submitted successfully");
        }
    }
    catch(e){
        res.status(500).json({ error: "Internal Server Error" });
        console.log(e);
    }
})
app.listen(5000,()=>{
    console.log("port connected..");
})
