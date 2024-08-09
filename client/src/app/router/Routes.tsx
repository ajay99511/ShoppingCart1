import { createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import Home from "../../features/home/Home";
import Catalog from "../../features/catalog/Catalog";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/catalog/ProductDetails";

export const router = createBrowserRouter([
    {path:'/',
    element:<App />,
    children:[
        {path:'',element: <Home />},
        {path:'catalog',element: <Catalog />},
        {path:'catalog/:id',element: <ProductDetails />},
        {path:'contact',element: <ContactPage />},
        {path:'about',element: <AboutPage />},
    ]
    }
])