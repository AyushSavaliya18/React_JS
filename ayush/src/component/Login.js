import React, {useState} from "react";
import Nav from "./Nav";
import LoginApi from "./LoginApi";
import "./Login.css"; // Import the new CSS file

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = formData;

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setMessage("Login successful!");
    } else {
      setMessage("Invalid email or password!");
    }

    setFormData({email: "", password: ""});
  };

  return (
    <div>
      <Nav />
      <div className="login-container">
        <h1 className="login-title">Login Form</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />

          <label className="login-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />

          <button type="submit" className="login-button">
            Login
          </button>

          {message && <p className="login-message">{message}</p>}
        </form>

        <h3 className="login-api-heading">
          If you want to log in through API, fill the form below:
        </h3>
        <LoginApi />
        <br />
        <h3 className="login-register-text">
          Don't have an account? <a href="./registration">Register</a>
        </h3>
      </div>
    </div>
  );
}

export default Login;
