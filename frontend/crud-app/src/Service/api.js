
import axios from 'axios';

const usersUrl = 'http://localhost:9000'; 

export const getUsers = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

//for add data and imagees

export const addUser = async (formdata) => {
    return await axios.post(`${usersUrl}/add`, formdata);
}

//single delete
export const  deleteSingle = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

//multiple delete api using array

export const deleteUser = async (arrayids) => {
    return await axios.delete(`${usersUrl}/${arrayids}`);
}
// edit the users data api  
export const editUser = async (id, formdata) => {
    return await axios.put(`${usersUrl}/${id}`,formdata)
}
//hear is the api for fatch the data in view 
export const viewUser = async (id) => {
    return await axios.get(`${usersUrl}/${id}`)
}
// multiple images delete  
export const deleteImage = async (id,e) => {
    return await axios.post(`${usersUrl}/deleteimage`,{id:id, image:e});
}
//for serching user
export const searchUser = async (searchQuery) => {
    return await axios.get(`${usersUrl}/search?searchQuery=${searchQuery.search || 'none'}`)
 };