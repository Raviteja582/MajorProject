import "./App.css";
import Main from "./components/mainComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configStore";
import Generate from './components/generate/generateComponent';

function App() {
    const store = ConfigureStore();
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Generate />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
