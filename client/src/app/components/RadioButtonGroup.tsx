import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface Props {
    options:any[];
    onchange : (event:any)=>void;
    selectedValue :string
}
export default function RadioButtonGroup({options,onchange,selectedValue}:Props)
{
    return(
        <FormControl>
            <RadioGroup
            onChange={onchange}
            value={selectedValue}
            >
            {options.map(({value,label})=>(
               <FormControlLabel 
               value={value} 
               control={<Radio />} 
               label={label} 
               key={label}
               />
            ))}
            </RadioGroup>
            </FormControl>
    )
}