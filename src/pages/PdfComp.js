import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import bgh from '../Assets/bgH.jpg'

const PdfComp = ({ pdfFile }) => {
  const [error, setError] = useState(null);

  const handlePdfError = (error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF. Please try again later.');
  };

  return (
    <div className="pdf-container  flex items-center justify-center"
    style={{
      backgroundImage: `url(${bgh})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width:'100vw'
    }}>
      {pdfFile && (
        <Document
          file={pdfFile}
          onLoadError={handlePdfError}
          options={{ workerSrc: `/pdf.worker.min.js`, disableAutoFetch: true }}
        >
          {!error && <Page pageNumber={1} width={300} height={200} />}
          {error && <p className="pdf-error">{error}</p>}
        </Document>
      )}
    </div>
  );
};

export default PdfComp;
