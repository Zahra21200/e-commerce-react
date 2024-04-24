import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Adjust the number of items per page as needed
  const [totalPages, setTotalPages] = useState(0);

  async function getProducts() {
    try {
      const { data: allProducts } = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
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
  }, [currentPage]); // Fetch products when the page changes

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className='row'>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className='col-md-3 mb-3'>
              <div className="product p-5" style={{
                boxShadow: 'rgba(145,158,171, .2) 0px 2px 4px -1px, rgba(145,158,171, .14) 0px 4px 5px 0px, rgba(145,158,171,.12) 0px 1px 10px 0px',
                border: '1px solid #0aada',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}>
                <Link to={`/product/${product.id}`}>
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
                    backgroundColor: '#0aada',
                    color: 'white',
                  }}
                >
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
        <button onClick={prevPage} className="btn btn-primary mr-2" disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} className="btn btn-primary" disabled={currentPage === totalPages}>Next</button>
      </div>
      </div>
    </div>
  );
}
