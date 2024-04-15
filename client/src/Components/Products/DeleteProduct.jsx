import React, { useState, useContext } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { toast } from "sonner";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../../Context/UserContext";

const DeleteProduct = ({ productId }) => {
  const { fetchProducts } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Product Deleted");
        fetchProducts();
        handleClose();
      }
    } catch (error) {
      toast.error("There is something wrong");
    }
  };

  return (
    <div>
      <Button
        variant="outline-light"
        size="lg"
        className="rounded-circle text-danger"
        onClick={handleShow}
      >
        <MdDelete />
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Container>
          <Modal.Body>
            <p>Are you sure you want to delete this product?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </div>
  );
};

export default DeleteProduct;
