import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import PaymentPage from "./pages/PaymentPage";
import Publish from "./pages/Publish";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Cookies from "js-cookie";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [productToBuy, setProductToBuy] = useState([]);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [token, setToken] = useState(Cookies.get("") || "");
  const [query, setQuery] = useState(["title=", "priceMax=500", "priceMin=0"]);
  const queries = query.join("&");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--vinted--dzk9mdcz57cb.code.run/offers?${queries}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [query]);
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
        setQuery={setQuery}
        query={query}
      />
      <Routes>
        <Route path="/" element={<HomePage data={data.offers} />} />
        <Route
          path="/offer/:id"
          element={
            <OfferPage
              data={data.offers}
              token={token}
              setProductToBuy={setProductToBuy}
            />
          }
        />
        <Route
          path="/payment"
          element={
            <PaymentPage
              data={data.offers}
              token={token}
              setSignUpVisible={setSignUpVisible}
              setLoginVisible={setLoginVisible}
              productToBuy={productToBuy}
            />
          }
        />
        <Route
          path="/publish"
          element={
            <Publish
              token={token}
              setSignUpVisible={setSignUpVisible}
              setLoginVisible={setLoginVisible}
            />
          }
        />
        {/* <Route
          path="/offers?:query"
          element={<FilterPage data={data.offers} />}
        /> */}
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
