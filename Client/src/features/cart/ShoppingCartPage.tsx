import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { AddCircleOutlineOutlined, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import requests from "../../api/requests";
import { toast } from "react-toastify";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setCart } from "./cartSlice";

export default function ShoppingCartPage() {

    const {cart}=useAppSelector(state=>state.cart)
    const dispatch=useAppDispatch()
    const [status, setStatus] = useState({ loading: false, id: "" });

    function handleAddItem(productId: number, id: string) {
        setStatus({ loading: true, id: id })

        requests.Cart.addItem(productId)
            .then(cart => dispatch(setCart(cart)))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, id: "" }))
    }

    function handleDeleteItem(productId: number, id: string, quantity = 1) {
        setStatus({ loading: true, id: id })

        requests.Cart.deleteItem(productId, quantity)
            .then((cart) => dispatch(setCart(cart)))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, id: "" }))
    }

    if (cart?.cartItems.length === 0) return <Alert severity="warning">There are no items in your cart.</Alert>
    return (
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
                                    loading={status.loading && status.id === "add" + item.productId}
                                    onClick={() => handleAddItem(item.productId, "add" + item.productId)}>
                                    <AddCircleOutlineOutlined />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton
                                    loading={status.loading && status.id === "del" + item.productId}
                                    onClick={() => handleDeleteItem(item.productId, "del" + item.productId)}>
                                    <RemoveCircleOutline />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">{currencyTRY.format(item.price * item.quantity)}</TableCell>
                            <TableCell>
                                <LoadingButton color="error"
                                    loading={status.loading && status.id === "del_all" + item.productId}
                                    onClick={() => {
                                        handleDeleteItem(item.productId, "del_all" + item.productId, item.quantity);
                                        toast.error("The product has been deleted from your cart.");
                                    }}>
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <CartSummary />
                </TableBody>
            </Table>
        </TableContainer>
    )
}