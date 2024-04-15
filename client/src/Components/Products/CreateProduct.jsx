import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";
import CreateCategory from "../Category/CreateCategory";

const ErroMess = {
  message: "This is required",
};

const ProductSchema = yup.object().shape({
  productName: yup.string().required(ErroMess.message),
  productDesc: yup.string().required(ErroMess.message),
  productPrice: yup.number().required(ErroMess.message),
  categoryName: yup.string().required(ErroMess.message),
  productImages: yup
    .mixed()
    .test("file", "You need to provide a file", (value) => {
      if (value.length > 0) {
        return true;
      }
      return false;
    })
    .test("fileSize", "image should be less than 1MB", (files) => {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 1000000) {
          return false;
        }
      }
      return true;
    }),
});

const CreateProduct = () => {
  const { fetchCategories, categories } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();

  const authToken = localStorage.getItem("token");

  // Initialize formData
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductSchema),
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submit
  const handleFormSubmit = async (data) => {
    setLoading(true);
    const productData = new FormData();
    productData.append("productName", data.productName);
    productData.append("productDesc", data.productDesc);
    productData.append("productPrice", data.productPrice);
    productData.append("categoryName", data.categoryName);

    for (let i = 0; i < productImages.length; i++) {
      productData.append("productImages", productImages[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/create/product",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.message === "success") {
        toast.success("Product Added");
        navigate("/list/products");
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

  // Handle image change
  const handleImageChange = (e) => {
    const files = e.target.files;
    setProductImages([...productImages, ...files]);
  };

  // Handle remove image
  const handleRemoveImage = (index, e) => {
    e.preventDefault();
    const updatedImages = productImages.filter((image, i) => i !== index);
    setProductImages(updatedImages);
  };

  return (
    <div className="sign-in__wrapper">
      <h3>Add Product</h3>
      <Form
        name="form"
        className="shadow p-4 bg-white rounded"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Form.Group className="mb-2" controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            isInvalid={errors.productName}
            {...register("productName")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.productName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="productDesc">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            isInvalid={errors.productDesc}
            {...register("productDesc")}
            as="textarea"
          />
          <Form.Control.Feedback type="invalid">
            {errors.productDesc?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            isInvalid={errors.productPrice}
            {...register("productPrice")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.productPrice?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="categoryName">
          <Form.Label>Category</Form.Label>
          <Form.Control
            isInvalid={errors.categoryName}
            {...register("categoryName")}
            as="select"
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.categoryName?.message}
          </Form.Control.Feedback>
          <div className="text-muted mt-2 gap-2 d-flex align-items-center">
            Can't find your category?
            <CreateCategory fetchCategories={fetchCategories} />
          </div>
        </Form.Group>

        <Form.Group className="mb-2" controlId="productImages">
          <Form.Label>Product Images</Form.Label>
          <Form.Control
            {...register("productImages")}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            isInvalid={errors.productImages}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.productImages?.message}
          </Form.Control.Feedback>
          <div className="mt-3">
            {productImages.map((image, index) => (
              <div
                key={index}
                className="d-inline-block position-relative me-3"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Product Image ${index}`}
                  style={{ maxWidth: "70px", maxHeight: "70px" }}
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 end-0"
                  onClick={(e) => handleRemoveImage(index, e)}
                >
                  <IoCloseCircleSharp />
                </Button>
              </div>
            ))}
          </div>
        </Form.Group>

        <div className="d-grid gap-2">
          {loading ? (
            <Button variant="primary" type="submit" disabled>
              Adding Product...
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default CreateProduct;
