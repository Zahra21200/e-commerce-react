import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="text-center mb-4">Login</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string()
              .required('Password is required')
              .min(6, 'Password must be at least 6 characters'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // Perform login logic here
            console.log(values);
            // Assuming login is successful, store user data in local storage
            localStorage.setItem('userData', JSON.stringify(values));
            alert('Login successful you can add products to your cart now.');
           
          }}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter your username"
              />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#c6aeb9',
                color: 'white',
                marginTop: '10px',
                marginLeft: '60px',
                borderColor: '#c6aeb9',
              }}
              className="btn btn-block"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
