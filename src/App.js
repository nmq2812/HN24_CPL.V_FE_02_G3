import "./styles/App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./pages/Home";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <HomePage></HomePage>
            <Footer></Footer>
        </div>
    );
}

export default App;
