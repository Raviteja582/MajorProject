import React from "react";
import { Row, Col, NavLink } from "reactstrap";
import localStorage from "local-storage";
import { Link } from "react-router-dom";
const SignNav = (props) => {
  if (localStorage.get("token")) return <div></div>;
  else
    return (
      <div style={{ width: "100vw",position: "sticky", top: '0%', backgroundColor: 'white',opacity: 1, zIndex: 1 }}>
        <Row style={{ marginTop: "1%", marginLeft: "3%",marginBottom: "1%",position: "sticky" }}>
          <Col md={12} lg={9}>
            <NavLink tag={Link} to="/home" style={{ color: "grey" }}>
              <img src="/favicon.ico" alt="icon" width={60} /> {"  "}
              QP Generator
            </NavLink>
          </Col>
          <Col md={12} lg={3}>
            <div style={{ display: "flex" }}>
              <NavLink tag={Link} to="/signin" style={{ color: "grey" }}>
                login{" "}
                <img
                  src="/img/login.png"
                  alt="login"
                  style={{ display: "inline" }}
                ></img>
              </NavLink>
              <NavLink tag={Link} to="/signup" style={{ color: "grey" }}>
                signup{" "}
                <img
                  src="/img/logout.png"
                  alt="login"
                  style={{ display: "inline" }}
                ></img>
              </NavLink>
            </div>
          </Col>
        </Row>
      </div>
    );
};

export default SignNav;
