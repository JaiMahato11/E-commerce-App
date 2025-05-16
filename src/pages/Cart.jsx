import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div
              key={item.id}
              style={{
                borderBottom: '1px solid #ccc',
                margin: '20px 0',
                paddingBottom: '15px',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              <img src={item.image} alt={item.title} height="80" style={{ objectFit: 'contain' }} />

              <div style={{ flex: 1 }}>
                <h4>{item.title}</h4>
                <p>Price: ${item.price}</p>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                  style={{ width: '60px', padding: '4px' }}
                />
              </div>
            </div>
          ))}

          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;
