import ProductCard from '../productCard/ProductCard';

function ProductsList({ products }) {
    if (!products || products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div className='flex flex-wrap justify-center gap-10'>
            {products.map((product) => (
                <div key={product.id} className='product-container'>
                    <ProductCard id={product.id} product={product} />
                    
                </div>
            ))}
        </div>
    );
}

export default ProductsList;
