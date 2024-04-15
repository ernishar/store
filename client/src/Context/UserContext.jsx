import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:4000/api/profile/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // debugger;
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:4000/api/get/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        setProducts(response.data.products);
      }
    } catch (error) {}
  };

  // Fetch categories
  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:4000/api/get/category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        products,
        categories,
        setUser,
        fetchProducts,
        fetchCategories,
        getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
