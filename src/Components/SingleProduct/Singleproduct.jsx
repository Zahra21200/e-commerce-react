import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Store/action';
export default function Singleproduct() {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product_details)); 
  };
  const [product_details,setDetails]=useState();
  let params=useParams()
  let product_id=params.id;
  async function getProduct() {
    try {
      let { data } = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products/${product_id}.json`);
      setDetails(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }
  
  
  useEffect(()=>{
    getProduct();
  },[])
  return (
    <div className='container my-5'>
      <div className="row">
        <div className='col-md-3'>
            <img src={product_details?.api_featured_image} className='w-100' alt={product_details?.name} />
        </div>
        <div className='col-md-9 f-flex-column justify-content-around'>
          <div>
            <h2>{product_details?.name}</h2>
            <p>{product_details?.description}</p>
          </div>
          <div>
            <p>{product_details?.brand}</p>
            <div className='d-flex justify-content-between '>
            <p><span className='text-main'>Prics : </span>{product_details?.price}$</p>
            <p><span className='text-main'>{product_details?.rating}</span><i className='fa-solid fa-star rating-color'></i></p>

            </div>
            <button 
                className='btn btn-info ' 
                style={{ 
                  transition: 'transform 1s, opacity 1s', 
                  transform: 'translateY(100%)',
                  backgroundColor: '#0aada',
                  color: 'white',
                  marginTop: 'auto',
                }}
                onClick={handleAddToCart}>Add To Cart</button>

          </div>
        </div>
      </div>
    </div>
  )
}
