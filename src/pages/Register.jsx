// import React, { useEffect } from "react";
// import { Form, useActionData } from "react-router-dom";
// import FormInput from "../components/FormInput"; // FormInput komponentini import qilish
// import { useLogin } from "../hooks/useLogin"; // useLogin custom hook ni import qilish
// import { useRegister } from "../hooks/useRegister"
// import { info } from "autoprefixer";

// export const action = async ({ request }) => {
//   let formData = await request.formData();
//   let displayName = formData.get("displayName");
//   let email = formData.get("email");
//   let password = formData.get("password");
//   return { displayName, email, password}
// };

// function Register() {
//   const userData = useActionData()
//  const {  registerWithEmailAndPassword } = useRegister()
//  useEffect(() => {
//   if(userData){
//     registerWithEmailAndPassword(userData)
//   }
//  }, [userData])
//   const { signUpWithGoogle } = useLogin();
//   return (
//     <div className="grid place-items-center min-h-screen">
//       <Form method="post" className="w-96">
//         <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
//         <FormInput type="text" labelText="Display name :" name="displayName"/>
//         <FormInput type="email" labelText="Email :"name="email" />
//         <FormInput type="password" labelText="Password :" name="password" />
//         <button className="btn btn-outline btn-info btn-block mt-6">
//           Register
//         </button>
//         <button
//           type="button"
//           onClick={signUpWithGoogle}
//           className="btn btn-outline btn-success text-center btn-block mt-3"
//         >
//           Sign up with Google
//         </button>
//       </Form>
//     </div>
//   );
// }

// export default Register;

import React, { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let displayName = formData.get("displayName");
  let email = formData.get("email");
  let password = formData.get("password");
  return { displayName, email, password };
};

function Register() {
  const infoObj = useActionData();
  const { registerWithEmailAndPassword } = useRegister();
  const { signUpWithGoogle } = useLogin();
  const [error, setError] = useState(null);

  useEffect(() => {
    const registerUser = async () => {
      if (infoObj) {
        if (infoObj.password.length < 6) {
          setError("Password should be at least 6 characters.");
          return;
        }

        // Simple email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(infoObj.email)) {
          setError("Invalid email format.");
          return;
        }

        const result = await registerWithEmailAndPassword(infoObj);
        if (result && result.error) {
          if (result.error.includes("auth/email-already-in-use")) {
            setError("This email is already registered. Please use a different email.");
          } else {
            setError(result.error);
          }
        } else {
          setError(null);
          // Redirect or perform other actions upon successful registration
        }
      }
    };
    registerUser();
  }, [infoObj, registerWithEmailAndPassword]);

  return (
    <div className="grid place-items-center min-h-screen">
      <Form method="post" className="w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <FormInput type="text" labelText="Display name:" name="displayName" />
        <FormInput type="email" labelText="Email:" name="email" />
        <FormInput type="password" labelText="Password:" name="password" />

        <button className="btn btn-outline btn-info btn-block mt-6" type="submit">
          Register
        </button>
        <button
          type="button"
          onClick={signUpWithGoogle}
          className="btn btn-outline btn-success text-center btn-block mt-3"
        >
          Sign up with Google
        </button>
      </Form>
    </div>
  );
}

export default Register;
