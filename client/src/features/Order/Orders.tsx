import { useEffect, useState } from "react"
import { Order } from "../../app/models/Order"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layouts/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";
import OrderDetail from "./OrderDetail";

export default function Orders()
{
    const [orders,setOrders] = useState<Order[] | null>(null);
    const [loading,SetLoading] = useState(true);
    const [selectedOrder,setselectedOrder] = useState(0);
    function getStatus(statusId : number)
  {
    if(statusId === 0)
    {
        return "Pending";
    }
    else if(statusId === 1)
    {
        return "PaymentRecieved";
    }
    else{
        return "Payment Failed";
    }
  }
    useEffect(
        ()=>{
            agent.Order.list()
            .then(response =>setOrders(response))
            .catch(error=>console.log(error))
            .finally(()=>SetLoading(false))
        }
    )

    if(loading) return(<LoadingComponent/>)
    if(selectedOrder>0)
    {
      return (
        <OrderDetail 
        order={orders?.find(o=>o.id===selectedOrder)!}
        setselectedOrder={setselectedOrder} 
        status={getStatus(orders?.find(o=>o.id===selectedOrder)?.orderStatus!)}/>
      )
    }
    return(
        <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>OrderNumber</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{currencyFormat(order.total)}</TableCell>
              <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
              <TableCell align="right">{getStatus(order.orderStatus)}</TableCell>
              <TableCell align="right">
                <Button onClick={()=>setselectedOrder(order.id)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
}