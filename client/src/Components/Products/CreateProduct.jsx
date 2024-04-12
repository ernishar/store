import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { IoCloseCircleSharp } from "react-icons/io5";

import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const CreateProduct = () => {
  const navigate = useNavigate();

  const { fetchProducts } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productDesc: "",
    productPrice: "",
    categoryName: "",
    productImages: [],
  });

  const [categories, setCategories] = useState([]);
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

  //Insert product
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      productName,
      productDesc,
      productPrice,
      categoryName,
      productImages,
    } = formData;

    if (!productName || !productDesc || !productPrice || !categoryName) {
      setLoading(false);
      toast.error("Please fill all the fields");
      return;
    }

    const postData = new FormData();
    postData.append("productName", productName);
    postData.append("productDesc", productDesc);
    postData.append("productPrice", productPrice);
    postData.append("categoryName", categoryName);
    productImages.forEach((image) => {
      postData.append("productImages", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/create/product",
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.message === "success") {
        setFormData({
          productName: "",
          productDesc: "",
          productPrice: "",
          categoryName: "",
          productImages: [],
        });
        toast.success("Product Added");
        navigate("/list/products");
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

  //Handle image change
  const handleImageChange = (e) => {
    const files = e.target.files;

    console.log(files);
    const imagesArray = [...formData.productImages];
    for (let i = 0; i < files.length; i++) {
      imagesArray.push(files[i]);
    }
    setFormData({ ...formData, productImages: imagesArray });
  };

  const handleRemoveImage = (index, e) => {
    e.preventDefault();
    const updatedImages = [...formData.productImages];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, productImages: updatedImages });
  };

  return (
    <div className="sign-in__wrapper">
      <h3>Add Product</h3>
      <form className="shadow p-4 bg-white rounded" onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, productName: e.target.value })
            }
            type="text"
            className="form-control"
            id="productName"
            placeholder="Product Name"
            value={formData.productName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productDesc" className="form-label">
            Description
          </label>
          <textarea
            onChange={(e) =>
              setFormData({ ...formData, productDesc: e.target.value })
            }
            className="form-control"
            id="productDesc"
            placeholder="Description"
            value={formData.productDesc}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price
          </label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, productPrice: e.target.value })
            }
            type="number"
            className="form-control"
            id="productPrice"
            placeholder="Price"
            value={formData.productPrice}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            onChange={handleCategoryChange}
            className="form-control"
            id="category"
            value={formData.categoryName}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="productImages" className="form-label">
            Product Images
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            className="form-control"
            id="productImages"
            multiple
          />
          <div className="mt-3">
            {formData.productImages.map((image, index) => (
              <div
                key={index}
                className="d-inline-block position-relative me-3"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Product Image ${index}`}
                  style={{ maxWidth: "70px", maxHeight: "70px" }}
                />
                <button
                  className="btn btn-sm btn-danger position-absolute top-0 end-0"
                  onClick={(e) => handleRemoveImage(index, e)}
                >
                  <IoCloseCircleSharp />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
