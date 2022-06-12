import react, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { addUser, getUsers } from "../Service/api";
import { useNavigate } from "react-router-dom";

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

const AddUser = () => {
  const [user, setUser] = useState(initialValue);
  const [selectFile, setSelectFile] = useState("");
  const { name, username, email, phone, image } = user;
  const classes = useStyles();
  let navigate = useNavigate();

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlePhoto = (e) => {
    //for image uplode multiple files
    setUser({ ...user, image: e.target.files });
  };

  const addUserDetails = async () => {
    //for image uplode   //append() method inserts a set of Node objects or DOMString objects after the last child of the Element
    const formdata = new FormData();
    //use this foop for uplode multiple image
    for (var x = 0; x < image.length; x++) {
      formdata.append("myFile", user.image[x], user.image[x].name);
    }
    // formdata.append('myFile',user.image,user.image.name)
    formdata.append("name", user.name);
    formdata.append("username", user.username);
    formdata.append("email", user.email);
    formdata.append("phone", user.phone);

    await addUser(formdata);
    console.log(user);
    navigate("/all");
    getUsers();
  };

  return (
    //use this for image uplode //encType='multipart/form-data'
    <FormGroup
      method="post"
      className={classes.container}
      encType="multipart/form-data"
    >
      <Typography variant="h4">Add User</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={name}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={username}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={email}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={phone}
          id="my-input"
          type="number"
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => addUserDetails()}
        >
          Add User
        </Button>
      </FormControl>
    </FormGroup>
  );
};

export default AddUser;
