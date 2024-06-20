import { useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { GlobalContext } from "../context/GlobalContext";

function useRegister() {
  const { dispatch } = useContext(GlobalContext);

  const registerWithEmailAndPassword = async (userData) => {
    try {
      // Create user with email and password
      const result = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Update user profile with display name and photo URL
      await updateProfile(auth.currentUser, {
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      });

      const userCredential = result.user;

      // Dispatch login action with the user credentials
      dispatch({ type: "LOG_IN", payload: userCredential });

      return { userCredential };
    } catch (error) {
      console.error("Error registering user:", error);
      return { error: error.message };
    }
  };

  return { registerWithEmailAndPassword };
}

export { useRegister };
