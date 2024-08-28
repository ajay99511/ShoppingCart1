import { Grid} from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/ConfigureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props{
    products : Product[]
}

export default function ProductList({products}: Props) {
  const {productLoaded}= useAppSelector(state=>state.catalog)
    return (
        <Grid container spacing={4}>
        {products.map(product=>(
          <Grid item xs ={4} key={product.id}>
            {!productLoaded ?
            (<ProductCardSkeleton/>)
          :
          (<ProductCard  product={product}/>)
          }
          </Grid>
        ))}
      </Grid>
    )
}