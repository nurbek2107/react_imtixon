import { FaTrash } from "react-icons/fa6";
import { useGlobalContext } from "../hooks/useGlobalContext";
import CartItem from "./CartItem";

function Cart() {
  const { products, deleteProduct } = useGlobalContext();

  if (!products || products.length === 0) {
    // Handle case where products is undefined or empty
    return <div className="site-container">No items in the cart</div>;
  }

  return (
    <div className="site-container">
      <ul>
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default Cart;
