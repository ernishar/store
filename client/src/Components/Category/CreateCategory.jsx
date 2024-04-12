import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { IoCloseCircleSharp } from "react-icons/io5";

import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const CreateCategory = () => {
  const navigate = useNavigate();

  const { fetchProducts } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
  });

  const authToken = localStorage.getItem("token");

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/get/category",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  //Insert Ctegory
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      categoryName
    } = formData;

    if ( !categoryName) {
      setLoading(false);
      toast.error("Please Fill Category Name");
      return;
    }

    const postData = new FormData();
    
    postData.append("categoryName", categoryName);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/create/category",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.message === "success") {
        setFormData({
          categoryName: "",

        });
        toast.success("Category Added");
        navigate("home");
        fetchProducts();
        setLoading(false);
      } else {
        toast.error("There is something wrong");
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const handleError = (error) => {
    let errorMessage = "An error occurred. Please try again.";
    if (error.response && error.response.status === 400) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
  };

  //Handle category change
  const handleCategoryChange = (e) => {
    setFormData({ ...formData, categoryName: e.target.value });
  };



  return (
    <div className="sign-in__wrapper">
      <h3>Add Category</h3>
      <form className="shadow p-4 bg-white rounded" onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Category Name
          </label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, categoryName: e.target.value })
            }
            type="text"
            className="form-control"
            id="categoryName"
            placeholder="Category Name"
            value={formData.categoryName}
          />
        </div>

        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
