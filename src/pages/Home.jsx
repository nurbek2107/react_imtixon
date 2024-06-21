import { useFetch } from "../hooks/useFetch";

import ProductsList from "../components/ProductsList";

function Home() {
  const { data, isPending, error } = useFetch("https://dummyjson.com/products/?limit=194");
  return <div >
    {isPending && <div>Loading...</div>}
    {data && <ProductsList data={data} />}
  </div>;
}

export default Home;
