import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import API from "../../../api";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

    // Check if Token exists
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        navigate("/dashboard"); // Redirect to dashboard if token exists
      }
    }, [navigate]); // Runs when component mounts
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError(""); 

    const params = { email, password };

    try {
      // Make POST request using the API instance
      const response = await API.post("/login", params);
      const token = response.data.token;
      // const userId = response.data.userdata.id; 

      localStorage.setItem("authToken", token);
      
      setSuccessMessage("You have successfully logged in.");
      navigate("/dashboard");

      setEmail("");
      setPassword("");
      setError(""); 
    } catch (err) {      
      if (err.response && err.response.data ) {
        setError(err.response.data.error || "Something went wrong.");
      } else {
        setError("Network error. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-xs pb-1">{successMessage}</p>
            )}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
