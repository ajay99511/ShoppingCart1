import { Button, Grid, Typography } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/ConfigureStore";
import BasketTable from "./BasketTable";


export default function BasketPage()
{
    // const {basket,setBasket,removeItem} = useStoreContext();
    const {basket} = useAppSelector(state=>state.basket);

      // const [status,setStatus] = useState(
      //   {
      //     loading:false,
      //     name:''
      //   }
      // )

      // function handleAddItem(productId:number,name:string)
      // {
      //   setStatus({loading:true,name});
      //   agent.Basket.addItem(productId)
      //   .then(basket=>dispatch(setBasket(basket)))
      //   .catch(error=>console.log(error))
      //   .finally(()=>setStatus({loading:false,name:''}))
      // }
      // function handleRemoveItem(productId:number,quantity=1,name:string)
      // {
      //   setStatus({loading:true,name});
      //   agent.Basket.removeItem(productId,quantity)
      //   .then(()=>dispatch(removeBasketItemAsync({productId,quantity})))
      //   .catch(error=>console.log(error))
      //   .finally(()=>setStatus({loading:false,name:''}))
      // }
      
      

    if(!basket) return <Typography variant="h4">Your Cart Is Empty</Typography>
return(
  <>
  <BasketTable items={basket.items} isBasket={true}/>
  <Grid container justifyContent="flex-end">
    <Grid item xs={6}>
      <Grid item xs={12}>
      <BasketSummary />
      <Button
      variant="contained"
      component = {Link}
      to = '/checkout'
      fullWidth
      size="medium">
        Checkout
      </Button>
      </Grid>
    </Grid>
  </Grid>
   </>
)
}
//&& status.name === 'rem'+item.productId
// status.includes('pendingRemoveItem'+item.productId)