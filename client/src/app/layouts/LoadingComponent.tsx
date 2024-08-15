
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

export interface Props{
message?: string,
}
export default function LoadingComponent({message='loading...'}:Props){
    return(
        <Backdrop open={true} invisible={true}>
            <Box display='flex' justifyContent='center' alignContent='center'>
                <CircularProgress size={100} color="secondary" />
                    <Typography variant="h4" sx={{justifyContent:'center',position:'fixed', top:'60%'}}>
                    {message}
                    </Typography>
            </Box>
        </Backdrop>
    )
}