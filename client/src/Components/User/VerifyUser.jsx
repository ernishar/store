import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const errMess = {
  message: "Please fill out the field",
};

const validationSchema = yup.object().shape({
  otp: yup.string().required(errMess.message),
});

const VerifyUser = () => {
  const { user } = useContext(UserContext);

  console.log(user.verified);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const email = location?.state?.email;

  useEffect(() => {
    if (user.verified === 1) {
      navigate("/profile");
      toast.success("You are already verified");
    }
  }, [user.verified, navigate]);

  //   useEffect(() => {
  //     if (!email) {
  //       navigate("/register");
  //     }
  //   }, [email, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = async (data) => {
    const { otp } = data;
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/verify/user`,
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        navigate("/login");
        toast.success("OTP verified successfully. You can now login.");
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
        <div className="h4 mb-2 text-center">OTP Verification</div>
        <p className="mb-3 text-center">
          An OTP has been sent to your email. Please enter it below:
        </p>

        {/* OTP field */}
        <Form.Group className="mb-2" controlId="otp">
          <Form.Control
            type="text"
            name="otp"
            placeholder="Enter OTP"
            // Add necessary props here
            {...register("otp")}
          />
          {errors.otp && (
            <div className="invalid-feedback">{errors.otp.message}</div>
          )}
        </Form.Group>

        {/* Submit Button */}
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Verify OTP
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Verifying OTP...
          </Button>
        )}
      </Form>
    </div>
  );
};

export default VerifyUser;
