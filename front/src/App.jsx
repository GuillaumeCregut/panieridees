import {Routes,Route} from "react-router-dom";
import './App.css';
import NavBar from "./components/navbar/NavBar";
import CartPage from "./pages/cart/CartPage";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panier" element={<CartPage />} />
        <Route path="/parametres" element={<Settings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
