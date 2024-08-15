import { Box, Button, Grid, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Grade, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@material-ui/lab";
import BasketSummary from "./BasketSummary";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";


export default function BasketPage()
{
    const {basket,setBasket,removeItem} = useStoreContext();
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      const [status,setStatus] = useState(
        {
          loading:false,
          name:''
        }
      )

      function handleAddItem(productId:number,name:string)
      {
        setStatus({loading:true,name});
        agent.Basket.addItem(productId)
        .then(basket=>setBasket(basket))
        .catch(error=>console.log(error))
        .finally(()=>setStatus({loading:false,name:''}))
      }
      function handleRemoveItem(productId:number,quantity=1,name:string)
      {
        setStatus({loading:true,name});
        agent.Basket.removeItem(productId,quantity)
        .then(()=>removeItem(productId,quantity))
        .catch(error=>console.log(error))
        .finally(()=>setStatus({loading:false,name:''}))
      }
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    if(!basket) return <Typography variant="h4">Your Cart Is Empty</Typography>
return(
  <>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Product Name</StyledTableCell>
          <StyledTableCell align="right">Price</StyledTableCell>
          <StyledTableCell align="right">Quantity</StyledTableCell>
          <StyledTableCell align="right">SubTotal</StyledTableCell>
          <StyledTableCell align="right">Delete</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {basket.items.map((item) => (
          <StyledTableRow key={item.productId}>
            <StyledTableCell component="th" scope="row">
              <Box display="flex" alignContent="center">
              <img src={item.pictureUrl} alt={item.brand} style={{height:50,marginRight:20}}/>
              <span>{item.name}</span>
              </Box>
            </StyledTableCell>
            <StyledTableCell align="right">${(item.price/100)}</StyledTableCell>
            <StyledTableCell align="right">
              <LoadingButton loading={status.loading && status.name === 'rem'+item.productId} 
              onClick={()=>handleRemoveItem(item.productId,1,'rem'+item.productId)} color="error">
                <Remove/>
              </LoadingButton>
              {item.quantity}
              <LoadingButton loading={status.loading && status.name === 'add'+item.productId} 
              onClick={()=>handleAddItem(item.productId,'add'+item.productId)} color="success">
                <Add/>
              </LoadingButton>
            </StyledTableCell>
            <StyledTableCell align="right">${(item.price/100)*item.quantity}</StyledTableCell>
            <StyledTableCell align="right">
            <LoadingButton 
            loading={status.loading && status.name === 'del'+item.productId} 
            onClick={()=>handleRemoveItem(item.productId,item.quantity,'del'+item.productId)} 
            aria-label="delete" sx={{color:"red"}}>
                <Delete />
            </LoadingButton>
            </StyledTableCell>
          </StyledTableRow>
        ))}
          
      </TableBody>
    </Table>
  </TableContainer>
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