import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

const Login = ({ setVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event, target) => {
    if (target === "email") {
      setEmail(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    }
  };
  const postData = async (email, password) => {
    try {
      const response = await axios.post(
        "https://site--vinted--dzk9mdcz57cb.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      setVisible(false);
      console.log();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className="modal-root"
      onClick={() => {
        setVisible(false);
      }}
    >
      <form
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <h2>Se connecter</h2>
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={(event) => {
            onChange(event, "email");
          }}
        />
        <input
          type="password"
          id="password"
          placeholder="Mot de Passe"
          onChange={(event) => {
            onChange(event, "password");
          }}
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            postData(email, password);
          }}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};
export default Login;
