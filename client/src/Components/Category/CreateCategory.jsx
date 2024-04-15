import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { toast } from "sonner";
import axios from "axios";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const errMessage = {
  message: "Category Name is required",
};

const CategorySchema = yup.object().shape({
  categoryName: yup.string().required(errMessage.message),
});

const CreateCategory = ({ fetchCategories }) => {
  const {
    register: CreateCategoryForm,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CategorySchema),
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateCategory = async (data, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/create/category`,
        {
          categoryName: data.categoryName,
        },
        {
          headers: {
            contentType: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Category Created Successfully");
        fetchCategories();
        handleClose();
        data.categoryName = "";
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Category already exists");
      }
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="bg-light text-primary"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          handleShow();
        }}
      >
        Create Category
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Container>
          <Modal.Header>
            <Modal.Title>Create Category</Modal.Title>
          </Modal.Header>

          <Form onSubmit={handleSubmit(handleCreateCategory)}>
            <Modal.Body>
              <Form.Group controlId="categoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  name="categoryName"
                  placeholder="Enter Category Name"
                  {...CreateCategoryForm("categoryName")}
                  isInvalid={errors.categoryName}
                />
              </Form.Group>
              <Form.Control.Feedback type="invalid">
                {errors.categoryName?.message}
              </Form.Control.Feedback>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Create Category
              </Button>
            </Modal.Footer>
          </Form>
        </Container>
      </Modal>
    </div>
  );
};

export default CreateCategory;
