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
import ProfilPage from "./pages/ProfilPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [productToBuy, setProductToBuy] = useState([]);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [token, setToken] = useState(Cookies.get("") || "");
  const [userInfos, setUserInfos] = useState([]);
  const [count, setCount] = useState(1);
  const [query, setQuery] = useState([
    "title=",
    "priceMax=500",
    "priceMin=0",
    "count=1",
  ]);
  const queries = query.join("&");

  useEffect(() => {
    const newQuery = [...query];
    newQuery[3] = `count=${count}`;
    setQuery(newQuery);
  }, [count]);

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
              token={token}
              setToken={setToken}
              setSignUpVisible={setSignUpVisible}
              setLoginVisible={setLoginVisible}
            />
          }
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
