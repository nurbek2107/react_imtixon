import { useGlobalContext } from "../hooks/useGlobalContext";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

function Cart() {
  const { total, products } = useGlobalContext();

  // Calculate total price by summing up all product subtotals
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.amount * product.price; // Calculate subtotal for each product
    });
    return totalPrice.toFixed(2); // Format total price to two decimal places
  };

  return (
    <div className="site-container flex gap-10">
      {products.length === 0 ? (
        <Link to="/" className="text-center">
          Oops! It looks like your cart is empty. Go to the Home page right now.
        </Link>
      ) : (
        <>
          <ul>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <div>
            <h2 className="text-2xl mt-2">
              Total Price: ${calculateTotalPrice()}
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
