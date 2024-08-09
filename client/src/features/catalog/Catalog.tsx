import { Button } from "@mui/material"
import { Product } from "../../app/models/Product"
import { useState, useEffect } from "react";
import ProductList from "./ProductList";

export default function Catalog(){
    const [products,setProducts] = useState<Product[]>([]);

  useEffect(()=>
  {
    fetch('http://localhost:5000/api/Products')
    .then(response=>response.json())
    .then(data=>setProducts(data))
  },[])
  
  function addProduct()
  {
    setProducts(prevState => [...prevState,{
      id:prevState.length+1,
      name:'product'+(prevState.length+1),
      price:(prevState.length)*100+100,
      brand:'Some Brand',
      description:'Description of something',
      pictureUrl:'http://picsum.photos/200',
    }]);
  }
    return (
        <>
      <ProductList products={products} />
      <Button variant='outlined' onClick={addProduct}>Add Product</Button>
        </>
    )
}