import React from "react";
import { Container, Row, Col, Jumbotron } from "reactstrap";

const Home = () => {
    return (
        <div>
            <div>
                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">Fluid jumbotron</h1>
                        <p className="lead">
                            This is a modified jumbotron that occupies the
                            entire horizontal space of its parent.
                        </p>
                    </Container>
                </Jumbotron>
            </div>
            <Container style={{ maxWidth: "100%" }}>
                <Row>
                    <Col sm="4">
                        <img
                            style={{
                                height: "85%",
                                width: "75%",
                                display: "inline",
                            }}
                            src="https://miro.medium.com/max/566/1*NPUt18eaTUncC_LnOTEv9A.png"
                            alt="random"
                        />
                    </Col>
                    <Col sm="8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.DDuis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. uis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                    </Col>
                </Row>
                <Row>
                    <Col sm="8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.DDDDuis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. uis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. uis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. uis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                    </Col>
                    <Col sm="4">
                        <img
                            style={{
                                height: "75%",
                                width: "75%",
                                display: "inline",
                            }}
                            src="https://www.n2pdf.de/blog/wp-content/uploads/sites/2/2015/02/Fotolia_29043291_SGVHT.png"
                            alt="rot"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
