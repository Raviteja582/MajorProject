import React, { Component } from "react";
import { Provider, Heading, Subhead, Flex, NavLink} from "rebass";
import { Row, Col } from "reactstrap";
import {
  Hero,
  CallToAction,
  ScrollDownIndicator,
  Feature,
  Contributor,
  Checklist,
  Section,
} from "react-landing-page";
class App extends Component {
  render() {
    return (
      <Provider>
        <Hero
          color="white"
          backgroundImage="/landing1.jpg"
          bg="black"
          bgOpacity={0.5}
        >
          <Heading>Welcome to Question Paper Generator</Heading>
          <Subhead fontSize={[2, 3]}>
            Instant Unique Question Papers
          </Subhead>
          <Flex mt={3}>
            <CallToAction bg="green" mr={3} href="/insert">
              Add Questions
            </CallToAction>
            <CallToAction bg="red" href="/generate">Generate Paper</CallToAction>
          </Flex>
          <ScrollDownIndicator />
        </Hero>
        <Heading textAlign="center" mt={3}>
          What is inside?
        </Heading>
        <Flex flexWrap="wrap" justifyContent="center">
          <Feature icon="⌨" description="Insert New Questions for Subjects">
            Insert
          </Feature>
          <Feature icon="💻" description="Generate Unique Question Papers">
            Generate
          </Feature>
          <Feature icon="⌫" description="Select, Modify and Delete Questions">
            Edit
          </Feature>
        </Flex>
        <Heading textAlign="center">Why do this Project?</Heading>
        <Subhead textAlign="center">maybe this will help</Subhead>
        <Checklist
          style={{ padding: "2em" }}
          checkmark="★"
          children={[
            "Automate the Task",
            "Instant Question Paper",
            "Random Questions",
          ]}
        />
        <Section
          heading="Major Project"
          subhead="Under the Guidance of "
          width={1}
        >
          <Contributor
            fullName="Mr. V. Pradeep Kumar"
            title="Assistant Professor"
            avatar="/guide.jpg"
          ></Contributor>
        </Section>
        <Heading textAlign="center">Made by</Heading>
        <Row>
          <Col md={3} xs={6}>
            <Contributor
              fullName="Gireesh Chandra Busam"
              title="17211A0581"
              avatar="/gireesh.png"
              className="d-flex flex-sm-column"
            >
              <Flex>
                <NavLink href="https://github.com/gireeshchandra">
                  GitHub
                </NavLink>
              </Flex>
            </Contributor>
          </Col>
          <Col md={3} xs={6}>
            <Contributor
              fullName="Ravi Teja Girijala"
              title="17211A0582"
              avatar="/linux.png"
            >
              <Flex>
                <NavLink href="https://github.com/Raviteja582">GitHub</NavLink>
              </Flex>
            </Contributor>
          </Col>
          <Col md={3} xs={6}>
            <Contributor
              fullName="Naga Pavan Reddy"
              title="17211A0599"
              avatar="/np.png"
            >
              <Flex>
                <NavLink href="#">GitHub</NavLink>
              </Flex>
            </Contributor>
          </Col>
          <Col md={3} xs={6}>
            <Contributor
              fullName="Kommu Naresh Tiger"
              title="18215A0518"
              avatar="/tiger.png"
            >
              <Flex>
                <NavLink href="#">GitHub</NavLink>
              </Flex>
            </Contributor>
          </Col>
        </Row>
      </Provider>
    );
  }
}

export default App;
