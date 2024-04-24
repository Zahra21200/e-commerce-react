import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ cartItemCount }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="#">
          <i className="fa-solid text-main fa-cart-shopping"></i>
          <span className='fw-bold'>Maybelline</span>
        </Link>
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
            <Link className="nav-link" to="home">Home</Link>
            <Link className="nav-link" to="product">Product</Link>
            <Link className="nav-link" to="category">Categories</Link>
            <Link className="nav-link" to="cart">
              <i className="fa-solid text-main fa-cart-shopping"></i> Cart 
              <span className="badge bg-secondary">{cartItemCount}</span>
            </Link>
          </div>
          <div className="navbar-nav ms-auto mt-2 mt-lg-0">
            <Link className="nav-link" to="login">Login</Link>
            <Link className="nav-link" to="register">Register</Link>
            <Link className="nav-link">Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  cartItemCount: state.items.length, // Assuming your cart state structure
});

export default connect(mapStateToProps)(Navbar);
