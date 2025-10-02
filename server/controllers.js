// const {v4 : uuidv4} = require('uuid');
const UserModel=require('./models/user');
const bcrypt=require('bcryptjs')
const clip = require('./models/clip')
const jwt =require('jsonwebtoken')
//Register user
const userRegister = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        if (!name) {
            return res.json({
                error: 'Name is required'
            })
        }
            //check for passwords
            if (!password || password.length < 6) {
                return res.json({
                    error: 'Password is required and should be atleast 6 characters long'
                })
            }
        const existUser=await UserModel.findOne({ email });
        if(existUser){
            return res.json({error: 'Email is already taken'});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await UserModel.create({
            name,
            email,
            password:hashedPassword,
        });
        const token = jwt.sign({id:user._id, email:user.email}, process.env.JWT_SECRET, {expiresIn: '2m'});
        return res.cookie('token', token,{httpOnly: true,secure: process.env.NODE_ENV==='production'})
        .json({message: 'Registration Successful', user: {id:user._id, name:user.name,email:user.email}});
    }
    catch(error){
        console.log(error);
        return res.json({error : "Something went wrong"});
    }
};

const userLogin = async (req,res)=>{
    try{
        const {email,password} = req.body;

        //check if user exists
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({error:"No users found"});
        }

        //Check password
        const passwordMatch= await bcrypt.compare(password,user.password);
        if(passwordMatch){
            const token = jwt.sign({id:user._id,email:user.email}.process.env.JWT_SECRET, {expiresIn:'2m'});
            return res.cookie('token', token,{httpOnly:true,secure:process.env.NODE_ENV==='production'})
            .json({message:'Login successful', user:{id:user._id,name:user.name,email:user.email}});
        }
        else{
            return res.json({error:'Invalid credentials'});
        }
    }
    catch(error){
        console.log(error);
        return res.json({error:"Something went wrong"});
    }
};

const putClip = async(req,res)=>{
    try{
    const {content,Sname,Rname,key} = req.body
if(!content ||!Sname || !Rname ){
    return res.json({error:'All fields required'});
}
// const generatedKey = uuidv4();
let isUnique = false;
let attempts =0;
while(!isUnique && attempts<=10){
const generatedKey= () => {
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for(let i =1;i<=6;i++){
        result+=char.charAt(Math.floor(Math.random()* charactersLength));
    }
    return result;
}
const existingClip= await mongoose.findOne({key : generatedKey});
if(!existingClip){
    isUnique = true;
}
attempts ++;
if (!isUnique) {
    return res.json({ error: 'Failed to generate a unique key after multiple attempts. Please try again.' });
}
}
const newClip = await clip.create({
    content,Sname,Rname,key:generatedKey,
});
return res.json({message:'Content saved sucessfully!',key:generatedKey, clip:newClip});
    }
catch (err){
    console.log('Clip saving error:',err);
    return res.json({error:'Failed to save content.', err});
}
};

const getClip = async(req,res)=>{
try {
    const {Sname,Rname,key} = req.body;
    if(!Sname || !Rname || !key){
        return res.json({error:"All fields required"});
    }
    const clipInDB = await clip.findOne({key,Sname,Rname});
    if(!clipInDB){
        return res.json({error:"No such clip exists, please recheck the fields"});
    }
    else{
            console.log("Clip found")
            return res.json({message :'Clip found' ,clip : clipInDB.content, createdAt: clipInDB.createdAt});
    }
    
} catch (error) {
    console.log(error);
    return res.json({error:'Something went wrong'})
}
};
const getProfile = (req,res) =>{
const { token } = req.cookies;//get token from cookies
if(token){
    jwt.verify(token, process.env.JWT_SECRET, {} ,(err, user) => {
        if(err){
            console.log("JWT verification error: ", err);
            return res.json({error: 'Invalid token'});
        }
        
        UserModel.findById(user.id)
        .then(foundUser=>{
            if(!foundUser){
                return res.json({error: 'User not found'});
            }
            return res.json({user: {id: foundUser._id, name:foundUser.name, email: foundUser.email}});
        })
        .catch(DBerror=>{
            console.log("Db error fetching user: ", DBerror);
            return res.json({error:"Database error fetching user"});
        });
    });
}
else{
    return res.json({user:null});
}
};
module.exports ={
    userRegister,
    userLogin,
    putClip,
    getClip,
    getProfile,
};