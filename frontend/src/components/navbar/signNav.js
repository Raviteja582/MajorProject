import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import localStorage from 'local-storage';
import { Link } from "react-router-dom";
const SignNav = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    if (localStorage.get('token')) return <div></div>
    else
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>
                        <NavLink tag={Link} to="/home" style={{ color: "black" }}>
                            reactstrap
                    </NavLink>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto center " navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/home">
                                    Home
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/signin">
                                    Login
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/signup">
                                    SignUp
                            </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
};

export default SignNav;
