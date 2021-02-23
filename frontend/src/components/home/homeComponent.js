import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export const Home = () => {
    return (
        <div id="main">
            <nav id="navbar">
                <ul id="menu">
                    <li className="menuitem">
                        <Link to="/signup"> Sign Up </Link>
                    </li>
                    <li className="menuitem">
                        <Link to="/signin"> Sign In</Link>
                    </li>
                </ul>
            </nav>
            <div className="jumbotron">
                <h1> QUESTION PAPER GENERATOR</h1>
                <p>
                    Our Motive is to Generate Question Papers Automatically from
                    a vast database of questions and to remove manual task
                    present in it. We dedicated to prepare question paper as
                    random as possible, maintaining standards and zero error in
                    it. It makes lot easier to prepare question with a minimal
                    effort.
                </p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-1">
                        <img
                            src="https://miro.medium.com/max/566/1*NPUt18eaTUncC_LnOTEv9A.png"
                            alt="random"
                        />
                    </div>
                    <div className="col-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                    </div>
                    <div className="col-3">
                        <img
                            src="https://www.n2pdf.de/blog/wp-content/uploads/sites/2/2015/02/Fotolia_29043291_SGVHT.png"
                            alt="rot"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
