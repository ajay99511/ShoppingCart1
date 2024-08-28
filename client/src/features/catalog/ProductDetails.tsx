import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layouts/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { UseAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import {  AddBasketItemAsync, removeBasketItemAsync } from "../basket/BasketSlice";
import { fetchProductAsync, productSelectors } from "./CatalogSlice";


export default function ProductDetails(){
    const {basket,status} = useAppSelector(state=>state.basket);
    const dispatch = UseAppDispatch();
    const {id} = useParams<{id:string}>();
    const product =id? useAppSelector(state=>productSelectors.selectById(state,parseInt(id))): null;
    const {status: productStatus} = useAppSelector(state=>state.catalog);
    // const {basket,setBasket,removeItem} = useStoreContext();
    // const [product,setProduct] = useState<Product|null>(null);
    // const [loading,setLoading] = useState(true);
    // const [submitting,setSubmit] = useState(false);
    const [quantity,setQuantity] = useState(0);
    const item = basket?.items.find(x=>x.productId==product?.id);

    // useEffect(
    //     ()=>{
    //         if(item)
    //         {
    //             setQuantity(item.quantity);
    //         }
    //     id && agent.catalog.details(parseInt(id))
    //     .then(response=>setProduct(response))
    //     .catch(error=>console.log(error))
    //     .finally(()=>setLoading(false));
    //     },[id,item]);

    useEffect(
            ()=>
            {
                if(item)
                {
                    setQuantity(item.quantity);
                }
                if(!product) dispatch(fetchProductAsync(parseInt(id!)));
            
            },[id,item,dispatch,product]);

    // if(loading) return(<LoadingComponent message="Loading Product..."/>)
    if(productStatus.includes('pending')) return(<LoadingComponent message="Loading Product..."/>)
    if(!product) return(<NotFound/>)

    function handleEventChange(event:ChangeEvent<HTMLInputElement>)
    {
        if(parseInt(event.currentTarget.value)>=0)
        {
            setQuantity(parseInt(event.currentTarget.value));
        }
    }

    function UpdateQuantity()
    {
        // setSubmit(true);
        if(!item || quantity>item.quantity)
        {
            const updatedQuantity = item ? quantity-item.quantity : quantity;
            // agent.Basket.addItem(product?.id!,updatedQuantity)
            //     .then(basket=>dispatch(setBasket(basket)))
            //     .catch(error=>console.log(error))
            //     .finally(()=>setSubmit(false))
            dispatch(AddBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
        }
        else{
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId:product?.id!,quantity:updatedQuantity,name:'update'}))
        }
    }

    return(
        <Grid container spacing={6}>
            <Grid item xs={6} >
                <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}></img>
                <Box display='flex' alignContent='center'>
                <Button variant='contained' size="small" sx={{xs:3}} style={{width:'100%'}}>Add To Cart</Button>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb:2}} />
                <Typography variant="h4" color='secondary'>${(product.price/100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity In Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField 
                    onChange={handleEventChange}
                    variant="outlined"
                    id="outlined-number"
                    label="Item-Quantity"
                    type="number"
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                    }}
                    value={quantity}
                    />
                </Grid>
                <Grid item xs={6}>
                    <LoadingButton
                    disabled = {item?.quantity === 0 || !item && quantity === 0 }
                    loading = {status.includes('Pending')}
                    onClick={UpdateQuantity}
                    variant="contained"
                    color="primary"
                    sx={{height:'55px'}}
                    size="medium"
                    fullWidth
                    >
                        {item ? 'Update Quantity' : 'Add to Cart'}
                    </LoadingButton>
                </Grid>
                </Grid>
            </Grid>
        </Grid>
        
    )
}