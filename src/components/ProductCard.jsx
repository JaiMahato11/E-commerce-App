import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} height="150" width={150} />
        <h4>{product.title}</h4>
        <p>${product.price}</p>
        <p>⭐ {product.rating.rate} ({product.rating.count})</p>
      </Link>
    </div>
  );
}

export default ProductCard;
