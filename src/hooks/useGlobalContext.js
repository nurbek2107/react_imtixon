import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("something went wrong use globalcontextptovder");
  }

  return context;
}

export { useGlobalContext };
