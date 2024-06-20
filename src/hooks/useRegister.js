// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase/firebaseConfig";

// function useRegister() {
//   const registerWithEmailAndPassword = async (userData) => {
//     console.log(userData);
//     try {
//       const result = await createUserWithEmailAndPassword(
//         auth,
//         userData.email,
//         userData.password
//       );
//       const userCredential = result.user;
//       console.log(userCredential);
//     } catch {}
//   };
//   return { registerWithEmailAndPassword };
// }

// export { useRegister };


import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function useRegister() {
  const registerWithEmailAndPassword = async (userData) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      await updateProfile(auth.currentUser,{
        displayName: userData.displayName,
      })

      const userCredential = result.user;
      dispatch({type:"LOG_IN", payload: userCredential})
      
      return { userCredential };
    } catch (error) {
      console.error("Error registering user:", error);
      return { error: error.message };
    }
  };

  return { registerWithEmailAndPassword };
}

export { useRegister };
