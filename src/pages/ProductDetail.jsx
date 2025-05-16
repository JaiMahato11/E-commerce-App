import { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
const navigate = useNavigate();
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;
const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart'); 
  };
  return (
    <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
      <img src={product.image} alt={product.title} height="300" />
      <div>
        <h1>{product.title}</h1>
        <p><strong>${product.price}</strong></p>
        <p>{product.description}</p>
        <p>⭐ {product.rating.rate} ({product.rating.count})</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;
