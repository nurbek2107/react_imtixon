import { FaTrash } from "react-icons/fa6";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

function Cart() {
  const { total, products, deleteProduct } = useGlobalContext();
  return (
    <div className="site-container">
      {/* <Link to="/" className="text-center">Oops! It looks like your cart is empty. Go to the Home page right now.</Link> */}
      <ul>
        {products.length > 0 &&
          products.map((product) => {
            return <CartItem key={product.id} product={product} />;
          })}
      </ul>
    </div>
  );
}

export default Cart;
