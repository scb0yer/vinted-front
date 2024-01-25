import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import SignUp from "./components/SignUp";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  console.log(visible);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <Router>
      <Header setVisible={setVisible} />
      <Routes style={{ overflow: visible ? "hidden" : "scroll" }}>
        <Route path="/" element={<HomePage data={data.offers} />} />
        <Route path="/offer/:id" element={<OfferPage data={data.offers} />} />
      </Routes>
      {visible && <SignUp setVisible={setVisible} />};
    </Router>
  );
}

export default App;
