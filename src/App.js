import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./pages/PdfComp";
import UploadedPdfs from "./pages/UploadedList";
import Home from "./pages/UploadedForm";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import Navbar from "./components/Navbar";
import ForbiddenPage from "./pages/ForbiddenPage"; 

import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    checkLoginStatus(); 
  }, []);

   const checkLoginStatus = () => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setIsLoggedIn(!!userData.name); 
    } else {
      setIsLoggedIn(false); 
    }
  };

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/pdf/get-files");
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:8080/files/${pdf}`);
  };


  const showNavbar = () => {
    const currentPath = window.location.pathname;
    return !["/signup", "/login"].includes(currentPath);
  };

  return (
    <Router>
      <div className="App">
        {showNavbar() && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        <Routes>
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          
          <Route
            path="/"
            element={isLoggedIn ? <Home getPdf={getPdf} /> : <Navigate to="/login" />} 
          />
       
          <Route
            path="/uploaded-pdfs"
            element={isLoggedIn ? (
              <UploadedPdfs allImage={allImage} showPdf={showPdf} />
            ) : (
              <Navigate to="/login" />
            )}
          />
         
          <Route path="/forbidden" element={<ForbiddenPage />} />
        </Routes>
        <PdfComp pdfFile={pdfFile} />
      </div>
    </Router>
  );
}

export default App;
