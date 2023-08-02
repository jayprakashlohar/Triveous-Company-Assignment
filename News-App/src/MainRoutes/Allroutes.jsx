import React from "react";
import { Route, Routes } from "react-router-dom";
import Allnews from "../Pages/Allnews";
import Login from "../Pages/Login";
import SingleNews from "../Pages/SingleNews";
import Register from "../Pages/Registeration";
import Authentication from "../components/Authentication";
import Favourite from "../Pages/Favourite";

function Allroutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Authentication>
              <Allnews />
            </Authentication>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/detailnews/:name"
          element={
            <Authentication>
              <SingleNews />
            </Authentication>
          }
        />
        <Route
          path="/favouritenews"
          element={
            <Authentication>
              <Favourite />
            </Authentication>
          }
        />
      </Routes>
    </div>
  );
}

export default Allroutes;
