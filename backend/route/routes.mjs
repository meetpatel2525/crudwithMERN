import express from 'express';

import  {deleteSingle,getusers,searchUser,deleteImage,getuserById,deleteUser}  from '../Controller/user-controler.mjs';

const router = express.Router();

//for serching userdata 
router.get('/search',searchUser);

router.get('/',getusers);

//we deafain add routing in index becouse uplode is not working
 
//we deafain edit routing in index becouse uplode is not working 

//for data data at edit page
router.get('/:id',getuserById)

//delete single
router.delete('/**es**:id',deleteSingle)//hear we use path '/**es**  becouse single delete and multiple delete have same pathe so it gives an error       

//for  delete multiple data
router.delete('/:id',deleteUser)

// for delete single image
router.post('/deleteimage',deleteImage)

export default router




