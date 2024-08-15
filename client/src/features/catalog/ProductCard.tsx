import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { Product } from "../../app/models/Product"
import { brown, red } from "@mui/material/colors"
import { Link } from "react-router-dom"
import { useState } from "react"
import agent from "../../app/api/agent"
import { LoadingButton } from "@material-ui/lab"
import { useStoreContext } from "../../app/context/StoreContext"
import { currencyFormat } from "../../app/util/util"

interface Props{
    product:Product
}
export default function ProductCard({product}:Props){
  const [loading,setLoading] = useState(false);
  const {setBasket} = useStoreContext();
  function handleAddItem(productId:number)
  {
    setLoading(true);
    agent.Basket.addItem(productId)
    .then(basket=>setBasket(basket))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false));
  }
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
        <LoadingButton loading={loading} 
        onClick={()=>handleAddItem(product.id)} 
        size="small"
        >Add To Cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
    )
}
  