import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { REGISTER_URL } from "../endpoint";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submittedOnce, setSubmittedOnce] = useState(false); // Track first submit
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

 const validateUsername = (username) => username.trim() !== "";

  const validatePassword = (password) =>
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(password);

  const validateForm = () => {
    const newErrors = {};
    if (!validateUsername(username)) {
      newErrors.username = "Username cannot be empty";
    }
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 9 characters long, include 1 number and 1 special character";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedOnce(true); // mark that the user submitted once
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
 const newErrors = {};
  newErrors.formSuccess = "Account created successfully! Redirecting to login...";
   setErrors(newErrors);


      setTimeout(() => {
        navigate("/login");
      },3000)
      
    } catch (err) {
       const newErrors = {};
         newErrors.formError = err.message;
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    // Re-validate the form in real-time only after the first submit
    if (submittedOnce) {
      setErrors(validateForm());
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

           {errors.formSuccess && (
          <p className="text-green-500 text-sm mb-5 text-center">{errors.formSuccess}</p>
        )}
   {errors.formError && (
          <p className="text-red-500 text-sm mb-2 text-center">{errors.formError}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => handleChange("username", e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-2">{errors.username}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleChange("email", e.target.value.toLowerCase())}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`mt-5 w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading && <FiLoader className="animate-spin mr-2" size={20} />}
          {loading ? "Please wait..." : "Sign up"}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
