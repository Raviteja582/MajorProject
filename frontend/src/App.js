import "./App.css";
import Main from "./components/mainComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configStore";

function App() {
    const store = ConfigureStore();
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Main />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
