import React from 'react';


const ForbiddenPage = () => {
  return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Forbidden Access!</h4>
        <p>
          You do not have permission to access this page. Please login with
          proper credentials to view the content.
        </p>
      </div>
    </div>
  );
};

export default ForbiddenPage;
