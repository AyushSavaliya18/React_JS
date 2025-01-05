import React, {useState} from "react";
import Nav from "./Nav";
// Define the Login component
function Login() {
  // State for storing form data (email and password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for storing the message to show after form submission (e.g., success or error)
  const [message, setMessage] = useState(0);

  // Handle form input changes
  const handleChange = (e) => {
    const {name, value} = e.target; // Destructure name and value from the event target
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Update only the corresponding field (email or password)
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    const {email, password} = formData; // Extract email and password from form data

    // Get stored users from localStorage (or initialize as an empty array if not found)
    const storeusers = JSON.parse(localStorage.getItem("users")) || [];

    // Find a user that matches the entered email and password
    const user = storeusers.find(
      (user) => user.email === email && user.password === password
    );

    // Check if a user was found and update the message accordingly
    if (user) {
      setMessage("login successful!"); // Display success message if user is found
    } else {
      setMessage("invalid email or password!"); // Display error message if no match
    }

    // Clear the form data after submission
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <Nav />
      <div className="form">
      <h1>Login Form</h1>
      {/* Display the message if available */}
      {/* Form for user login */}
      <br />

      <form onSubmit={handleSubmit}>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">Login</button>
        <br />
        <br />
        {message && <p>{message}</p>}
      </form>
      <h3>
        Don't have an account? <a href="./registration">Register</a>
      </h3>
      </div>
    </div>
  );
}

export default Login;
