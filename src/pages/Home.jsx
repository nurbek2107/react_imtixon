import useFetcher from "../hooks/useFetch";
import ProductsList from "../components/ProductList";

function Home() {
  const { data, isPending, error } = useFetcher(
    "https://dummyjson.com/products"
  );

  return (
    <div className="">
      {isPending && (
        <div className="rounded-lg pt-4 max-w-8 mx-auto  fixed inset-0 flex items-center justify-center  z-50">
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
        </div>
      )}
      {error && <div>{error}</div>}
      {data && <ProductsList products={data.products} />}
    </div>
  );
}

export default Home;
