import { debounce, TextField } from "@mui/material";
import { UseAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { useState } from "react";
import { setProductParams } from "./CatalogSlice";

export default function ProductSearch()
{
    const {productParams} = useAppSelector(state=>state.catalog);
    const dispatch = UseAppDispatch();
    const [searchTerm,setSearchTerm] = useState(productParams.searchTerm);
    const debouncedSearchTerm = debounce((event:any)=>{
        dispatch(setProductParams({searchTerm:event.target.value}))
    },1000)
    return(
        <>
        <TextField
              label="Search Products"
              variant="outlined"
              fullWidth
              value={searchTerm || ""}
              onChange={(event:any)=>{
                // console.log(event)
                // console.log(event.target)
                // console.log(event.target.value)
                setSearchTerm(event.target.value);
                debouncedSearchTerm(event);
            }
              }

              />
        </>
    )
}