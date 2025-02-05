import React, {useState} from "react";
import axios from "axios";

function LoginApi() {
  // Form state to capture form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous success message
    setError(""); // Clear previous error message

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );
      setMessage(response.data.message || "Login successful!");

      // Handle the token or any other data you want to store
      localStorage.setItem("authToken", response.data.token); // Store token in localStorage (or sessionStorage)

      // Optionally, reset the form or navigate to another page
      setFormData({email: "", password: ""});
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Error during login.");
      } else {
        setError("Error connecting to the server.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h3>Login Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{margin: "10px 0", padding: "5px", width: "100%"}}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{margin: "10px 0", padding: "5px", width: "100%"}}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      <div style={{marginTop: "20px"}}>
        {message && <p style={{color: "green"}}>{message}</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
      </div>
    </div>
  );
}

export default LoginApi;
