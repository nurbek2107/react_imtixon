import ProductCart from "./ProductCart";

function ProductsList({ data }) {
  return (
    <div className="flex justify-center gap-10 flex-wrap" >
      {data.products.map((product) => {
        return <ProductCart key={product.id} product= {product}/>;
      })}
    </div>
  );
}

export default ProductsList;