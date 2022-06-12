// import React from 'react'
// import {TableRow,TableCell,Checkbox,Button} from '@material-ui/core';
// import { Link } from '@material-ui/core';
// import selectedRows from "../Components/AllUsers";


// const Card = ({user}) => {
    
//     return (
//         <>
//            {/* <TableRow className={classes.row}   key={user.id}> */}
//        <TableRow   key={user.id}>

//                     {/* <TableCell> <Checkbox    type="checkbox"      

//                     //for select the value of  cheked fild from table       
//                      onChange={(e) => {
//                         if (e.target.checked) {
//       setSelectedRows([
//         ...selectedRows,
//                     {
//                       id: user._id,
//                       name: user.name,
//                       username: user.username,
//                       email: user.email,
//                       phone: user.phone,
//                       image:user.image
                    
//                     },
                  
//       ])
//       }else{
//         setSelectedRows(
//             //use filter or map 
//             selectedRows.map((people) => people.id !== user.id),
//       );
//     }
//       }

//       }   
//       //the selected value is stored in selectedRows
//                   value={selectedRows}
//                 /> </TableCell> */}
//                     <TableCell>{user._id}</TableCell> {/* change it to user.id to use JSON Server */}
//                     <TableCell>{user.name}</TableCell>
//                         <TableCell>{user.username}</TableCell>
//                         <TableCell>{user.email}</TableCell>
//                         <TableCell>{user.phone}</TableCell>
//                         {/* <TableCell><img src={imagePath}  width="60px" height="60px" /></TableCell> */}
//                          <TableCell>   
//                           {/* {user.map((user, index) => */}
//                           <div>

//                           {/* hear we are mape the image for display all images on web  */}
//                           {user.image.map((e) =>
//                           <img src={ "http://127.0.0.1:9000/public/images/"+e} width="40px" height="40px" />
//                           )}
//                              </div>
//                           {/* )} */}
//                         </TableCell>
//                         <TableCell>
//                             <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${user._id}`}>Edit</Button>
//                              {/* //delete single recod */}
//                              {/* <Button color="secondary" variant="contained" onClick={() => deleteUserData(user._id)}>Delete</Button> */}
//                               </TableCell>
//                               <TableCell>
//                               {/* hear is the button and functions for open the view model and the view data both function   */}
                             
//                               {/* <Button variant="contained" style={{marginRight:10}} onClick={() => handleOpen(viewData(user._id))}>view</Button> */}
                             
//                              {/* <Button color="secondary" variant="contained" onClick={() => deleteUserData(user._id)}>Delete</Button> */}
//                               </TableCell>
//                     </TableRow>  
//         </>
//     )
// }

// export default Card
