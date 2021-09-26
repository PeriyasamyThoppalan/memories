import Mongoose from "mongoose";

const userSchema = Mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    id:{type:String}

})
// Using the model name as MemUser as i alread have a model User in the same database.
export default Mongoose.model('MemUser',userSchema);