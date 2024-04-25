import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Store/action';
import { addToFavorites, removeFromFavorites } from '../../Store/action';
import Login from './Login';
import { Redirect } from 'react-router-dom';

export default function Products() {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const isAuthenticated = localStorage.getItem('authToken'); // Assuming 'authToken' is stored upon login

  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product));
  // };
  // Assume this is where you handle the addition of items to the cart
const handleAddToCart = (product) => {
  const userDataString = localStorage.getItem('userData');

  const userData = JSON.parse(userDataString);

  if (userData && userData.username && userData.password) {
    dispatch(addToCart(product));
  } else {
    alert('Please log in to add items to the cart.');
  }
};


  const handleToggleFavorite = (product) => {
    const isFavorite = favorites.some(item => item.id === product.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [noMatchesFound, setNoMatchesFound] = useState(false);

  async function getProducts() {
    try {
      const { data: allProducts } = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
      console.log(allProducts);
      const offset = (currentPage - 1) * itemsPerPage;
      const productsOnPage = allProducts.slice(offset, offset + itemsPerPage);
      setProducts(productsOnPage);
      const total = Math.ceil(allProducts.length / itemsPerPage);
      setTotalPages(total);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearch = async () => {
    try {
      const { data: allProducts } = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
      const searchedProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(searchedProducts);
      setNoMatchesFound(searchedProducts.length === 0);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="search-container mb-3">
        <input
          type="text"
          placeholder="Search products by name"
          value={searchQuery}
          onChange={handleChange}
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-primary ml-2">
          Search
        </button>
      </div>

      {noMatchesFound && searchQuery !== '' && (
        <div className="alert alert-warning" role="alert">
          No matches found.
        </div>
      )}

      <div className='row'>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className='col-md-3 mb-3 '>
              <div className="product rounded shadow position-relative p-5" style={{ 
                boxShadow: 'rgba(145,158,171, .2) 0px 2px 4px -1px, rgba(145,158,171, .14) 0px 4px 5px 0px, rgba(145,158,171,.12) 0px 1px 10px 0px',
                border: '1px solid #0aada',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                }}>
                <button 
                  className='btn btn-light position-absolute top-0 end-0 m-2'
                  onClick={() => handleToggleFavorite(product)}>
                  {favorites && favorites.some(item => item.id === product.id) ? (
                    <i className="fa-solid fa-heart text-danger"></i>
                  ) : (
                    <i className="fa-solid fa-heart text-black"></i>
                  )}
                </button>
                <Link to={`/product/${product.id}`} style={{ color: '#885c67', textDecoration: 'none' }}>
                  <img src={product.api_featured_image} className='w-100' alt={product.name} />
                  <h6>{product.name}</h6>
                  <div className='d-flex justify-content-between'>
                    <p>{product.price} $</p>
                    <p>{product.rating}<i className='fa-solid fa-star rating-color'></i></p>
                  </div>
                </Link>
                <button
                  className='btn btn-info w-100'
                  style={{
                    transition: 'transform 1s, opacity 1s',
                    transform: 'translateY(100%)',
                    backgroundColor: '#c6aeb9',
                    borderColor:"#c6aeb9",
                    color: 'white',
                  }}
                  onClick={() => handleAddToCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='vh-100 d-flex justify-content-center align-items-center'>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        )}
      </div>

      <div className="pagination mt-3">
        <div className="pagination mt-3">
          <button onClick={prevPage} style={{ backgroundColor: "#cdb8cc" }} className="btn  mr-2" disabled={currentPage === 1}>Previous</button>
          <button onClick={nextPage} style={{ backgroundColor: "#cdb8cc" }} className="btn " disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}
