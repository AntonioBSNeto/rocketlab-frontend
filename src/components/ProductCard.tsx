import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Product } from "../types/Product";
import Stars from "./Stars";
import priceFormat from "../util/priceFormat";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, isProductInCartSelector, removeProduct } from "../features/cartSlice";
import { RootState } from "../store";
import CheckedCartIcon from "../util/svg/CheckedCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isInCart = useSelector((state: RootState) => isProductInCartSelector(state, parseInt(`${product.id}`)))
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toggleCartItem = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (product) {
      if (isInCart) {
        dispatch(removeProduct(product?.id))
      } else {
        dispatch(addProduct({product, quantity: 1}))
      }
    }
  }

  return(
    <Card sx={{ borderRadius: '16px', '&:hover .icon-container': { opacity: 1 } }} className="flex flex-col">
      <CardActionArea className="!pt-2 !px-3 !pb-0 !flex  flex-col justify-end" onClick={() => navigate(`/produtos/${product.id}`) }>
        <Box className="flex justify-end gap-x-2 icon-container w-full"  sx={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }} >
          <FavoriteBorderIcon className="hover:text-[#F80032]" />

          <CardActions onClick={toggleCartItem} className="!p-0" >
            { isInCart ?
              <CheckedCartIcon /> :
              <AddShoppingCartIcon className="hover:text-[#F80032] fill-[red]"/>
            }
          </CardActions>
        </Box>
        <Box className="w-56 h-32 ">
          <CardMedia
            component="img"
            src={product.image}
            alt={product.title}
            className="w-full h-full !object-contain"
            sx={{ width: '100%', aspectRatio: '16/9' }}
            loading="lazy"
          />
        </Box>
        <CardContent className="!px-2 !py-0 mt-2">
          <Typography component="div" color="#42464D" className="!text-sm overflow-hidden text-ellipsis" sx={{ maxHeight: '3.75rem', minHeight: '3.75rem' }}>
            {product.title}
          </Typography>
          <Stars rate={product.rating.rate} amount={product.rating.count} />
          <Typography color="#42464D" className="!font-bold !mt-2">
            {priceFormat(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="w-full !px-3 !pt-0 !pb-3">
        <Button onClick={() => {
          dispatch(addProduct({product, quantity: 1}))
          navigate('/carrinho')
        }} variant="contained" sx={{ background: '#F80032', borderRadius: '4px' }} className="grow !text-lg hover:!bg-[#F20544] hover:brightness-90 !capitalize !mt-2">comprar</Button>
      </CardActions>
    </Card>
  )
}