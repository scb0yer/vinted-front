import "./App.css";

import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Node modules
import axios from "axios";
import Cookies from "js-cookie";

// Components
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

// Pages
import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import PaymentPage from "./pages/PaymentPage";
import Publish from "./pages/Publish";
import ProfilPage from "./pages/ProfilPage";
import NotFoundPage from "./pages/NotFoundPage";

library.add(faUser);

function App() {
  // Create the useStates
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [productToBuy, setProductToBuy] = useState([]);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [token, setToken] = useState(Cookies.get("") || "");
  const [userInfos, setUserInfos] = useState([]);
  const [count, setCount] = useState(1);
  const [amount, setAmount] = useState();
  const [query, setQuery] = useState([
    "title=",
    "priceMax=500",
    "priceMin=0",
    "count=1",
  ]);
  const queries = query.join("&");

  // Define the Costs
  const buyerCosts = 0.4;
  const shippingCosts = 0.8;

  // Add the number of times we click on "load more" to the queries so more announces appear (limit depends on it)
  useEffect(() => {
    const newQuery = [...query];
    newQuery[3] = `count=${count}`;
    setQuery(newQuery);
  }, [count]);

  // Collect the datas everytime a query is changed and return the routes
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
    <Router className="relative">
      <Header
        setSignUpVisible={setSignUpVisible}
        setLoginVisible={setLoginVisible}
        loginVisible={loginVisible}
        signUpVisible={signUpVisible}
        token={token}
        setToken={setToken}
        setQuery={setQuery}
        query={query}
        setCount={setCount}
        setUserInfos={setUserInfos}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              data={data.offers}
              setData={setData}
              dataNb={data.count}
              query={query}
              setQuery={setQuery}
              setCount={setCount}
              count={count}
            />
          }
        />
        <Route
          path="/offer/:id"
          element={
            <OfferPage
              data={data.offers}
              token={token}
              setProductToBuy={setProductToBuy}
              productToBuy={productToBuy}
              setAmount={setAmount}
              buyerCosts={buyerCosts}
              shippingCosts={shippingCosts}
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
              userInfos={userInfos}
              buyerCosts={buyerCosts}
              shippingCosts={shippingCosts}
              amount={amount}
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
        <Route
          path="/profil"
          element={
            <ProfilPage
              userInfos={userInfos}
              setUserInfos={setUserInfos}
              token={token}
              setToken={setToken}
              setSignUpVisible={setSignUpVisible}
              setLoginVisible={setLoginVisible}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {signUpVisible && (
        <SignUp
          setVisible={setSignUpVisible}
          setLoginVisible={setLoginVisible}
        />
      )}
      ;
      {loginVisible && (
        <Login
          setLoginVisible={setLoginVisible}
          setSignUpVisible={setSignUpVisible}
          setToken={setToken}
          setUserInfos={setUserInfos}
        />
      )}
      ;
    </Router>
  );
}

export default App;
