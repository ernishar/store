import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import NotFound from "./Components/404";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Header from "./Components/Header";
import { UserContextProvider } from "./Context/UserContext";
import Profile from "./Components/Profile";
import CreateProduct from "./Components/Products/CreateProduct";
import ListProducts from "./Components/Products/ListProducts";
import CreateCategory from "./Components/Category/CreateCategory";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Toaster richColors position="top-right" />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create/product" element={<CreateProduct />} />
          <Route path="/list/products" element={<ListProducts />} />
          <Route path="/create/category" element={<CreateCategory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
