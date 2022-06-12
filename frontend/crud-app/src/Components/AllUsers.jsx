import SearchIcon from "@mui/icons-material/Search";
import { react, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  Checkbox,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  Button,
  makeStyles,
  Modal,
  FormControl,
  Input,
  InputLabel,
  FormGroup,
  TextField,
} from "@material-ui/core";
import {
  deleteSingle,
  getUsers,
  deleteUser,
  viewUser,
  searchUser,
} from "../Service/api";
import { Link, Routes } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { BiShowAlt } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import TableContainer from '@mui/material/TableContainer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const initialValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
  image: "",
};
const main = {
  display          : "inline-block",
  padding          : "20px",
  border           : "1px dashed #afafaf",
  borderRadius    : "5px",
  backgroundColor : "#fbfbfb",
  cursor           : "pointer",
  textAlign       : "center"
};

const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const useStyles = makeStyles({
  edit: {
    width: "7px",
    height: "100px",
  },
  view: {
    width: "1px",
    height: "100px",
  },
  delete: {
    width: "2px",
    height: "100px",
  },
  pageination: {
    size: "20px",
    // margin: "50px 0px 0px 50px",
    // marginLeft: "1500px",
  },

  table: {
    width: "100%",
    // margin: "50px 0px 0px 50px",
  },
  thead: {
    // width: "150.5px",
    fontSize: 20,
    background: "#000000",
    color: "#FFFFFF",
    // margin: "100px",
  },
  S: {
    width: "48.5px",
    // margin: "10px 00px 00px 0px",
  },
  i: {
    width: "18.5px",
    // margin: "10px 80px 00px 50px",
  },
  N: {
    width: "90.5px",
    // margin: "10px 40px 00px 60px",
  },
  U: {
    width: "100.5px",
    // margin: "10px 30px 00px 60px",
  },
  E: {
    width: "100.5px",
    // margin: "10px 30px 00px 80px",
  },
  pn: {
    width: "50.5px",
    // margin: "10px 20px 00px 150px",
  },
  I: {
    width: "250.5px",
    // margin: "10px 10px 00px 180px",
  },
  A: {
    width: "50.5px",
    // margin: "10px 50px 00px 250px",
  },
  action: {
    width: "650px",
    fontSize: 20,
    background: "#000000",
    color: "#FFFFFF",
  },
  row: {
    "& > *": {
      fontSize: 20,
      // width: "500px",
      // height: "100px",
    },
  },
});

const AllUsers = () => {
  let navigate = useNavigate();
  //set params as pageno for put page=1 in url
  const { pageNumber: pageNumber } = useParams();
  const pageno = pageNumber || 1;
  //hear is the code for view we copy from the edit component
  const [user, setUser] = useState(initialValue);
  // const [multipleFiles, setMultipleFiles] = useState([]);

  const query = useQuery();
  const searchQuery = query.get("searchQuery");

  const { name, username, email, phone, image } = user;

  const { id } = useParams();
  const classes = useStyles();

  const [myData, setMyData] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  //for lode the data for  view
  const loadUserData = async () => {
    const response = await getUsers(id);
    setUser(response.data);
  };
  //hear is the function for view-model the data
  const viewData = async (id) => {
    let newData = await viewUser(id);
    setMyData(newData.data);
  };
  //hear end the coped edit component code we copy for view
  //this is  the variable for open and close the model-view
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //variable for selecte  datas for delete multiple
  const [selectedRows, setSelectedRows] = useState([]);

  //variable for all users data

  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageno);
  const [pages, setPages] = useState(1);

  const [showSearch, setShowSearch] = useState([]);

  //variable for serching
  const [search, setSearch] = useState("");
  // const [searchTerm,setsearchTerm] = useState("")
  useEffect(() => {
    getAllUsers();
  }, [page]);

  // //for display  all users data no pagination
  // const getAllUsers = async () => {
  //     let response = await getUsers()
  //     setUsers(response.data);
  // }

  const getAllUsers = async () => {
    //pagination logic start
    setLoading(true);
    try {
      const response = await getUsers(`?page=${page}`);
      const { data, pages: totalPages } = await response.data;
      setPages(totalPages);
      setUsers(data);
      setLoading(false);

      //pagination logic end
    } catch (error) {
      setLoading(false);
      setError("some error ocured  ");
    }
  };

  //pachination end

  // delete single data from databise

  const deleteSingleData = async (id) => {
    await deleteSingle(id);
    console.log(id);
    getAllUsers();
    window.location.reload(false);
  };

  //delete multiple data login start

  const onValueChecked = (e) => {
    //check check box check or uncheck
    let ischecked = e.target.checked;

    //check if chekbox is checked or uncheck
    if (ischecked) {
      setSelectedRows([...selectedRows, { id: e.target.value }]);
      //if checkbox uncheck than run else
    } else {
      let value = e.target.value;
      console.log(value);
      setSelectedRows(selectedRows.filter((t) => t.id !== value));
    }
  };

  //for delete selected multiple data

  const deleteUserData = async () => {
    let arrayids = [];
    selectedRows.forEach((user) => {
      if (selectedRows) {
        arrayids.push(user.id);
      }
    });
    {
      await deleteUser(arrayids);
      console.log(arrayids);
      getAllUsers();
      setSelectedRows("");
    }
    //for refresh the page becose it select tha chekbox automatecly after multiple delete opration
    window.location.reload(false);
  };

  //search  logic start

  //for serch button click
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //meaning of this if is enter//
      //when serch button is click than the serch logis is active
      searchMyData();
    }
  };

  // main search logic
  const searchMyData = async () => {
    if (search.trim()) {
      //trime() is for no empty space
      await searchUser({ search });
      const response = await searchUser({ search });

      //hear we use data.data becouse over data is in the data
      let show = response.data.data;
      //reson whay we use same state setUsers for two things allusers and serched data  :- hear we set the serched user data in users that also have a data of all users but we put sem state setUsers becouse when this method is call than users satae  only map the serched users data only and if this method is not active than it display or map allusers data as auseal
      setUsers(show);
    } else {
      navigate("/all");
    }
  };
  // search logic end;
  return (
     
    <div style={main}>
      {/* search ui for search bar */}
      <div >
        <div>
          {/* //delete multiple recod from single button  */}
          <Button
            color="secondary"
            className="btn btn-danger btn-sm m-2"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => {
              deleteUserData();
            }}
          >
            delete
          </Button>

          {/* for serching from the front end only live serching  */}
          {/* <input className="form-control me-2 bg-light text-dark border-dark border-3 " aria-label="Search"  
      type="text" placeholder="Search.." onChange= {event=>{setsearchTerm(event.target.value)}}  name="sarchname"/>     */}
          {/* for search  */}

          <TextField
            name="search"
            onKeyPress={handleKeyPress}
            variant="outlined"
            label="Search users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startIcon={<SearchIcon />}
          />

          <Button
            color="primary"
            onClick={searchMyData}
            variant="contained"
            className="btn btn-danger btn-sm m-2"
            startIcon={<SearchIcon />}
          >
            serch
          </Button>

          {/* <input className="form-control me-2 bg-light text-dark border-dark border-3 " aria-label="Search"  
      type="text" placeholder="Search.." onChange= {event=>{setsearchTerm(event.target.value)}}  name="sarchname" /> */}
        </div>
      </div>
      <div id="nav" style={{marginTop:"20px"}}>
        <Table className={classes.table}>
          <div>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.thead}>
                  <p className={classes.S}>Select</p>
                </TableCell>
                <TableCell className={classes.thead}>
                  <p className={classes.i}>id</p>
                </TableCell>
                <TableCell className={classes.thead}>
                  <p className={classes.N}>Name</p>
                </TableCell>
                <TableCell className={classes.thead}>
                  <p className={classes.U}>UserName</p>
                </TableCell>
                <TableCell className={classes.thead}>
                  <p className={classes.E}>Email</p>
                </TableCell>
                <TableCell className={classes.thead}>
                  <p className={classes.pn}>Phone</p>
                </TableCell>
                <TableCell className={classes.thead}>
                  <p className={classes.I}>Image</p>
                </TableCell>
                <TableCell className={classes.action}>
                  <p className={classes.A}>Actions</p>
                </TableCell>
              </TableRow>
            </TableHead>
          </div>

          <div>
            <TableBody>
              {/* filtering or serching  logic from the front end only */}

              {/*
                     users.filter((user)=>{
                    {/* if (searchTerm == ""){
                        return user;
                        //logic for filter and for live serch of characters
                    }else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return user;
                    }//map is for dispaly all data in loop                    
                })
                 */}

              {users.map((user) => (
                <TableRow className={classes.row} key={user.id}>
                  <TableCell>
                    {" "}
                    <Checkbox
                      type="checkbox"
                      value={user._id}
                      //for select the value of  cheked fild from table
                      onChange={(e) => onValueChecked(e)}
                    />
                  </TableCell>
                  <TableCell>{user._id}</TableCell>{" "}
                  {/* change it to user.id to use JSON Server */}
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  {/* <TableCell><img src={imagePath}  width="60px" height="60px" /></TableCell> */}
                  <TableCell>
                    {/* {user.map((user, index) => */}
                    <div>
                      {/* hear we are mape the image for display all images on web  */}
                      {user.image.map((e) => (
                        <img
                          src={"http://127.0.0.1:9000/public/images/" + e}
                          width="40px"
                          height="40px"
                        />
                      ))}
                    </div>
                    {/* )} */}
                  </TableCell>
                  <div>
                    <TableCell className={classes.edit}>
                      <Button
                        color="primary"
                        variant="contained"
                        className="btn btn-danger btn-sm m-2"
                        component={Link}
                        to={`/edit/${user._id}`}
                        startIcon={<FiEdit2 />}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell className={classes.view}>
                      <Button
                        color="primary"
                        className="btn btn-danger btn-sm m-2"
                        variant="contained"
                        onClick={() => handleOpen(viewData(user._id))}
                        startIcon={<BiShowAlt />}
                      >
                        view
                      </Button>
                    </TableCell>
                    <TableCell className={classes.delete}>
                      <Button
                        color="secondary"
                        className="btn btn-danger btn-sm m-2"
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteSingleData(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </div>
                  {/* //delete single recod */}
                  {/* <Button color="secondary" variant="contained" onClick={() => deleteUserData(user._id)}>Delete</Button> */}
                  {/* hear is the button and functions for open the view model and the view data both function   */}
                </TableRow>
              ))}
            </TableBody>
          </div>
        </Table>
      </div>
      <div>
        {/* hear is the model start for display(and hear we use mui model) */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* hear is the box for display the data  things you want  */}
          <Box sx={style}>
            <Typography variant="h4">VIEW DETAILS</Typography> <br />
            <Typography>
              <InputLabel htmlFor="my-input">
                <b>NAME</b>
              </InputLabel>
              {myData.name}
            </Typography>
            <br />
            <Typography>
              <InputLabel htmlFor="my-input">
                <b>USERNAME</b>
              </InputLabel>
              {myData.username}
            </Typography>
            <br />
            <Typography>
              <InputLabel htmlFor="my-input">
                <b>EMAIL</b>
              </InputLabel>
              {myData.email}
            </Typography>
            <br />
            <Typography>
              <InputLabel htmlFor="my-input">
                <b>PHONE</b>
              </InputLabel>
              {myData.phone}
            </Typography>
            <br />
            <Typography>
              <InputLabel>
                <b>IMAGE</b>
              </InputLabel>
            </Typography>
            <br />
            <Typography>
              {/* display the multiple image so we use mapling same  as abow in display all image on table */}
              {(myData.image || []).map((e) => (
                <img
                  src={"http://127.0.0.1:9000/public/images/" + e}
                  width="40px"
                  height="40px"
                />
              ))}
            </Typography>
          </Box>
        </Modal>
      </div>

      <div id="pag">
        {/* pagination  */}

        <Pagination
          className={classes.pageination}
          defaultPage={page}
          count={pages}
          page={page}
          pages={pages}
          color="primary"
          variant="outlined"
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default AllUsers;
