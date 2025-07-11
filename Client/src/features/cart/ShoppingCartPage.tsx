import { Alert, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { AddCircleOutlineOutlined, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link } from "react-router";

export default function ShoppingCartPage() {

    const { cart, status } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()

    if (!cart || cart?.cartItems.length === 0) return <Alert severity="warning">There are no items in your cart.</Alert>
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart?.cartItems.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img src={`http://localhost:5114/images/${item.imageUrl}`} style={{ height: 60 }} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">{currencyTRY.format(item.price)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status === "pendingAddItem" + item.productId}
                                        onClick={() => dispatch(addItemToCart({ productId: item.productId }))}>
                                        <AddCircleOutlineOutlined />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        loading={status === "pendingDeleteItem" + item.productId + "single"}
                                        onClick={() => dispatch(deleteItemFromCart({ productId: item.productId, quantity: 1, key: "single" }))}>
                                        <RemoveCircleOutline />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{currencyTRY.format(item.price * item.quantity)}</TableCell>
                                <TableCell>
                                    <LoadingButton color="error"
                                        loading={status === "pendingDeleteItem" + item.productId + "all"}
                                        onClick={() => dispatch(deleteItemFromCart({ productId: item.productId, quantity: item.quantity, key: "all" }))}>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <CartSummary />
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button component={Link} to="/checkout" variant="contained" color="primary">Checkout</Button>
            </Box>
        </>
    )
}