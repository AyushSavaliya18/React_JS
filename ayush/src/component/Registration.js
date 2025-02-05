import React, {useState} from "react";
import Nav from "./Nav";
import RegistrationApi from "./RegistraionApi";
import "./Registration.css"; // Import the new CSS file

function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
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

    const {username, email, password} = formData;

    if (!username || !email || !password) {
      setMessage("All fields are required!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    setFormData({username: "", email: "", password: "", role: "user"});

    setMessage("Registration successful!");
  };

  return (
    <div>
      <Nav />
      <div className="registration-container">
        <h1 className="registration-title">Registration Form</h1>

        <form onSubmit={handleSubmit} className="registration-form">
          <label className="registration-label">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="registration-input"
          />

          <label className="registration-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="registration-input"
          />

          <label className="registration-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="registration-input"
          />

          <label className="registration-label">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="registration-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="registration-button">
            Register
          </button>

          {message && <p className="registration-message">{message}</p>}
        </form>

        <br />
        <br />

        <h3 className="registration-api-heading">
          If you want to register through API, fill the form below:
        </h3>
        <RegistrationApi />

        <br />
        <h3 className="registration-login-text">
          Already have an account? <a href="./login">Login</a>
        </h3>
      </div>
    </div>
  );
}

export default Registration;
