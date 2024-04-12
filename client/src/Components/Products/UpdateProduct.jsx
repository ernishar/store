import React, { useContext, useState, useEffect } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { toast } from "sonner";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoCloseCircleSharp } from "react-icons/io5";

const UpdateProduct = ({ product }) => {
  const navigate = useNavigate();
  const { fetchProducts } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Initialize formData with product data
  const [formData, setFormData] = useState({
    title: product.productName,
    description: product.productDesc,
    price: product.productPrice,
    category: product.categoryName,
    images: product.productImages ? JSON.parse(product.productImages) : [],
  });

  const handleEdit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.category
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const postData = new FormData();
    postData.append("productName", formData.title);
    postData.append("productDesc", formData.description);
    postData.append("productPrice", formData.price);
    postData.append("categoryName", formData.category);
    formData.images.forEach((image) => {
      postData.append("productImages", image);
    });

    try {
      const response = await axios.put(
        `http://localhost:4000/api/update/product/${product.productId}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Product Updated Successfully");
        fetchProducts();
        handleClose();
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImagesArray = Array.from(files);

    console.log(newImagesArray);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ...newImagesArray],
    }));
  };

  const handleRemoveImage = (index, e) => {
    e.preventDefault();
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  return (
    <div className="post-api">
      <Button variant="outline-light" onClick={handleShow}>
        <UpdateIcon />
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Container>
          <Modal.Header>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>

          <form onSubmit={handleEdit}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
                value={formData.title}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Description
              </label>
              <textarea
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
                value={formData.description}
                className="form-control"
                rows="5"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Price
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, price: e.target.value });
                }}
                value={formData.price}
                type="number"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Category
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value });
                }}
                value={formData.category}
                type="text"
                className="form-control"
              />
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
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="d-inline-block position-relative me-3"
                  >
                    {typeof image === "string" ? (
                      <img
                        src={
                          "http://localhost:4000/assets/productImages/" + image
                        }
                        alt={`Product Image ${index}`}
                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Newly Uploaded Image ${index}`}
                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                      />
                    )}
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

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </Modal.Footer>
          </form>
        </Container>
      </Modal>
    </div>
  );
};

export default UpdateProduct;

const UpdateIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="blue"
      className="bi bi-pencil"
      viewBox="0 0 16 16"
    >
      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
    </svg>
  );
};
