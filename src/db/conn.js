const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/educonnect")
.then(()=> console.log("connection successfull...."))
.catch((err)=>console.log(err));


const userSchema=new mongoose.Schema({
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true,
        minlength:[3,"minimum 3 letters"],
        trim:true
    }
})
const regSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    event: {
        type: String,
        required:true
    }
})
const AssignmentSchema=new mongoose.Schema({
    Ano: {
        type: Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    files: {
        type: Buffer,
        required:true
    }
})

const Assignment=new mongoose.model("Assignment",AssignmentSchema)
const Reg=new mongoose.model("Reg",regSchema)
const User=new mongoose.model("User",userSchema);

// mongoose.connection.collections['assignments'].drop(function (err) {
//     if (err) {
//         console.log('Error dropping collection: ', err);
//     } else {
//         console.log('Collection dropped');
//     }
// });

const createDocument= async()=>{
    try{
        const firstUser=new User({
            email: "sherrygarg@gmail.com",
            password: "sherrygarg"
        })

        const result=await User.insertMany([firstUser]);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
const createDocument2= async()=>{
    try{
        const firstReg=new Reg({
            name: "Mansi Bhardwaj",
            email: "mansibh@gmail.com",
            phone: "7711986923",
            event: "Xenith"
        })
        const secondReg=new Reg({
            name: "Vidushi Bhardwaj",
            email: "vidushibh@gmail.com",
            phone: "7711987923",
            event: "Techblocks 9.1"
        })

        const result=await Reg.insertMany([firstReg,secondReg]);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
const createDocument3= async()=>{
    try{
        const firstAssignment=new Assignment({
            Ano: "1",
            email:"20103036@gmail.com",
            files:""
        })

        const result=await Reg.insertMany([firstAssignment]);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
createDocument();
//createDocument2();
//createDocument3();

const getDocument = async()=>{
    const result= await User.find()
    //.find({videos :{$gt:50}})
    //.find({name: {$in :["Mansi Bhardwaj"]}}) //multiple filters
    .select({name:1})
    //.limit(1);
    //.find({$or:[{quantity:{$lt:30}}]})
    .sort("name :1");
    //.countDocuments();
    console.log(result);
}
//getDocument();

//update doc
/*
const updateDocument=async(_id)=>{
    
        try{
            const result=await User.findByIdAndUpdate({_id},{
                $set:{
                    name:"Anil Kumar Sharma"
                },
                {
                    new:true,
                    useFindAndModify:false
                }
            });
        }
        catch(err){
            console.log(err);
        }
       
}
updateDocument("655fb9ec1d802023c3c94a7f");
*/

//delete doc
/*
const deleteDocument=async(_id)=>{
    try{
        const result=await userSchema.findByIdAndDelete({_id});
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
deleteDocument("655fb9ec1d802023c3c94a7f");
*/
module.exports = {
    User: mongoose.model("User", userSchema),
    Reg: mongoose.model("Reg", regSchema),
    Assignment: mongoose.model("Assignment", AssignmentSchema),
};