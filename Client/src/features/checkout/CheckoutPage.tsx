import { Box, Button, Grid, Paper, Step, StepLabel, Stepper } from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

const steps = ["Shipping Information", "Payment", "Order Summary"]
function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />
        case 1:
            return <PaymentForm />
        case 2:
            return <Review />
        default:
            throw new Error("An unknow step.")
    }
}

export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm();

    function handleNext(data: FieldValues) {
        console.log(data);
        setActiveStep(activeStep + 1);
    }

    function handlePrevious() {
        setActiveStep(activeStep - 1);
    }

    return (
        <FormProvider {...methods}>
            <Paper>
                <Grid container spacing={4}>
                    <Grid size={4} sx={{
                        borderRight: "1px solid",
                        borderColor: "divider",
                        p: 3
                    }}>
                        <Info />
                    </Grid>
                    <Grid size={8} sx={{ p: 3 }}>
                        <Box>
                            <Stepper activeStep={activeStep} sx={{ height: 40, mb: 4 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Box>
                            {activeStep === steps.length ? (
                                <h2>Order completed.</h2>
                            ) : (
                                <form onSubmit={methods.handleSubmit(handleNext)}>
                                    {getStepContent(activeStep)}
                                    <Box>
                                        <Box sx={
                                            [
                                                {
                                                    display: "flex",
                                                },
                                                activeStep !== 0
                                                    ? { justifyContent: "space-between" }
                                                    : { justifyContent: "flex-end" }
                                            ]
                                        }>
                                            {
                                                activeStep !== 0 &&
                                                <Button startIcon={<ChevronLeftRounded />} variant="contained"
                                                    onClick={handlePrevious}>Back</Button>
                                            }

                                            <Button
                                                type="submit"
                                                startIcon={<ChevronRightRounded />}
                                                variant="contained">Next</Button>
                                        </Box>
                                    </Box>
                                </form>
                            )}

                        </Box>
                    </Grid>
                </Grid>
            </Paper >
        </FormProvider>
    )
}