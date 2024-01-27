import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import FilterPage from "./pages/FilterPage";
import Cookies from "js-cookie";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [token, setToken] = useState(Cookies.get("") || "");
  // const [keyword, setKeyword] = useState();

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
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <Router>
      <Header
        setSignUpVisible={setSignUpVisible}
        setLoginVisible={setLoginVisible}
        loginVisible={loginVisible}
        signUpVisible={signUpVisible}
        token={token}
        // setKeyword={setKeyword}
      />
      <Routes>
        <Route path="/" element={<HomePage data={data.offers} />} />
        <Route path="/offer/:id" element={<OfferPage data={data.offers} />} />
        <Route
          path="/offers?:query"
          element={<FilterPage data={data.offers} />}
        />
      </Routes>
      {signUpVisible && (
        <SignUp
          setVisible={setSignUpVisible}
          setLoginVisible={setLoginVisible}
        />
      )}
      ;
      {loginVisible && (
        <Login setVisible={setLoginVisible} setToken={setToken} />
      )}
      ;
    </Router>
  );
}

export default App;
