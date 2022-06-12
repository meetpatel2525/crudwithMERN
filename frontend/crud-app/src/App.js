
import './App.css';
import React from 'react';
import NavBar from './Components/NavBar';

import AllUsers from './Components/AllUsers';
import AddUser from './Components/AddUser';
import NotFound from './Components/NotFound';
import EditUser from './Components/EditUser';
import { BrowserRouter  } from "react-router-dom";
import {  Route, Routes } from "react-router-dom";
import openModel from "./Components/AllUsers";

function App() {
  return (
    <>

      <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route exact path="/" element={<AllUsers/>}></Route>
      #  {/* for pagination  */}
        <Route exact path="/all/page/:pageNumber" element={<AllUsers/>}></Route>
        # {/* for serching   */}
        <Route exact path="/all/search?searchQuery=${search}" element={<AllUsers/>}></Route>
            #  {/* for all data display  */}
        <Route exact path="/all" element={<AllUsers/>}></Route>
        <Route exact path="/add" element={<AddUser/>}></Route>
        <Route exact element={<NotFound/>}></Route>
        <Route exact path="/edit/:id"  element={<EditUser/>}></Route>
         </Routes>
        </BrowserRouter>

    </>
  );
}

export default App;
