import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

//components
import ProtectedRoutes from "./components/ProtectedRoutes";

//layout
import MainLayout from "./layout/MainLayout";

//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

//context
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

//action
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";

function App() {
  const { user, dispatch, isAuthChange } = useContext(GlobalContext);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/product/:id", element: <Product /> },
        { path: "/cart", element: <Cart /> },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction, // Using imported action
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction, // Using imported action
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "LOG_IN", payload: user });
      dispatch({ type: "AUTH_CHANGE" });
    });
  }, []);

  return <>{isAuthChange && <RouterProvider router={routes} />}</>;
}

export default App;
