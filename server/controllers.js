const {v4 : uuidv4} = require('uuid');
const UserModel=require('./models/user');
const bcrypt=require('bcryptjs')
const clip = require('./models/clip')
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
        return res.json(user);
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
            //generate jwt
            return res.json({message: 'Login successful' , user:user});
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
const generatedKey = uuidv4();
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
            return res.json({clip : clipInDB.content})
    }
    
} catch (error) {
    console.log(error);
    return res.json({error:'Something went wrong'})
}
};
module.exports ={
    userRegister,
    userLogin,
    putClip,
    getClip,
};