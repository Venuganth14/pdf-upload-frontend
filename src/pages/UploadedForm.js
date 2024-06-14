import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import bgh from '../Assets/bgH.jpg'

const UploadForm = ({ getPdf }) => {
  const navigate = useNavigate(); 
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(
        "http://localhost:8080/api/pdf/upload-files",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!!");
        getPdf();
        navigate("/uploaded-pdfs"); 
      } else {
        alert("Upload Failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Upload Failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div 
    className="min-h-screen flex items-center justify-center" 
    style={{
      backgroundImage: `url(${bgh})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width:'100vw'
    }}
  >
      <form className="bg-[rgb(255,255,0.1)] text-center p-4 border rounded-sm shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          margin: "0 auto",
          backgroundColor: "rgba(211, 211, 211, 0.1)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }} onSubmit={submitImage}>
        <h4>Upload Pdf </h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          className="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      </div>
    </>
  );
};

export default UploadForm;
