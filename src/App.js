import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from "./Components/layout/Layout"
import Home from "./Components/Home/Home"
import Register from "./Components/Register/Register"
import Login from "./Components/Login/Login"
import Cart from "./Components/Cart/Cart"
import Singleproduct from "./Components/SingleProduct/Singleproduct"
import Wishlist from "./Components/WishList/Wishlist"
import Notfound from "./Components/NotFound/Notfound"

const Routers=createBrowserRouter([
  {path:'',element: <Layout/>,children:[
    {path:'home',element:<Home/>},
    {path:'register',element:<Register/>},
    {path:'login',element:<Login/>},
,    {path:'cart',element:<Cart/>},
,    {path:'product/:id',element:<Singleproduct/>},
,    {path:'wishlist',element:<Wishlist/>},
,    {path:'*',element:<Notfound/>}

  ]}
])
function App() {
  return (
    <>
   <RouterProvider router={Routers}></RouterProvider>
   </>
  );
}

export default App;
