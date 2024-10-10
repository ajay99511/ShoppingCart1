import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"

interface Props{
    items: string[],
    checked? : string[],
    onChange : (items:string[])=>void
}
export default function CheckBoxGroup({items,checked,onChange}:Props)
{
    const [checkedItem,setCheckedItem] = useState(checked || []);
    function HandleCheckItem(value:string)
    {
        const checkIndex = checkedItem.findIndex(x=>x===value);
        let newCheck :string[] = []
        if(checkIndex === -1) newCheck = [...checkedItem,value]
        else newCheck = checkedItem.filter(x=>x!==value)
        setCheckedItem(newCheck);
        onChange(newCheck)
    }
    return(
        <FormGroup >
            {items.map(
              (item)=>(
                <FormControlLabel 
                control={<Checkbox 
                checked={checkedItem.indexOf(item)!==-1}
                onClick={()=>HandleCheckItem(item)}
                />} 
                label={item} 
                key={item}/>
              )
            )}
          </FormGroup>
    )
}