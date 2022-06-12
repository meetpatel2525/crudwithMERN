import mongoose from 'mongoose';
//npm i mongoose-auto-increment use for install autoIncrement
import autoIncrement from 'mongoose-auto-increment';

const userSchema = mongoose.Schema({
    name:String,
    username:String,
    email:String,
    phone:Number,
    //use array for multiple image 
    image:Array,   
});
//autoIncrement is use for increment the id automatecly at browser and at databaise 
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin,'users');

//data of userschima is go in user variable //'user' hase defain in your react project as data of user
const user =  mongoose.model('users',userSchema);

export default user;
