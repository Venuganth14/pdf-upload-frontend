import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import bgh from '../Assets/bgH.jpg'

const UploadedList = ({ allImage, showPdf }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;


  const totalPages = allImage ? Math.ceil(allImage.length / itemsPerPage) : 0;

  
  const getCurrentItems = () => {
    if (!allImage) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allImage.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <div 
    className="min-h-screen flex flex-col items-center justify-center" 
    style={{
      backgroundImage: `url(${bgh})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width:'100vw'
    }}
  >
        <h4 className='pdf' style={{color:'white'}}>Uploaded PDFs:</h4>
        <div className="table-responsive">
          <table className="bg-[rgb(255,255,0.1)] text-center p-4 border rounded-sm shadow-lg"
        style={{
          maxWidth: "400px",
          width: "250px",
          margin: "0 auto",
          backgroundColor: "rgba(211, 211, 211, 0.1)", 
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}>
            <thead className="thead-dark">
              <tr>
                <th scope="col" style={{ width: '60%' }}>Title</th>
                <th scope="col" style={{ width: '40%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentItems().map((data, index) => (
                <tr key={data.pdf}>
                  <td>{data.title}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      View PDF
                    </button>
                  </td>
                </tr>
              ))}
              {getCurrentItems().length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center">No PDFs uploaded</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default UploadedList;
