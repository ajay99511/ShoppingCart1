import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layouts/App";
import Home from "../../features/home/Home";
import Catalog from "../../features/catalog/Catalog";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import Error from "../../features/TestErrors/error";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { CheckoutPage } from "../../features/Checkout/CheckoutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
    {path:'/',
    element:<App />,
    children:[
        {element:<RequireAuth/>,children:[
            {path:'checkout',element:<CheckoutPage/>},
        ]},
        {path:'',element: <Home />},
        {path:'catalog',element: <Catalog />},
        {path:'catalog/:id',element: <ProductDetails />},
        {path:'contact',element: <ContactPage />},
        {path:'about',element: <AboutPage />},
        {path:'error',element:<Error/>},
        {path:'server-error',element:<ServerError/>},
        {path:'not-found',element: <NotFound/>},
        {path:'basket',element:<BasketPage/>},
        {path:'login',element:<Login/>},
        {path:'register',element:<Register/>},
        {path:'*',element:<Navigate replace to='/not-found'/>},
    ]
    }
])