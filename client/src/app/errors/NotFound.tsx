import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound()
{
    return(
        <>
        <Container component={Paper} sx={{height:400}}>
            <Typography variant="h3" gutterBottom>
                Oops - we could not find what you looking for
            </Typography>
            <Divider/>
            <Button fullWidth component={Link} to='/catalog'>Go Back to Shop</Button>
        </Container>
        </>
    )
}