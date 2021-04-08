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
            >
                <img src={item.src} alt={item.altText} width="2080px"
                    height="750px" />
                <CarouselCaption captionText={item.caption} captionHeader={item.header} className="text-danger" />
            </CarouselItem>
        );
    });

    return (
        <div>
            <div style={{ height: "100vh", backgroundImage: "url(/img/intro.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
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
            <div style={{ backgroundColor: "aqua" }}>
                <Container style={{ margin: "10px auto", padding: "30px" }}>
                    <Row>
                        <Col>
                            <Card style={{ height: "90%" }} >
                                <CardBody>
                                    <CardTitle tag="h5" style={{ margin: "20px" }}>Inserting</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted" style={{ margin: "20px" }}>Prepare Questions</CardSubtitle>
                                    <CardText style={{ margin: "20px", textAlign: "justify", textJustify: "inter-word" }}>
                                        Here User can Create And Insert Questions in to the Database, where the user has option to
                                        Select Multiple Subjecsts at a time and Insert Multiple Questions at a time. As many questions from multiple Subjects
                                        can be inserted at a time from different units with different diffculty level.
                                    </CardText>
                                    <Button style={{ margin: "20px" }}>
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
                        <Col>
                            <Card style={{ height: "90%" }}>
                                <CardBody>
                                    <CardTitle tag="h5" style={{ margin: "20px" }}>Editing</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted" style={{ margin: "20px" }}>Modify the Questions</CardSubtitle>
                                    <CardText style={{ margin: "20px", textAlign: "justify", textJustify: "inter-word" }}>
                                        Here User can Select the Questions which are inserted by them as per the selection of Subject,
                                        diffculty and unit. User has a choice of Editing the questions
                                        or they can delete the questions if the want. After Editing the Question user can also undo them if they don't want to change.
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
                        <Col>
                            <Card style={{ height: "90%" }}>
                                <CardBody>
                                    <CardTitle tag="h5" style={{ margin: "20px" }}>Generate</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted" style={{ margin: "20px" }}>Prepare Question Paper</CardSubtitle>
                                    <CardText style={{ margin: "20px", textAlign: "justify", textJustify: "inter-word" }}>
                                        User have a choice based on there needs of the exam. If the Exam is of type Semester
                                        then they can choose Semester as format of Questio paper. If the Exams are of Internal type
                                        they can go with the mid exam format by providing the required details for the exam. User can get Question in .pdf format.
                                    </CardText>
                                    <Button style={{ margin: "20px" }}>
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
                </Container>
            </div>
            <footer>
                <section class="ft-main">
                    <div class="ft-main-item">
                        <h2 clas="ft-title">Quick Links</h2>
                        <ul>
                            <li><NavLink tag={Link} to="/signin" >
                                login
                    </NavLink></li>
                            <li>< NavLink tag={Link} to="/signup">
                                SignUp
                                            </NavLink></li>
                            <li>< NavLink tag={Link} to="/forgot">
                                forgot Password
                                            </NavLink></li>
                        </ul>
                    </div>
                    <div class="ft-main-item">
                        <h2 class="ft-title">Contact Us</h2>
                        <ul>
                            <li><NavLink tag={Link} to="/generate" >
                                Admin
                    </NavLink></li>
                            <li>< NavLink tag={Link} to="/generate">
                                Developers
                                            </NavLink></li>
                            <li>< NavLink tag={Link} to="/generate">
                                Email
                                            </NavLink></li>
                            <li>< NavLink tag={Link} to="/generate">
                                Twitter
                                            </NavLink></li>
                        </ul>
                    </div>
                </section>
            </footer >
        </div >
    );
};

export default Home;
