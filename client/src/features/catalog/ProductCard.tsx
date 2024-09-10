import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { Product } from "../../app/models/Product"
import { brown } from "@mui/material/colors"
import { Link } from "react-router-dom"
import { LoadingButton } from "@mui/lab"
import { currencyFormat } from "../../app/util/util"
import { UseAppDispatch, useAppSelector } from "../../app/store/ConfigureStore"
import { AddBasketItemAsync } from "../basket/BasketSlice"

interface Props{
    product:Product
}
export default function ProductCard({product}:Props){
  const {status} = useAppSelector(state=>state.basket);
  
  const dispatch = UseAppDispatch();
 
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
        avatar={
          <Avatar sx={{bgcolor: 'primary.light'}}>{product.brand.charAt(0).toUpperCase()}</Avatar>
        } title={product.brand} titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.light' }
        }}
        />
      <CardMedia
        sx={{height:140, backgroundSize:'contain',backgroundColor:'powderblue'}} 
        image={product.pictureUrl}
        title = {product.name}
      />
      <CardContent>
        <Typography variant= "h5" fontSize={16} color={brown}>
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h5" color='blue'>
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={status.includes('PendingAddItem'+product.id+'add')} 
        onClick={()=>dispatch(AddBasketItemAsync({productId:product.id}))} 
        size="small"
        >Add To Cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
    )
}
/*
  const {setBasket} = useStoreContext();
  function handleAddItem(productId:number)
  {
    setLoading(true);
    agent.Basket.addItem(product.id)
    .then(basket=>dispatch(setBasket(basket)))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false));
  }
  const [loading,setLoading] = useState(false);
  */