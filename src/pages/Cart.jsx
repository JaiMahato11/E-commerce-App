import { useCart } from '../context/CartContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Styled components for better organization
const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const CartHeader = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 15px;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 50px 0;
  color: #666;
  font-size: 1.2rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 5px;
  background: #f8f8f8;
  padding: 10px;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    max-height: 200px;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: #333;
`;

const ItemPrice = styled.p`
  margin: 5px 0;
  color: #666;
  font-size: 0.9rem;
`;

const ItemSubtotal = styled.p`
  margin: 5px 0;
  font-weight: bold;
  color: #2a6f97;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const CartSummary = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const TotalAmount = styled.h3`
  font-size: 1.5rem;
  color: #2a6f97;
  margin: 0;
  text-align: right;
`;

const CheckoutButton = styled.button`
  background-color: #2a6f97;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  transition: all 0.3s ease;
  &:hover {
    background-color: #1d4e6f;
    transform: translateY(-2px);
  }
`;

const ContinueShopping = styled.button`
  background-color: white;
  color: #2a6f97;
  border: 2px solid #2a6f97;
  padding: 15px 30px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
  transition: all 0.3s ease;
  &:hover {
    background-color: #f0f8ff;
    transform: translateY(-2px);
  }
`;

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      toast.info('Item removed from cart');
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    // In a real app, you would proceed to checkout
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <CartContainer>
      <CartHeader>Your Shopping Cart</CartHeader>

      {cart.length === 0 ? (
        <EmptyCart>
          <p>Your cart is empty</p>
          <ContinueShopping onClick={() => navigate('/')}>
            Continue Shopping
          </ContinueShopping>
        </EmptyCart>
      ) : (
        <>
          {cart.map(item => (
            <CartItem key={`${item.id}-${item.size || 'default'}`}>
              <ItemImage src={item.image} alt={item.title} />
              
              <ItemDetails>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemPrice>Price: ${item.price.toFixed(2)}</ItemPrice>
                <ItemSubtotal>Subtotal: ${(item.price * item.quantity).toFixed(2)}</ItemSubtotal>
                {/* <RemoveButton onClick={() => {
                  removeFromCart(item.id);
                  toast.info(`${item.title} removed from cart`);
                }}>
                  Remove
                </RemoveButton> */}
              </ItemDetails>

              <QuantityControl>
                <QuantityInput
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </QuantityControl>
            </CartItem>
          ))}

          <CartSummary>
            <TotalAmount>Total: ${total.toFixed(2)}</TotalAmount>
            <CheckoutButton onClick={handleCheckout}>
              Proceed to Checkout
            </CheckoutButton>
            <ContinueShopping onClick={() => navigate('/')}>
              Continue Shopping
            </ContinueShopping>
          </CartSummary>
        </>
      )}
    </CartContainer>
  );
}

export default Cart;