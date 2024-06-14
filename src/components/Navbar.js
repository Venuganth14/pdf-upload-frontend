import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Name, setName] = useState("");
  const location = useLocation();

  const getcurrentUserData = () => {
    try {
      const userDataString = JSON.parse(localStorage.getItem("userData")) || {};
      setName(userDataString.name || "not show");
      setIsLoggedIn(!!userDataString.name);
    } catch (error) {
      setName("not show");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getcurrentUserData();
  }, []);

  const logoutfunction = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <div className="App-header bg-gray-200 text-white fixed top-0 left-0 right-0">
      <header className="w-full px-4 py-1 flex items-center justify-between">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ marginRight: 'auto' }}>
            <Link
              to="/profile"
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "8px 12px",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#4B5563")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              {Name}
            </Link>
          </div>
          <button
            onClick={logoutfunction}
            style={{
              backgroundColor: "#FF0000",
              color: "white",
              fontSize: "14px",
              padding: "8px 12px",
              borderRadius: "4px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
