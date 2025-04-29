import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";
import { useState } from "react";
import requests from "../../api/requests";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

interface Props {
    product: IProduct
}

export default function Product({ product }: Props) {

    const [loading, setLoading] = useState(false);
    const { setCart } = useCartContext()

    function handleAddItem(productId: number) {
        setLoading(true)

        requests.Cart.addItem(productId)
            .then(cart => {
                            setCart(cart);
                            toast.success("Added to your cart.");
                        })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }
    return (
        <Card>
            <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={`http://localhost:5114/images/${product.imageUrl}`} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="text.Secondary">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="secondary">
                    {(product.price).toFixed(2)} ₺
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    loading={loading}
                    loadingPosition="start"
                    onClick={() => handleAddItem(product.id)}
                    variant="outlined"
                    startIcon={<AddShoppingCart />}
                    color="success"
                    size="small">ADD TO CART</Button>
                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon />} color="primary">View</Button>
            </CardActions>
        </Card>
    );
}