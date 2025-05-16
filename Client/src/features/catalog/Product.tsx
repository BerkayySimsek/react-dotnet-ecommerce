import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart } from "../cart/cartSlice";

interface Props {
    product: IProduct
}

export default function Product({ product }: Props) {

    const { status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    return (
        <Card>
            <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={`http://localhost:5114/images/${product.imageUrl}`} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="text.Secondary">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="secondary">
                    {currencyTRY.format((product.price))}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    loading={status === "pendingAddItem"+product.id}
                    loadingPosition="start"
                    onClick={() => dispatch(addItemToCart({ productId: product.id }))}
                    variant="outlined"
                    startIcon={<AddShoppingCart />}
                    color="success"
                    size="small">ADD TO CART</Button>
                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon />} color="primary">View</Button>
            </CardActions>
        </Card>
    );
}