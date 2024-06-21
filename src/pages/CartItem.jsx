import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { useGlobalContext } from "../hooks/useGlobalContext";

function CartItem({ product }) {
  const { deleteProduct, decreaseAmount, increaseAmount, calculateTotal } =
    useGlobalContext();

  return (
    <li>
      <div className="card card-side bg-base-200 shadow-xl mb-5">
        <figure>
          <img className="w-20 h-20" src={product.thumbnail} />
        </figure>
        <div className="card-body">
          <h1 className="card-title">{product.title}</h1>
          <h2>Price: ${product.price}</h2>
          <h2>discountPercentage: {product.discountPercentage}%</h2>
          <p>Amount: {product.amount}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-secondary"
              onClick={() => deleteProduct(product.id)}
            >
              <FaTrash />
            </button>
            <div className="flex items-center gap-6">
              <button
                className="btn"
                onClick={() => increaseAmount(product.id)}
              >
                +
              </button>
              <p>{product.amount}</p>
              <button
                className="btn"
                onClick={() => {
                  if (product.amount == 1) {
                    deleteProduct(product.id);
                  }
                  decreaseAmount(product.id);
                }}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => calculateTotal(product.id)}>
          Total Price:{" "}
        </button>
      </div>
    </li>
  );
}

export default CartItem;
