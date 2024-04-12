import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Register = () => {
  
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    hobbies: "",
    profilePic: null,
  });
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
        navigate("/login");
        toast.success("Registration Success");
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const MAX_FILE_SIZE_MB = 1;
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`File size should be less than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }
    setUserData({ ...userData, profilePic: file });
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
        onSubmit={handleFormSubmit}
      >
        <div className="h4 mb-2 text-center">Sign Up</div>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-2" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={userData.firstName}
                placeholder="First Name"
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-2" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={userData.lastName}
                placeholder="Last Name"
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            placeholder="Email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={userData.password}
            placeholder="Password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="gender">
          <Form.Label>Gender</Form.Label>
          <div className="d-flex gap-3">
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="Male"
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
              required
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="Female"
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
              required
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-2" controlId="hobbies">
          <Form.Label>Hobbies</Form.Label>
          <Form.Control
            type="text"
            value={userData.hobbies}
            placeholder="Hobbies (separated by commas)"
            onChange={(e) =>
              setUserData({ ...userData, hobbies: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="profilePic">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            required
          />
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
