import { Button } from "@mui/material"
import { Product } from "../../app/models/Product"
import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layouts/LoadingComponent";

export default function Catalog(){
    const [products,setProducts] = useState<Product[]>([]);
    const [loading,setLoading] = useState(true);

  useEffect(()=>{
    agent.catalog.list()
    .then(products=> setProducts(products))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
  }, [])
  
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
  if(loading) return( <LoadingComponent message="Loading Products..."/>)
    return (
        <>
      <ProductList products={products} />
      <Button variant='outlined' onClick={addProduct}>Add Product</Button>
        </>
    )
}