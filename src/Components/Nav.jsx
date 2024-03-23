import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Nav = () => {
  const history = useHistory();

  const navStyle = {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: "0",
    padding: "0",
  };

  const navItemStyle = {
    fontSize: "18px",
  };

  return (
    <div
      className=" row1 "
      id="trail"
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "black",
        boxShadow: "inherit",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          alt="logo"
          className="logo-image"
          style={{ marginLeft: 20, marginRight: 20 }}
          src="https://upload.wikimedia.org/wikipedia/commons/5/57/Techno_india_logo.jpg"
        />
        <h3 style={{ color: "#fff", marginTop: 10 }}>Techno College Hooghly</h3>
      </div>
      <div style={{ width: "40%", paddingRight: 20 }}>
        <ul style={navStyle} className="row1">
          <li className="nav-item">
            <button
              type="button"
              className="btn"
              onClick={() => history.push("/")}
            >
              <li style={{ fontWeight: "bold", color: "#000" }}>Home</li>
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="btn"
              onClick={() => history.push("/about")}
            >
              <li style={{ fontWeight: "bold", color: "#000" }}>About Us</li>
            </button>
          </li>
          
          {/* <li ><Link to='/academics'>Academics</Link></li> */}
          <li className="nav-item">
            <button
              type="button"
              className="btn"
              onClick={() => history.push("/admission")}
            >
              <li style={{ fontWeight: "bold", color: "#000" }}>Admission</li>
            </button>
          </li>
          <li style={{ fontWeight: "bold" }}>Contact</li>
          {/* <li><Link to='/signup'>LogIn</Link></li> */}
          <li
            style={{ fontWeight: "bold" }}
            onClick={() => history.push("/signup/student")}
          >
            Register
          </li>
          {/* <li><Link to='/signup/student'>SignUp</Link></li> */}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
