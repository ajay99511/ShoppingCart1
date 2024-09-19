import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, Box, styled, TableCell, tableCellClasses } from "@mui/material";
import { removeBasketItemAsync, AddBasketItemAsync } from "./BasketSlice";
import { BasketItem } from "../../app/models/Basket";
import { UseAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";

interface props
{
    items : BasketItem[],
    isBasket? : boolean
}


export default function BasketTable({items,isBasket}:props)
{
    const {status} = useAppSelector(state=>state.basket);
    const dispatch = UseAppDispatch();

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      return(
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Product Name</StyledTableCell>
          <StyledTableCell align="right">Price</StyledTableCell>
          <StyledTableCell align="right">Quantity</StyledTableCell>
          <StyledTableCell align="right">SubTotal</StyledTableCell>
          {<StyledTableCell align="right"></StyledTableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <StyledTableRow key={item.productId}>
            <StyledTableCell component="th" scope="row">
              <Box display="flex" alignContent="center">
              <img src={item.pictureUrl} alt={item.brand} style={{height:50,marginRight:20}}/>
              <span>{item.name}</span>
              </Box>
            </StyledTableCell>
            <StyledTableCell align="right">${(item.price/100)}</StyledTableCell>
            <StyledTableCell align="right">
              {isBasket && <LoadingButton loading={status.includes('PendingRemoveItem'+item.productId+'rem')} 
              onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId,quantity:1,name:'rem'}))} color="error">
                <Remove/>
              </LoadingButton>
              }
              {item.quantity}
              {isBasket && <LoadingButton loading={status.includes('PendingAddItem'+item.productId)} 
              onClick={()=>dispatch(AddBasketItemAsync(({productId:item.productId})))} color="success">
                <Add/>
              </LoadingButton>
              }
            </StyledTableCell>
            <StyledTableCell align="right">${(item.price/100)*item.quantity}</StyledTableCell>
            <StyledTableCell align="right">
            {isBasket && <LoadingButton 
            loading={status.includes('PendingRemoveItem'+item.productId+'del')} 
            onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId,quantity:item.quantity,name:'del'}))} 
            aria-label="delete" sx={{color:"red"}}>
                <Delete />
            </LoadingButton>
            } 
            </StyledTableCell>
          </StyledTableRow>
        ))}
          
      </TableBody>
    </Table>
  </TableContainer>
      )
}