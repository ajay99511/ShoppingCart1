import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { Product } from "../../app/models/Product"
import { brown, red } from "@mui/material/colors"
import { Link } from "react-router-dom"

interface Props{
    product:Product
}
export default function ProductCard({product}:Props){
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
          ${(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size="small">Add To Cart</Button>
        <Button component={Link} to={`/catalog/${product.id}`} variant="contained" size="small">View</Button>
      </CardActions>
    </Card>
    )
}
  