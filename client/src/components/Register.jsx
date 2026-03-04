import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {

  const formik = useFormik({
    initialValues: {
      mobile: "",
      password: "",
      rePassword: ""
    },

    validationSchema: Yup.object({

      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      rePassword: Yup.string()
        .oneOf([Yup.ref("password"),], "Passwords must match")
        .required("Confirm password is required")

    }),

    onSubmit: async (values, { resetForm }) => {

      try {
        const response = await axios.post(
          "http://localhost:3000/register",
          {
            mobile: values.mobile.trim(),
            password: values.password.trim()
          }
        );

        alert(response.data.status || "Registration Successful");
        console.log(response.data);

        resetForm();

      } catch (error) {

        console.error(error.response?.data);

        alert(
          error.response?.data?.error ||
          "Mobile Number already exists"
        );
      }
    }

  });

  return (
    <div className="login-container">

      <h2>Register</h2>

      <form onSubmit={formik.handleSubmit}>

        <input
          type="tel"
          name="mobile"
          placeholder="Enter Mobile Number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mobile}
        />

        {formik.touched.mobile && formik.errors.mobile && (
          <p>{formik.errors.mobile}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        {formik.touched.password && formik.errors.password && (
          <p>{formik.errors.password}</p>
        )}

        <input
          type="password"
          name="rePassword"
          placeholder="Re-enter Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
        />

        {formik.touched.rePassword && formik.errors.rePassword && (
          <p>{formik.errors.rePassword}</p>
        )}

        <button type="submit" className="btn1">
          Register
        </button>

      </form>
    </div>
  );
};

export default Register;