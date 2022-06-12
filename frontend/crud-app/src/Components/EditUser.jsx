import { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
  Chip,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { getUsers, editUser, deleteImage } from "../Service/api";
import { useNavigate } from "react-router-dom";
import formdata from "./AddUser";
import { Link, Routes } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
const initialValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
  image: "",
};

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
  },
});

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const { name, username, email, phone, image } = user;
  const [cart, setCart] = useState([]);

  const { id } = useParams();
  const classes = useStyles();
  let navigate = useNavigate();

  useEffect(() => {
    loadUserData();
  }, []);

  //for lode the data of edit

  const loadUserData = async () => {
    const response = await getUsers(id);
    setUser(response.data);
    // console.log(formdata)
  };

  //for edit with image
  const editUserDetails = async () => {
    //for image uplode   //append() method inserts a set of Node objects or DOMString objects after the last child of the Element
    const formdata = new FormData();
    //hear we use if condition becose of if user want to chngae image it go for  file("my flie" or image )
    // otherwaise it go for other values of user data
    if (user.newimage) {
      //newimage is the name of the variable for image flie
      //hear we uase forloop becouse for we want multiple image so we make array
      for (var x = 0; x < user.newimage.length; x++) {
        formdata.append("myFile", user.newimage[x], user.newimage[x].name);
      }
    }

    formdata.append("name", user.name);
    formdata.append("username", user.username);
    formdata.append("email", user.email);
    formdata.append("phone", user.phone);

    //hear we use this method becouse we get valuse as a string so we convert it in a aaray for multiple edit
    user.image.forEach((img) => formdata.append("image[]", img));
    // formdata.append('image',user.image.split(","))//for  single image
    await editUser(id, formdata);
    navigate("/all");
  };

  //edit withot image
  // const editUserDetails = async() => {
  //      await editUser(id, user);
  //     navigate('/all');
  // }

  //for store data valuse of user
  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // for save data valuse with image
  const handlePhoto = (e) => {
    //for image uplode
    console.log(e.target.files);
    setUser({ ...user, newimage: e.target.files });
  };

  //delete multiple images
  const deleteUserImage = async (e, id) => {
    await deleteImage(id, e);

    //for refresh the page
    window.location.reload(false);
  };
  return (
    <FormGroup className={classes.container} encType="multipart/form-data">
      <Typography variant="h4">Edit Information</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={name}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={username}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={email}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={phone}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <inputLabel htmlFor="my-input">
          <b>select image</b>
        </inputLabel>
        <br />
        <input
          type="file"
          onChange={(e) => handlePhoto(e)}
          name="myFile"
          multiple
        />
      </FormControl>
      <FormControl>
        {/* for multiple image show we map hear  */}

        {(user.image || []).map((e) => (
          <div>
            <img
              src={"http://127.0.0.1:9000/public/images/" + e}
              width="40px"
              height="40px"
            />
            {/* <Button color="secondary" variant="contained" onClick={() => deleteUserImage(e,user._id)}>Delete</Button> */}
            {/* <Chip label="Deletable" color="secondary" variant="contained"  /> */}
            <Button
              color="secondary"
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => deleteUserImage(e, user._id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => editUserDetails(e)}
        >
          Edit User
        </Button>
      </FormControl>
    </FormGroup>
  );
};
export default EditUser;
