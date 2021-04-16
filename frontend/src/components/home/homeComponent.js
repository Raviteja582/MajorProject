import React, { useState } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Row, Container, Col, NavLink
} from "reactstrap";
import localStorage from 'local-storage';
import { Link } from "react-router-dom";
import './style.css';
const Home = () => {
    const items = [
        {
            src: '/img/slide1.jpg',
            altText: 'Generate Paper',
            caption: 'Automated Generated Paper',
            header: 'Generating and Publishing',
            key: '1'
        },
        {
            src: '/img/slide2.png',
            altText: 'Push',
            caption: 'Push Questions To Centralize Database',
            header: 'Creating and Inserting',
            key: '2'
        },
        {
            src: '/img/slide3.png',
            altText: 'Edit',
            caption: 'Edit the Questions as per Choice',
            header: 'Modifying and Deleting',
            key: '3'
        }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            // style={{ height: "1080px", width: "1024px",minHeight: "600px", minWidth: '300px' }}
            >
                <img src={item.src} alt={item.altText}
                    style={{ height: "100vh", width: "100vw", minHeight: "600px", minWidth: '300px', backgroundImage: "url(/img/intro.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: 'center' }} />
                <CarouselCaption captionText={item.caption} captionHeader={item.header} className="text-danger" />
            </CarouselItem>
        );
    });

    return (
        <div style={{ minWidth: "300px" }}>
            <div style={{ height: "100vh", minHeight: "600px", backgroundImage: "url(/img/intro.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: 'center' }}>
            </div>
            <div>
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    pause={false}
                    interval={2000}
                    ride="carousel"
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
            </div>
            <div>
                <Container style={{ margin: "10px auto", padding: "30px", display: "flex", flexDirection: 'column' }}>
                    <Row style={{ backgroundColor: "aqua", margin: '10px 10px' }}>
                        <Col md={4} sm={12} style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Card >
                                <CardBody>
                                    <CardTitle tag="h5" style={{ margin: "20px" }}>Insert</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted" style={{ margin: "20px" }}>Prepare Questions</CardSubtitle>
                                    <CardText style={{ margin: "20px", textAlign: "justify", textJustify: "inter-word" }}>
                                        User can insert questions of choice into the database. User has the option to choose subject, difficulty and insert multiple questions into multiple subjects at a time.
                                    </CardText>
                                    <Button style={{ margin: "20px",marginTop: '20%' }}>
                                        {
                                            localStorage.get('token') ?
                                                < NavLink tag={Link} to="/insert" style={{ color: "black" }}>
                                                    Insert
                                            </NavLink> :
                                                < NavLink tag={Link} to="/signin" style={{ color: "black" }}>
                                                    Insert
                                                </NavLink>
                                        }
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4} sm={12} style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5" style={{ margin: "20px" }}>Editing</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted" style={{ margin: "20px" }}>Modify the Questions</CardSubtitle>
                                    <CardText style={{ margin: "20px", textAlign: "justify", textJustify: "inter-word" }}>
                                    User can select the subject and difficulty level and be able to view the questions which are present in the database and edit or delete the questions as required. The users will also have the option to undo the changes if they wish to go to back to the original. 
                                    </CardText>
                                    <Button style={{ margin: "20px" }}>
                                        {
                                            localStorage.get('token') ?
                                                < NavLink tag={Link} to="/edit" style={{ color: "black" }}>
                                                    Edit
                                            </NavLink> :
                                                < NavLink tag={Link} to="/signin" style={{ color: "black" }}>
                                                    Edit
                                                </NavLink>
                                        }
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4} sm={12} style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5" style={{ margin: "20px" }}>Generate</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted" style={{ margin: "20px" }}>Prepare Question Paper</CardSubtitle>
                                    <CardText style={{ margin: "20px", textAlign: "justify", textJustify: "inter-word" }}>
                                    User can generate Question Papers in different formats depending on the type of examination (Semester and Mid-term). Users can choose Date and time of the examination and then generate the Question Paper.
                                    </CardText>
                                    <Button style={{ margin: "20px",marginTop: '11%' }}>
                                        {
                                            localStorage.get('token') ?
                                                < NavLink tag={Link} to="/generate" style={{ color: "black" }}>
                                                    Generate
                                            </NavLink> :
                                                < NavLink tag={Link} to="/signin" style={{ color: "black" }}>
                                                    Generate
                                                </NavLink>
                                        }
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ margin: '10px 10px' }}>
                        <footer>
                            <section class="ft-main">
                                <div class="ft-main-item">
                                    <h2 clas="ft-title">Quick Links</h2>
                                    <ul>
                                        <li>
                                            <NavLink tag={Link} to="/signin" >
                                                login
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink tag={Link} to="/signup">
                                                SignUp
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink tag={Link} to="/forgot">
                                                forgot Password
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <div class="ft-main-item">
                                    <h2 class="ft-title">Contact Us</h2>
                                    <ul>
                                        <li>
                                            <NavLink tag={Link} to="/generate" >
                                                Admin
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink tag={Link} to="/generate">
                                                Developers
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink tag={Link} to="/generate">
                                                Email
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink tag={Link} to="/generate">
                                                Twitter
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </footer >
                    </Row>
                </Container>
            </div>
        </div >
    );
};

export default Home;
