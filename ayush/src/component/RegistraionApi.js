import React, {useState} from "react";
import axios from "axios";

function RegistrationApi() {
  // Form state to capture form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
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
        "http://localhost:8000/api/register",
        formData
      );
      setMessage(response.data.message || "Registration successful!");
      setFormData({username: "", email: "", password: "", role: "user"}); // Reset form
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Error during registration.");
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
      <h3>Registration Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{margin: "10px 0", padding: "5px", width: "100%"}}
          />
        </div>
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
        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{margin: "10px 0", padding: "5px", width: "100%"}}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
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
          Register
        </button>
      </form>
      <div style={{marginTop: "20px"}}>
        {message && <p style={{color: "green"}}>{message}</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
      </div>
    </div>
  );
}

export default RegistrationApi;
