import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { useGlobalContext } from "./useGlobalContext";
import toast from "react-hot-toast";

function useLogin() {
  const { dispatch } = useGlobalContext();
  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch({ type: "LOG_IN", payload: user });
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Welcome ${user.displayName} `);
    } catch (error) {
      const errorMessage = error.message;
      toast.error("Password or Email is incorrect");
    }
  };

  return { signUpWithGoogle, loginWithEmail };
}

export { useLogin };