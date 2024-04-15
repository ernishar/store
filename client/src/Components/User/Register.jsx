import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const errMess = {
  message: "Please fill out the field",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required(errMess.message),
  lastName: yup.string().required(errMess.message),
  email: yup.string().required(errMess.message).email("Email is Invalid"),
  password: yup.string().required(errMess.req),
  gender: yup.string().required(errMess.message),
  hobbies: yup.string().required(errMess.message),
  profilePic: yup
    .mixed()
    .test("file", "You need to provide a file", (value) => {
      if (value.length > 0) {
        return true;
      }
      return false;
    })
    .test("fileSize", "The file is too large", (file) => {
      if (file[0] && file[0].size < 10000000) {
        return true;
      }
      return false;
    }),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      gender: data.gender,
      hobbies: data.hobbies,
      profilePic: data.profilePic[0],
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/register/user`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        navigate("/verify/user", { state: { email: data.email } });
        toast.success(
          "User registered successfully. Please verify your email."
        );
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

  return (
    <div className="sign-in__wrapper">
      <Form
        name="form"
        className="shadow p-4 bg-white rounded"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="h4 mb-2 text-center">Sign Up</div>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-2" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="text"
                isInvalid={errors.firstName}
                {...register("firstName")}
                placeholder="First Name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-2" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                isInvalid={errors.lastName}
                {...register("lastName")}
                placeholder="Last Name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            isInvalid={errors.email}
            {...register("email")}
            placeholder="email"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            isInvalid={errors.password}
            {...register("password")}
            placeholder="password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="gender">
          <Form.Label>Gender</Form.Label>
          <div className="d-flex gap-3">
            <Form.Check
              type="radio"
              label="Male"
              id="male"
              value="Male"
              name="gender"
              isInvalid={!!errors.gender}
              {...register("gender", { required: true })}
            />
            <Form.Check
              type="radio"
              label="Female"
              id="female"
              value="Female"
              name="gender"
              isInvalid={!!errors.gender}
              {...register("gender", { required: true })}
            />
          </div>
          {errors.gender && (
            <div className="invalid-feedback">{errors.gender.message}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-2" controlId="hobbies">
          <Form.Label>Hobbies</Form.Label>
          <Form.Control
            type="text"
            isInvalid={errors.hobbies}
            {...register("hobbies")}
            placeholder="hobbies"
          />
          <Form.Control.Feedback type="invalid">
            {errors.hobbies?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="profilePic">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            isInvalid={errors.profilePic}
            {...register("profilePic")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.profilePic?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Sign Up
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Signing Up...
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Register;
