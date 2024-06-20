// Login.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import toast from "react-hot-toast";

function Login() {
  const { loginWithEmail, signUpWithGoogle } = useLogin();
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await loginWithEmail(email, password);
      // Redirect or other actions upon successful login
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signUpWithGoogle();
      // Redirect or other actions upon successful Google sign-in
    } catch (error) {
      setError("Error signing in with Google. Please try again.");
    }
  };

  return (
    <div className="mt-24">
      <div className="flex rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-center">Brand</h2>
          <p className="text-xl text-center">Welcome back!</p>
          <Form onSubmit={handleLogin}>
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            <div className="mt-4">
              <FormInput type="email" labelText="Email:" name="email" />
            </div>
            <div className="mt-4">
              <FormInput
                type="password"
                labelText="Password:"
                name="password"
              />
            </div>
            <button
              className="btn btn-active font-bold py-2 px-4 w-full rounded mt-8"
              type="submit"
            >
              Login
            </button>
          </Form>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center mt-4 rounded-lg shadow-md btn btn-active w-full"
          >
            <svg className="h-6 w-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
            <span className="px-4 py-3 text-center font-bold">
              Sign in with Google
            </span>
          </button>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <NavLink to="/register" className="text-xs text-gray-500 uppercase">
              or Register
            </NavLink>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
