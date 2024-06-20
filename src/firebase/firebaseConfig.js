import { initializeApp } from "firebase/app";
import { limit } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { MdOutlineJoinLeft } from "react-icons/md";

const firebaseConfig = {
  apiKey: "AIzaSyDy-wVbk6QXPjtxKhD_dp1RjKjL5nwa-UI",
  authDomain: "market-fea67.firebaseapp.com",
  projectId: "market-fea67",
  storageBucket: "market-fea67.appspot.com",
  messagingSenderId: "728075861826",
  appId: "1:728075861826:web:f17ee796afa167905b52db",
  measurementId: "G-DHBKGNLZRX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)