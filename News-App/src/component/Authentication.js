import React from 'react'
import { Navigate } from 'react-router-dom';

function Authentication({children}) {
let auth=JSON.parse(localStorage.getItem("login"))||{};
console.log(auth,"auth")
if(auth.email){
  return children
}
alert("Please Login First")
return <Navigate to="/login"/>
}

export default Authentication