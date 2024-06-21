import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../hooks/useGlobalContext";

function CartItem({ product }) {
  const { deleteProduct, decreaseAmount, increaseAmount } = useGlobalContext();
  const [amount, setAmount] = useState(product.amount); // Initialize amount state with product.amount

  useEffect(() => {
    // Example: Perform some side effect when amount changes, if needed
    console.log(`Amount updated for product ${product.id}: ${amount}`);
  }, [amount, product.id]);

  return (
    <li>
      <div className="card card-side bg-base-200 shadow-xl mb-5">
        <figure>
          <img className="h-20" src={product.images} alt={product.title} />
        </figure>
        <div className="card-body">
          <h1 className="card-title">{product.title}</h1>
          <h2>Price: ${product.price}</h2>
          <h2>Discount Percentage: {product.discountPercentage}%</h2>
          <p>Amount: {amount}</p>
          <div className="card-actions justify-end">
            <div className="flex items-center gap-6">
              <button
                className="btn btn-secondary"
                onClick={() => increaseAmount(product.id)}
              >
                +
              </button>
              <p>{amount}</p>
              <button
                className="btn btn-secondary"
                onClick={() => decreaseAmount(product.id)}
              >
                -
              </button>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => deleteProduct(product.id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
