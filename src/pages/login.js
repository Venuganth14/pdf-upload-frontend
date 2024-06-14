import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { addAPI } from "../service/api";
import bgh from '../Assets/bgH.jpg'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);

  const RegisterData = (obj, resetForm) => {
    addAPI("auth/login", obj)
      .then((resp) => {
        localStorage.setItem("userData", JSON.stringify(resp.data));
        localStorage.setItem("userCategory", resp.data.category);
        toast.success("Successfully Logged In!");


        navigate("/"); 
        resetForm();
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Invalid credentials.");
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
        <h1 className="text-2xl font-bold text-slate-800 uppercase">Login</h1>
        <div className="w-full h-full p-5 rounded">
          <form onSubmit={formik.handleSubmit}>
            <div
              className="flex flex-col justify-between h-full text-slate-500"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <div className="mt-5 space-y-4">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#ebedeb] w-full text-sm py-3 px-3 rounded ${
                    formik.touched.email && formik.errors.email && "border-red"
                  } mb-4`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm text-start ps-2">
                    {formik.errors.email}
                  </div>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-[#ebedeb] w-full text-sm py-3 px-3 rounded ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "border-red"
                  } mb-4`}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm text-start ps-2">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 mt-10 text-white bg-blue-900 rounded-md"
                disabled={loading}
                style={{ background: "#01959a" }}
              >
                {loading ? "Loading ..." : "Login"}
              </button>
            </div>
          </form>
        </div>
        <div className="py-3 text-sm pe-2">
          Don't have an account?
          <Link
            id="comments-description"
            className="text-[#7E7A7C] ps-1"
            to="/signup"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
