import { Typography, Grid } from "@mui/material";
import AppTextField from "../../app/components/AppTextField";
import { useFormContext } from "react-hook-form";
import AppCheckBox from "../../app/components/AppCheckBox";

export default function AddressForm() {
    const {control,formState} = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          /> */}
          <AppTextField control={control} name="fullName" label="Full Name"/>
        </Grid>
        <Grid item xs={12}>
        <AppTextField control={control} name="address1" label="Address 1"/>
        </Grid>
        <Grid item xs={12}>
        <AppTextField control={control} name="address2" label="Address 2"/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextField control={control} name="city" label="City"/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextField control={control} name="state" label="State"/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextField control={control} name="zipCode" label="Zip Code"/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextField control={control} name="country" label="Country"/>
        </Grid>
        <Grid item xs={12}>
          <AppCheckBox 
          disabled={!formState.isDirty}
          control={control} 
          name="saveAddress" 
          label="Save Address as default address"/>
        </Grid>
      </Grid>
      {/* <Button type="submit">Submit Form</Button> */}
    </>
  );
}

