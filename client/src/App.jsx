import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import NotFound from "./Components/404";
import Header from "./Components/Header";
import Home from "./Components/Home";
import CreateProduct from "./Components/Products/CreateProduct";
import ListProducts from "./Components/Products/ListProducts";
import SendMail from "./Components/SendMail";
import Login from "./Components/User/Login";
import Profile from "./Components/User/Profile";
import Register from "./Components/User/Register";
import { UserContextProvider } from "./Context/UserContext";
import Sidebar from "./Components/Sidebar";
import VerifyUser from "./Components/User/VerifyUser";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Toaster richColors duration={2000} position="top-center" />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/user" element={<VerifyUser />} />
          <Route path="/sendmail" element={<SendMail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/create/product" element={<CreateProduct />} />
          <Route path="/list/products" element={<ListProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
