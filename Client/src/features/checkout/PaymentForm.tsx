import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {

    const { register, formState: { errors } } = useFormContext();
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("cardname", { required: "Card name is required" })}
                    label="Enter card name"
                    fullWidth autoFocus
                    sx={{ mb: 2 }} size="small"
                    error={!!errors.cardname}>
                </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("cardnumber", { required: "Card number is required" })}
                    label="Enter card number"
                    fullWidth
                    sx={{ mb: 2 }} size="small"
                    error={!!errors.cardnumber}>
                </TextField>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
                <TextField
                    {...register("cardexpiremonth", { required: "Expiry month is required" })}
                    label="Enter expiry month"
                    fullWidth
                    sx={{ mb: 2 }} size="small"
                    error={!!errors.cardexpiremonth}>
                </TextField>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
                <TextField
                    {...register("cardexpireyear", { required: "Expiry year is required" })}
                    label="Enter expiry year"
                    fullWidth
                    sx={{ mb: 2 }} size="small"
                    error={!!errors.cardexpireyear}>
                </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    {...register("cardcvc", { required: "CVV is required" })}
                    label="Enter CVC"
                    fullWidth
                    sx={{ mb: 2 }} size="small"
                    error={!!errors.cardcvc}>
                </TextField>
            </Grid>
        </Grid>
    )
}  