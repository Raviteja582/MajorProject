import "./App.css";
import Main from "./components/mainComponent";
import { BrowserRouter } from "react-router-dom";
import { Component } from "react";

class App extends Component {
  componentDidMount() {
    document.title = "QPGenerator";
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
