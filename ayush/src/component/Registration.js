import React from "react"; // Import React to use JSX and React hooks
import {useState} from "react"; // Import the useState hook to manage state

function Registration() {
  // State to hold form data (username, email, password, role)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role is set to 'user'
  });

  // State to store messages (such as error or success messages)
  const [message, setMessage] = useState(0);

  // Function to handle changes in input fields (username, email, password, role)
  const handleChange = (e) => {
    const {name, value} = e.target; // Get the name and value of the input field
    // Update the corresponding value in formData
    setFormData((prev) => ({
      ...prev, // Keep previous values unchanged
      [name]: value, // Update the specific field
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)

    const {username, email, password} = formData; // Destructure the form data

    // If any of the fields (username, email, password) are empty, show an error message
    if (!username || !email || !password) {
      setMessage("All fields are required!"); // Set an error message
      return; // Exit the function if validation fails
    }

    // Retrieve the list of users from localStorage, or initialize an empty array if not present
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user to the list of users
    users.push(formData);

    // Save the updated list of users back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Reset form data after successful submission
    setFormData({
      username: "",
      email: "",
      password: "",
    });

    // Set a success message after the registration is complete
    setMessage("Registration successful!");
  };

  return (
    <div className="form">
      <br />
      <br />
      Registration Form {/* Display the form title */}
      {/* Conditionally render the message (if it's set, display it) */}
      <br />
      <br />
      {/* Registration form */}
      <form onSubmit={handleSubmit}>
        {/* Username input field */}
        Username :
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange} // Update form data when the user types
          required // Ensure the field is not empty
        />
        <br />
        <br />
        {/* Email input field */}
        Email :
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange} // Update form data when the user types
          required // Ensure the field is not empty
        />
        <br />
        <br />
        {/* Password input field */}
        Password :
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange} // Update form data when the user types
          required // Ensure the field is not empty
        />
        <br />
        <br />
        {/* Dropdown to select the user's role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange} // Update form data when the user selects a role
        >
          <option value="user">User</option> {/* Option for 'user' role */}
          <option value="admin">Admin</option> {/* Option for 'admin' role */}
        </select>
        <br />
        <br />
        {/* Submit button */}
        <button type="submit">Register</button> {/* Submit form on click */}
        <br />
        <br />
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Registration; // Export the Registration component to use in other parts of the app
