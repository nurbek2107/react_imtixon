import { FaTrash } from "react-icons/fa6";
import { useGlobalContext } from "../hooks/useGlobalContext";

function CartItem({ product }) {
  const { deleteProduct, decreaseAmount, increaseAmount } = useGlobalContext();

  const handleIncrease = () => {
    increaseAmount(product.id);
  };

  const handleDecrease = () => {
    if (product.amount === 1) {
      deleteProduct(product.id);
    } else {
      decreaseAmount(product.id);
    }
  };

  const handleDelete = () => {
    deleteProduct(product.id);
  };

  const totalPrice = (product.amount * product.price).toFixed(2);

  return (
    <div className="flex items-start gap-20">
      <li>
        <div className="card card-side bg-base-200 shadow-xl mb-5 w-[800px] flex items-center justify-between p-5">
          <div className=" flex gap-5">
            <figure>
              <img
                className="w-20 h-20"
                src={product.thumbnail}
                alt={product.title}
              />
            </figure>
            <div>
              <h1 className="card-title">{product.title}</h1>
              <h2>Price: ${product.price}</h2>
              <p>Amount: {product.amount}</p>
              <button
                onClick={() => {}}
                aria-label="Calculate total"
                className="flex justify-start"
              >
                Total Price: ${totalPrice}
              </button>
            </div>
          </div>

          <div className="card-actions justify-end">
            <div className="flex items-center gap-6">
              <button
                className="btn"
                onClick={handleIncrease}
                aria-label="Increase amount"
              >
                +
              </button>
              <p>{product.amount}</p>
              <button
                className="btn"
                onClick={handleDecrease}
                aria-label="Decrease amount"
              >
                -
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleDelete}
                aria-label="Delete product"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

export default CartItem;
