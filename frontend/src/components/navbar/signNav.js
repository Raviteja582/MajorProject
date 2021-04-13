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
            <div style={{ width: "100vw" }}>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>
                        <NavLink tag={Link} to="/home" style={{ color: "black" }}>
                            QP Generator
                    </NavLink> 
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" tabs>
                            <NavItem>
                                <NavLink tag={Link} to="/home" style={{color: "grey"}}>
                                    Home
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/signin" style={{color: "grey"}}>
                                    Login
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/signup" style={{color: "grey"}}>
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
