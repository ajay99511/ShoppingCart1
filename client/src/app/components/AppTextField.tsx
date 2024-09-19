import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface props extends UseControllerProps
{
    label : string
}
export default function AppTextField(props:props)
{
    const {field,fieldState} = useController({...props,defaultValue:''});
    return(
        <TextField
        {...props}
        {...field}
        fullWidth
        variant="outlined"
        error = {!!fieldState.error}
        helperText = {fieldState.error?.message}
        />
    )
}