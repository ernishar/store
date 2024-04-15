import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "sonner";
import axios from "axios";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const errMess = {
  message: "Please fill out the field",
};

const validationSchema = yup.object().shape({
  name: yup.string().required(errMess.message),
  email: yup.string().required(errMess.message).email("Email is Invalid"),
  pdf: yup
    .mixed()
    .test("file", "Please upload a file", (file) => {
      console.log(file);
      if (file.length > 0) {
        return true;
      }
      return false;
    })
    .test("file", "Only pdf are allowed", (file) => {
      const acceptedImageTypes = ["application/pdf"];

      if (acceptedImageTypes.includes(file[0].type)) {
        return true;
      }
      return false;
    })
    .test("fileSize", "The file is too large", (file) => {
      if (file[0] && file[0].size < 5000000) {
        return true;
      }
      return false;
    }),
});

const SendMail = () => {
  const {
    register: sendMail,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      pdf: data.pdf[0],
    };

    console.log(userData);

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/sendeMail`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        toast.success("Email sent successfully");
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
        <div className="h4 mb-2 text-center">Send the Report through Email</div>

 
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            isInvalid={errors.email}
            {...sendMail("email")}
            placeholder="Email"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="subject">
          <Form.Label>subject</Form.Label>
          <Form.Control
            type="text"
            isInvalid={errors.subject}
            {...sendMail("subject")}
            placeholder="subject"
          />
          <Form.Control.Feedback type="invalid">
            {errors.subject?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="message">
          <Form.Label>message</Form.Label>
          <Form.Control
            type="text"
            isInvalid={errors.message}
            {...sendMail("message")}
            placeholder="message"
          />
          <Form.Control.Feedback type="invalid">
            {errors.message?.message}
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group className="mb-2" controlId="profilePic">
          <Form.Label>attachment</Form.Label>
          <Form.Control
            type="file"
            name="pdf"
            accept=".pdf"
            isInvalid={errors.profilePic}
            {...sendMail("pdf")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.profilePic?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Sending Mail....
          </Button>
        )}
      </Form>
    </div>
  );
};

export default SendMail;
