import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Homepage />} />
      <Route path="/signin" element={<Login />} />
    </Routes>
  );
};

export default App;
