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
import { postLogout } from '../ActionCreators';
import { Link } from "react-router-dom";

const LoginNav = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div style={{ width: "100vw" }}>
            <Navbar color="light" light expand="md">
                <NavbarBrand>
                    <NavLink to="/home" style={{ color: "black" }}>
                        QuestionPaper
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
                                    <NavLink
                                        tag={Link}
                                        to="/home"
                                        className={"tab"}
                                    >
                                        Profile
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={postLogout}>
                                    LogOut
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default LoginNav;
