import React from "react";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastError, toastSuccess } from "../utils/toast";
import { registerUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

interface RegisterFormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  gender: string;
  profilePhoto: string;
}

const Register = () => {
    const navigate = useNavigate()
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Other"], "Invalid gender")
      .required("Gender is required"),
    profilePhoto: Yup.string().required("Profile Photo URL is required"),
  });

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      password: "",
      email: "",
      phoneNumber: "",
      gender: "",
      profilePhoto: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await registerUser(values);
        if ('data' in response) {
          toastSuccess("Registration successful!");
          navigate('/')
          resetForm();
        }
      } catch (error: any) {
        toastError(error.response?.data?.message || "Registration failed");
      }
    },
  });

  return (
    <div style={{ margin: "20px", maxWidth: "400px", padding: "20px" }}>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("firstName")}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />

        <TextField
          id="middleName"
          label="Middle Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("middleName")}
          error={formik.touched.middleName && Boolean(formik.errors.middleName)}
          helperText={formik.touched.middleName && formik.errors.middleName}
        />

        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("lastName")}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("phoneNumber")}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />

        <TextField
          id="gender"
          label="Gender"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("gender")}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          helperText={formik.touched.gender && formik.errors.gender}
        />

        <TextField
          id="profilePhoto"
          label="Profile Photo URL"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("profilePhoto")}
          error={formik.touched.profilePhoto && Boolean(formik.errors.profilePhoto)}
          helperText={formik.touched.profilePhoto && formik.errors.profilePhoto}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
