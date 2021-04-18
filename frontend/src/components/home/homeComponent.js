import React, { Component } from "react";
import { Provider, Heading, Subhead, Flex, NavLink, Box, Pre } from "rebass";
import {
  Hero,
  CallToAction,
  ScrollDownIndicator,
  Laptop,
  Phone,
  Feature,
  Contributor,
  Checklist,
  Section,
} from "react-landing-page";
class App extends Component {
  render() {
    return (
      <Provider>
        <Hero color="black" bg="dark" backgroundImage="/bg1.jpg">
          <Flex flexWrap="wrap" alignItems="center">
            <Flex alignItems="flex-start" width={[1, 1, 1 / 2]} p={3}>
              <Laptop mt={3} src="/intro4.png" />
              <Phone
                color="black"
                style={{ transform: "translate(-32px, 32px)" }}
                src="/paper.jpeg"
              />
            </Flex>
            <Box width={[1, 1, 1 / 2]} p={3}>
              <Heading textAlign="center" color="white">
                Automatic Question Paper Generator
              </Heading>
              <Subhead textAlign="center" color="white">
                prepare your exams with our paper
              </Subhead>
              <Flex mt={3} flexWrap="wrap" justifyContent="center">
                <CallToAction href="/signin" mr={3}>
                  See more
                </CallToAction>
                <Pre p={3} color="white">
                  Login to our app
                </Pre>
              </Flex>
            </Box>
          </Flex>
          <ScrollDownIndicator color="white" />
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
          width={1000}
          style={{ marginLeft: "25%" }}
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
        <Heading textAlign="center" >Made by</Heading>
        <Flex justifyContent="space-around" mt={4}>
          <Contributor
            fullName="Gireesh Chandra Busam"
            title="17211A0581"
            avatar="/gireesh1.jpeg"
          >
            <Flex>
              <NavLink href="https://github.com/gireeshchandra">GitHub</NavLink>
            </Flex>
          </Contributor>
          <Contributor
            fullName="Ravi Teja Girijala"
            title="17211A0582"
            avatar="/linux.png"
          >
            <Flex>
              <NavLink href="https://github.com/Raviteja582">GitHub</NavLink>
            </Flex>
          </Contributor>
          <Contributor
            fullName="Nag Pavan"
            title="17211A0599"
            avatar="/np.png"
          >
            <Flex>
              <NavLink href="#">GitHub</NavLink>
            </Flex>
          </Contributor>
          <Contributor
            fullName="Tiger Naresh"
            title="18211A0518"
            avatar="/tiger.png"
          >
            <Flex>
              <NavLink href="#">GitHub</NavLink>
            </Flex>
          </Contributor>
        </Flex>
      </Provider>
    );
  }
}

export default App;
