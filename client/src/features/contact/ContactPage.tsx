import { Button, Typography } from "@mui/material";
import { UseAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { decrement, increment } from "./CounterSlice";


export default function ContactPage(){
    const dispatch = UseAppDispatch();
    const {data,title} = useAppSelector(state=>state.counter);
    return(
        <>
        <Typography variant="h3">
            Contact Pages
        </Typography>
        <Typography variant="h3">
            The data is {data}
        </Typography>
        <Typography variant="h3">
           {title}
        </Typography>
        <Button onClick={()=>dispatch(increment(1))} variant="outlined" color="secondary">
            Increment
        </Button>
        <Button onClick={()=>dispatch(decrement(1))} variant="outlined" color="primary">
            Decrement
        </Button>
        </>
    )
}