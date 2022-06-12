
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import { adduser,edituser } from './Controller/user-controler.mjs';
// const upload = multer({ dest: 'uploads/' })
import route from './route/routes.mjs';
import router from './route/routes.mjs';


import  multer from 'multer';
const app = express();
import fs from 'fs';
//hear we use this becouse defain public folder as a defolt and show that iamge on browser
app.use('/public',express.static('public'));

//bodyparser is use as a middlewher and install it before use npm i body-parser  
app.use(bodyParser.json({extended:true}));
//for encode the url 
app.use(bodyParser.urlencoded({extended:true}))

//(npm i corse) for use to safty for asses code on diffrent port
app.use(cors());
app.use('/',route)

//create server

//url of  databaise

mongoose.connect("mongodb://localhost:27017/fullStack", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}, () => {
    console.log("DB connected")
})

// hear we use multer for  store and uplode image //multer is middlwer
 //store is use for store 
var storage = multer.diskStorage({
    destination: function (req, file, cb){
     //hear we defain the pathe where img is uplode 
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {

      //hear we defain  what is the name of the file 
      cb(null, Date.now() + '_'+ file.originalname )
    }
  })

  //for uplode image in file

  var upload = multer({  storage: storage });

  // fs.unlink(__dirname + 'public/images' + image, (err) => {
  //   if (err) throw err;
  //   console.log('successfully deleted file');
  // });
//hear we defain router becose its does not work for uplode it gives an error 
//"myFile" is the name of the imge intup type and also we defain in FormData as apeend 
//routing for add user data and image uplode 
// router.post('/add',adduser);//for add without file or image 
//if you want to use single image use uplode.single and if you want to add multiple image use multiple image use uplode.array 

router.post('/add',upload.array('myFile'),adduser);

//routing for hear we edit the user data and also image 
//for update image ////hear we defain router becouse its does not work for uplode  it gives an error  
// router.put('/:id',upload.single('myFile'),edituser);

//for edit multiple image we use array  
router.put('/:id',upload.array('myFile'),edituser);

//for run server

app.listen(9000,() => {
  console.log("BE started at port 9000")
})



//if its not redy for running at this than chek the value
