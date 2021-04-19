import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { postLogout } from "../ActionCreators";
import { Link } from "react-router-dom";

const AdminLoginNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={{ width: "100vw" }}>
      <Navbar color="light" light expand="lg">
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
              <NavLink tag={Link} to="/department" className={"tab"}>
                Department
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/subject" className={"tab"}>
                Subjects
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
      </Navbar>
    </div>
  );
};

export default AdminLoginNav;
