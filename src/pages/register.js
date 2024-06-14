import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { addAPI } from "../service/api";
import bgh from '../Assets/bgH.jpg'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  cpassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const RegisterPage = () => {
  const RegisterData = (obj, resetForm) => {
    addAPI("auth", obj)
      .then((resp) => {
        toast.success("Successfully Added!");
        window.location.href = "/login";
        resetForm();
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong.");
        setLoading(false);
      });
  };

  const [Loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      RegisterData(values, resetForm);
    },
  });

  return (
    <div 
    className="min-h-screen flex items-center justify-center" 
    style={{
      backgroundImage: `url(${bgh})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width:'100vw'
    }}
  >
      <div
        className="bg-[rgb(255,255,0.1)] text-center p-4 border rounded-sm shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          margin: "0 auto",
          backgroundColor: "rgba(211, 211, 211, 0.1)", 
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 className="text-2xl font-bold text-slate-800 uppercase">Register</h1>
        <div className="w-full h-full p-5 rounded">
          <form onSubmit={formik.handleSubmit}>
            <div
              className="flex flex-col justify-between h-full text-slate-500 space-y-4"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#ebedeb] w-full text-sm py-2 px-3 rounded ${
                    formik.touched.firstName && formik.errors.firstName && "border-red"
                  }`}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-red-500 text-sm text-start ps-2">
                    {formik.errors.firstName}
                  </div>
                )}
              </div>
              <br/>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#ebedeb] w-full text-sm py-2 px-3 rounded ${
                    formik.touched.lastName && formik.errors.lastName && "border-red"
                  }`}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-500 text-sm text-start ps-2">
                    {formik.errors.lastName}
                  </div>
                )}
              </div>
              <br/>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#ebedeb] w-full text-sm py-2 px-3 rounded ${
                    formik.touched.email && formik.errors.email && "border-red"
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm text-start ps-2">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <br/>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#ebedeb] w-full text-sm py-2 px-3 rounded ${
                    formik.touched.password && formik.errors.password && "border-red"
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm text-start ps-2">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <br/>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="cpassword"
                  value={formik.values.cpassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#ebedeb] w-full text-sm py-2 mb-3 px-3 rounded ${
                    formik.touched.cpassword && formik.errors.cpassword && "border-red"
                  }`}
                />
                {formik.touched.cpassword && formik.errors.cpassword && (
                  <div className="text-red-500 text-sm text-start ps-2">
                    {formik.errors.cpassword}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 mt-10 text-white bg-blue-900 rounded-md "
                disabled={Loading}
                style={{ background: "#01959a" }}
              >
                {Loading ? "Loading ..." : "Register"}
              </button>
            </div>
          </form>
        </div>
        <div className="py-3 text-sm pe-2">
          Already have an account?
          <Link id="comments-description" className="text-[#7E7A7C] ps-1" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
