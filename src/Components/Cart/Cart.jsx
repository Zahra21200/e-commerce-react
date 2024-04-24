import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../Store/action';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const handleRemoveItem = (productId) => {
    const confirmRemove = window.confirm('Are you sure you want to remove this item from the cart?');
    if (confirmRemove) {
      removeFromCart(productId);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="row mb-3" key={item.id}>
              <div className="col-md-3">
                <img src={item.api_featured_image} alt={item.name} className="img-fluid" />
              </div>
              <div className="col-md-3">
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
                <div className="input-group mb-3">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleRemoveItem(item.id)} className="btn btn-danger">Remove</button>
              </div>
            </div>
          ))}
        <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.items,
});

const mapDispatchToProps = {
  removeFromCart,
  updateQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
