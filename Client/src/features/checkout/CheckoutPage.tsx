import { Box, Button, Grid, Paper, Step, StepLabel, Stepper } from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";

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

    function handleNext() {
        setActiveStep(activeStep + 1);
    }

    function handlePrevious() {
        setActiveStep(activeStep - 1);
    }

    return (
        <Paper>
            <Grid container sx={{ p: 4 }} spacing={4}>
                <Grid size={4}>
                    <Info />
                </Grid>
                <Grid size={8}>
                    <Box>
                        <Stepper activeStep={activeStep} sx={{ height: 40 }}>
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
                            <>
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

                                        <Button startIcon={<ChevronRightRounded />} variant="contained"
                                            onClick={handleNext}>Next</Button>
                                    </Box>
                                </Box>
                            </>
                        )}

                    </Box>
                </Grid>
            </Grid>
        </Paper >
    )
}