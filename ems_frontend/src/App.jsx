import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  if (!isLoggedIn) {
    return <Login setAuth={setIsLoggedIn} setRole={setUserRole} />;
  }

  // Once logged in, show the Dashboard layout
  return <Dashboard userRole={userRole} setIsLoggedIn={setIsLoggedIn} />;
}

export default App;
