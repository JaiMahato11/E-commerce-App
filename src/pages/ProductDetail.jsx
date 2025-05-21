import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';

// Styled components for better organization
const ProductContainer = styled.div`
  display: flex;
  gap: 40px;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const ProductImage = styled.img`
  max-height: 400px;
  max-width: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: #333;
`;

const PriceTag = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  color: #2a6f97;
  margin: 10px 0;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.6;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ff9529;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const PrimaryButton = styled.button`
  background-color: #2a6f97;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #1d4e6f;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  background-color: white;
  color: #2a6f97;
  border: 2px solid #2a6f97;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #f0f8ff;
    transform: translateY(-2px);
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.5rem;
  color: #666;
`;

const CategoryTag = styled.span`
  display: inline-block;
  background-color: #e6f2ff;
  color: #2a6f97;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    navigate('/cart');
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  if (loading) return <Loading>Loading product details...</Loading>;
  if (error) return <Loading>{error}</Loading>;
  if (!product) return <Loading>Product not found</Loading>;

  return (
    <ProductContainer>
      <ImageContainer>
        <ProductImage src={product.image} alt={product.title} />
      </ImageContainer>
      
      <DetailsContainer>
        <CategoryTag>{product.category}</CategoryTag>
        <ProductTitle>{product.title}</ProductTitle>
        <Rating>
          ⭐ {product.rating.rate} 
          <span style={{ color: '#666', fontSize: '0.9rem', marginLeft: '5px' }}>
            ({product.rating.count} reviews)
          </span>
        </Rating>
        <PriceTag>${product.price.toFixed(2)}</PriceTag>
        <Description>{product.description}</Description>
        
        <ButtonGroup>
          <PrimaryButton onClick={handleBuyNow}>Buy Now</PrimaryButton>
          <SecondaryButton onClick={handleAddToCart}>Add to Cart</SecondaryButton>
        </ButtonGroup>
      </DetailsContainer>
    </ProductContainer>
  );
}

export default ProductDetail;