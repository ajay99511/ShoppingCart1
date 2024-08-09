import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "../../app/models/Product";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


export default function(){
    const {id} = useParams<{id:string}>();
    const [product,setProduct] = useState<Product | null>(null);
    const [loading,setLoading] = useState(false);
    useEffect(
        ()=>{
        axios.get(`http://localhost:5000/api/Products/${id}`)
        .then(response=>setProduct(response.data))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false));
        },[id]
    )
    if(loading) return(<h3>Loading...</h3>)
    
    if(!product) return(<h3>Product Not Found</h3>)

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
            </Grid>
        </Grid>
        
    )
}