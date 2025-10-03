const mongoose=require('mongoose');
const clipSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    Sname:{
        type :String,
        required:true
    },
    Rname:{
        type:String,
        required:true
    },
    key:{
        type:String,
        required:true,
        unique:true
    }
}, {timestamps:true});
clipSchema.index({"createdAt" : 1}, { expireAfterSeconds: 120});
const clip = mongoose.model('Clip',clipSchema);
module.exports=clip