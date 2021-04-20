import React from "react";
import { NavLink, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

const LoginNav = (props) => {
  return (
    <div
      style={{
        width: "100vw",
        position: "sticky",
        top: "0%",
        backgroundColor: "white",
        opacity: 1,
        zIndex: 1,
      }}
    >
      <Row style={{ marginTop: "1%", marginLeft: "3%", marginBottom: "1%" }}>
        <Col md={12} lg={9}>
          <NavLink tag={Link} to="/home" style={{ color: "grey" }}>
            <img src="/favicon.ico" alt="icon" width={60} /> {"  "}
            QP Generator
          </NavLink>
        </Col>
        <Col md={12} lg={3}>
          <div style={{ display: "flex" }}>
            <NavLink
              tag={Link}
              to="/insert"
              style={{ color: "grey", padding: "3%" }}
            >
              Insert{" "}
            </NavLink>
            <NavLink
              tag={Link}
              to="/generate"
              style={{ color: "grey", padding: "3%" }}
            >
              Generate{" "}
            </NavLink>
            <NavLink
              tag={Link}
              to="/edit"
              style={{ color: "grey", padding: "3%" }}
            >
              Edit{" "}
            </NavLink>
            <NavLink
              tag={Link}
              to="/profile"
              style={{ color: "grey", padding: "3%" }}
            >
              <img src="/img/user.png" width={40} alt="user"></img>
            </NavLink>
            {/* <NavLink tag={Link} to="/profile" style={{ color: "grey", padding: '0%'  }}>
              Profile
            </NavLink>
            <Button color='white'>
              Logout
            </Button> */}
          </div>
        </Col>
      </Row>
      {/* <Navbar color="light" light expand="lg">
        <NavbarBrand>
          <NavLink to="/home" tag={Link} style={{ color: "black" }}>
            <img src="/favicon.ico" alt="icon" width={60} /> {"  "}
            QP Generator
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/home" className={"tab"}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/insert" className={"tab"}>
                Insert
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/generate" className={"tab"}>
                Generate
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/edit" className={"tab"}>
                Edit
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {props.user.user}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink tag={Link} to="/profile">
                    Profile
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={postLogout}>LogOut</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar> */}
    </div>
  );
};

export default LoginNav;
