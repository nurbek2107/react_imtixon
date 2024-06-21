import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

function Product() {
  const { addProduct } = useContext(GlobalContext);
  const { id } = useParams();
  const { data, setData, error } = useFetch(
    "https://dummyjson.com/products/" + id
  );
  const [amount, setAmount] = useState(0);

  const handleAdd = () => {
    addProduct({ ...data, amount });
  };

  return (
    <>
      {data && (
        <div className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg mb-4">
                  <img
                    className="w-full h-full object-cover"
                    src={data.thumbnail}
                    alt="Product Image"
                  />
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <button
                      className="w-full py-2 px-4 rounded-full font-bold hover:text-white transition duration-700 ease-in-out hover:bg-gray-800 dark:hover:bg-gray-700"
                      onClick={handleAdd}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="w-1/2 px-2">
                    <button className="w-full py-2 px-4 rounded-full font-bold transition duration-700 ease-in-out hover:bg-gray-300 hover:text-white dark:hover:bg-gray-600">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <div className="flex items-center gap-5 flex-wrap">
                  <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
                  <div className="flex flex-row items-center justify-start gap-2 text-2xl mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width="32"
                      height="32"
                      className="text-green-400 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="font-bold text-xs text-green-600">
                      <span>8 / 10</span>
                    </p>
                  </div>
                </div>
                <p className="text-sm mb-4">{data.description}</p>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold">Price: </span>
                    <span>${data.price}</span>
                  </div>
                  <div>
                    <span className="font-bold">brand: </span>
                    <span>{data.brand}</span>
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <div className="flex items-center gap-4 mb-10">
                    <button
                      onClick={() => setAmount(amount + 1)}
                      className="btn btn-secondary"
                    >
                      +
                    </button>
                    <div>{amount}</div>
                    <button
                      onClick={() => setAmount(amount - 1)}
                      className="btn btn-secondary"
                    >
                      -
                    </button>
                    <button onClick={handleAdd} className="btn btn-secondary">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </>
  );
}

export default Product;
