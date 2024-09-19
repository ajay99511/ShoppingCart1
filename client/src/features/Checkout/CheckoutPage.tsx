import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import Review from "./Review";
import PaymentForm from "./PaymentForm";
import { FieldValue, FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { ValidationSchema } from "./checkoutValidation";
import agent from "../../app/api/agent";
import { UseAppDispatch } from "../../app/store/ConfigureStore";
import { clearBasket } from "../basket/BasketSlice";
import { LoadingButton } from "@mui/lab";
import error from "../TestErrors/error";

const steps = ['Shipping address', 'Review your order', 'Payment details'];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm/>;
        case 1:
            return <Review/>;
        case 2:
            return <PaymentForm/>;
        default:
            throw new Error('Unknown step');
    }
}

export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [loading,setLoading] = useState(false);
    const dispatch = UseAppDispatch();
    const currentValidationSchenma = ValidationSchema[activeStep];
    const methods = useForm(
        {
            mode:"onTouched",
            resolver:yupResolver(currentValidationSchenma)
        }
    );
    useEffect(
        ()=>{
            agent.Account.fetchAddress()
            .then(response=>{
                if(response)
                {
                    methods.reset({...methods.getValues(),...response,saveAddress: false})
                }
            })
        },[methods]
    )

    const [orderNumber,SetOrderNumber] = useState(0);
    const handleNext = async(data: FieldValues) => {
        if (!data) {
            console.error('Form data is undefined or null.');
            return;
        }    
        if(activeStep === steps.length-1)
        {
            const {nameOnCard,saveAddress,...shippingAddress} = data;
            setLoading(true);
            try{
                const orderNum = await agent.Order.create({saveAddress, shippingAddress});
                SetOrderNumber(orderNum);
                setActiveStep(activeStep+1);
                dispatch(clearBasket());
            }
            catch(error)
            {
                console.log(error);
            }
            finally{
                setLoading(false);
            }
            // console.log(data);
        }
        else{
            setActiveStep(activeStep + 1);
        }
    };

    // const handleNext = (data: FieldValues) => {
    //     if(activeStep == 0)
    //     {
    //         console.log(data)
    //     }
    //     setActiveStep(activeStep + 1);
    // };


    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <FormProvider {...methods}>
        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #{orderNumber}. We have emailed your order
                            confirmation, and will send you an update when your order has
                            shipped.
                        </Typography>
                    </>
                ) : (
                    // <form onClick={methods.handleSubmit(handleNext)}>
                    <form>
                        {getStepContent(activeStep)}
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                    Back
                                </Button>
                            )}
                            <LoadingButton
                                loading = {loading}
                                disabled = {!methods.formState.isValid}
                                variant="contained"
                                onClick={methods.handleSubmit(handleNext)}
                                sx={{mt: 3, ml: 1}}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </LoadingButton>
                        </Box>
                    </form>
                )}
                </>
        </Paper>
        </FormProvider>
    );
}
