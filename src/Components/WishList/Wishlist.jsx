import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../../Store/action';

export default function Wishlist() {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  return (
    <div>
      <h2>My Wishlist</h2>
      {favorites.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="row">
          {favorites.map((favorite, index) => (
            <div key={index} className="col-md-3 mb-3">
              <div className="product p-3 rounded shadow">
                <img src={favorite.api_featured_image} alt={favorite.name} style={{ maxWidth: '100%', height: 'auto' }} />
                <h6>{favorite.name}</h6>
                <p>{favorite.price}</p>
                <button onClick={() => handleRemoveFromFavorites(favorite.id)}>Remove from Wishlist</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
