import useFetcher from "../hooks/useFatcher";
import ProductsList from "../components/ProductsList/ProductsList";

function Home() {
  const { data, isPending, error } = useFetcher("https://dummyjson.com/products");

  return (
    <div>
      {isPending && <div className="rounded-lg pt-4 max-w-8 mx-auto h-lvh ">    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style={{ shapeRendering: 'auto', display: 'block' }}>
        <g>
          <circle strokeLinecap="round" fill="none" strokeDasharray="50.26548245743669 50.26548245743669" stroke="#fff" strokeWidth="8" r="32" cy="50" cx="50">
            <animateTransform values="0 50 50;360 50 50" keyTimes="0;1" repeatCount="indefinite" dur="1.1904761904761905s" type="rotate" attributeName="transform"></animateTransform>
          </circle>
          <circle strokeLinecap="round" fill="none" strokeDashoffset="36.12831551628262" strokeDasharray="36.12831551628262 36.12831551628262" stroke="#f8b26a" strokeWidth="8" r="23" cy="50" cx="50">
            <animateTransform values="0 50 50;-360 50 50" keyTimes="0;1" repeatCount="indefinite" dur="1.1904761904761905s" type="rotate" attributeName="transform"></animateTransform>
          </circle>
        </g>
      </svg></div>}
      {error && <div>{error}fd</div>}
      {data && <ProductsList products={data.products} />}
      
    </div>
  );
}

export default Home;
