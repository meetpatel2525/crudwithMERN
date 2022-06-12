import user from "../model/user-schema.mjs";
import User from "../model/user-schema.mjs";
import fs from 'fs';
import { query } from "express";


//get all data with pagination 
export const getusers = async(req, res) => {

    try {

        //pagination start 

        //hear we use some query 
        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.limit) || 5;


        //for skip page right to left 
        let skip = (page - 1) * pageSize;
        let total = await User.countDocuments();

        let pages = Math.ceil(total / pageSize);
        let user = await User.find().skip(skip).limit(pageSize);


        if (page > pages) {

            return res.status(404).json({
                status: "fail",
                message: "no page found"
            })
        }

        const result = await user;

        //---pagination main logic or method ends----// 


        //for showing data in paylode or network 

        res.status(200).json({
            status: "sucess",
            count: result.length,
            page,
            pages,
            data: result,
        });

        // res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// serch data from backend and database

export const searchUser = async(req, res) => {

    const searchQuery = req.query.searchQuery;
    try {
        const name = new RegExp(searchQuery, 'i'); //this is for we serch meet or Meet or MEET all are same 
        const user = await User.find({ name }) //it faind the data acording to name of user 

        res.json({ data: user }); //we store the responce in data so in frontend use data.data for responce 
    } catch (error) {
        res.status(404).json({ message: error.message })
    }


}

//serching data logic is over 
//add users logic
export const adduser = async(req, res) => {

    //hear we store  multiple file in databaise //and if you want add single image than use only file insted of files  

    //for multiple request image from frontend 

    let imagearr = (req.files) ? req.files : [];

    //for add new multiple image in a array so we make null array 
    let image = [];
    //  hear we fatch all new image from imagearr and push or add  it in image Array
    imagearr.map((e) => {
        image.push(e.filename); //e.filename becouse we need only name of image so we use .filename 
    });
    //use to get alldata of user 
    let user = req.body;
    //use this becose schima is not taking image 

    //hear we gat images data in image array so we add it in user 
    user.image = image;

    //for save data in new constent variable 
    const newUser = new User(user);

    try {
        // newuser.save is use for save the data in databaise and data comse from from req.body
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.json({ message: error.message });
    }
}


//for get data at edit page
export const getuserById = async(req, res) => {
    const id = req.params.id;
    try {
        //findByid is use for faind the user by id usin params
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        res.json({ message: console.error.message });
    }
}

// // for edit the values  AND IMAGE 

export const edituser = async(req, res) => {
    //hear we have new addaed multiple image in imagear  

    let imagear = (req.files) ? req.files : [];
    //for get user data 
    let user = req.body;

    // we map and push tha new imag we get from the imagear 
    imagear.map((e) => {
        user.image = user.image || []; //we use balck array hear becose then we try to push image in empty array it does not work so we use this 
        user.image.push(e.filename);

    });

    const edituser = new User(user);
    try {
        //updateOne is use for update only one id (and updateMany use for update mant id) and many for multiple 
        await User.updateMany({ _id: req.params.id }, edituser);
        res.json(edituser)

    } catch (error) {
        res.json({ message: console.error.message });
    }
}

//for edite user data only without image

// export const edituser = async (req,res)=>{
//     const user = req.body;
//    const edituser = new User(user);
//    try {
//        //updateOne is use for update only one id (and updateMany use for update mant id) 
//        await User.updateOne({_id: req.params.id}, edituser);
//        res.json(edituser)
//    }catch(error){
//        res.json({message:console.error.message});
//    }



//for delete multiple data 

export const deleteUser = async(req, res) => {
    //DELETE all selected  images from the  folder we delete from the front end and databaise  
    let users = await User.find({ '_id': { '$in': req.params.id.split(",") } }); //save all selected data in users variable         
    //for map only images we use e.image
    users.map((e) => {
        e.image.map((img) => { //for map all images 
            //for delete images from folder
            fs.unlinkSync("public/images/" + img); //path of images
        });
    });
    try {
        // console.log(req.params.id.split(","));  
        //logic of delete multiple ids from databaise and from webpage // split(",") is use for covert string data in to aaray so we can delete full array at once
        await User.deleteMany({ '_id': { '$in': req.params.id.split(",") } });

        res.json("delete user")
    } catch (error) {
        console.log("error:" + error.message);
        res.json({ message: error.message });
    }
}

// for delete single data
export const deleteSingle = async(req, res) => {

    let users = await User.find({ _id: req.params.id }); //save all selected data in users variable         

    users.map((e) => {

        e.image.map((img) => { //for map all images 
            //for delete images from folder
            fs.unlinkSync("public/images/" + img); //path of images
        });
    });

    try {
        //updateOne is use for update only one id (and updateMany use for update mant id) 
        await User.deleteOne({ _id: req.params.id });
        res.json("delete user")
    } catch (error) {
        res.json({ message: error.message });
    }
}

// for delete single image from the edit page 
export const deleteImage = async(req, res) => {

    //for delete file or image from tha folder wher we are uploded user images 
    fs.unlinkSync("public/images/" + req.body.image);

    try {
        // let id = req.body.id;
        // let image = req.body.image;
        const user = await User.findByIdAndUpdate(
            req.body.id,

            // fs.unlinkSync(user.image),

            {
                $pull: {

                    image: req.body.image
                },
            }, { new: true }
        )

        //the try part is not working or no need till try end 

        if (!user) {

            // return res.status(400).send("User not found");
        }
        //  await User.findByIdAndDelete((req.body.image))

        // doc.image= req.body.image;
        res.json("delete image")
            // console.log("user",user);
    } catch (error) {
        res.json({ message: error.message });
    }
}