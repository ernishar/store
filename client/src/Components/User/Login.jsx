import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const errMess = {
  req: "Please fill this out",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("Email")
    .required(errMess.req)
    .email("Invalid Email"),
  password: yup.string().required(errMess.req),
});

const Login = () => {
  const navigate = useNavigate();
  const { getProfile } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:4000/api/login/user`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        localStorage.setItem("token", response.data.token);
        navigate("/list/products");
        getProfile();
        toast.success("Login Success");
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
        className="shadow p-4 bg-white rounded"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="h4 mb-2 text-center">Sign In</div>

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            isInvalid={errors.email}
            {...register("email")}
            placeholder="Email"
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

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Login;
