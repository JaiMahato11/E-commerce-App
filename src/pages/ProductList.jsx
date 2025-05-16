import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => setProducts(res.data));
    }, []);

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Product List </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '20px' }}>


                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>

    );
}

export default ProductList;
