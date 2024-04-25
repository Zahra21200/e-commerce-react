import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearCart } from '../../Store/action'; 
import "./Navbar.css";

const Navbar = ({ cartItemCount, clearCart }) => {
  const handleLogout = () => {
    localStorage.clear();
    clearCart();
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="#">
          <i className="fa-solid text-main fa-cart-shopping"></i>
          <span className='fw-bold'>Maybelline</span>
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <div className="navbar-nav me-auto mt-2 mt-lg-0">
            <NavLink className="nav-link" activeClassName="active" to="/home">Home</NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/wishlist">Wish List</NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/category">Categories</NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/cart">
              <i className="fa-solid text-main fa-cart-shopping"></i> Cart 
              <span className="badge ">{cartItemCount}</span>
            </NavLink>
          </div>
          <div className="navbar-nav ms-auto mt-2 mt-lg-0">
            <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
            <NavLink className="nav-link" activeClassName="active" onClick={handleLogout} to="/">Logout</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  cartItemCount: state.cart.items.length,
});

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
