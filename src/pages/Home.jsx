import useFetcher from "../hooks/useFetch";
import ProductsList from "../components/ProductList";

function Home() {
  const { data, isPending, error } = useFetcher(
    "https://dummyjson.com/products"
  );

  return (
    <div className="container mx-auto">
      {isPending && (
        <div className="flex justify-center items-center h-screen">
          <div className="relative inline-flex">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
          </div>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center py-4">
          Error: {error.message}
        </div>
      )}
      {data && <ProductsList products={data.products} />}
    </div>
  );
}

export default Home;
