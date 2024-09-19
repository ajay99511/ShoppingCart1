import { Box, Button, Typography } from "@mui/material";
import { BasketItem } from "../../app/models/Basket";
import { Order } from "../../app/models/Order";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

interface props{
  order:Order
  setselectedOrder:(id:number)=>void
  status:string
}
export default function OrderDetail({order,setselectedOrder,status}:props)
{  
  const subtotal = order.orderItems.reduce((sum,item)=>sum+(item.quantity*item.price),0) ?? 0;
    return(<>
    <Box display="flex" justifyContent="space-between">
      <Typography sx={{p:3}} gutterBottom variant="h5">Order# {order.id}-{status}</Typography>
      <Button sx={{m:2}} size="large" variant="contained"  onClick={()=>setselectedOrder(0)}>BackTo Orders</Button>
    </Box>
       <BasketTable items={order.orderItems as BasketItem[]}/>
       <BasketSummary subtotal={subtotal}/>
    </>
    )
}