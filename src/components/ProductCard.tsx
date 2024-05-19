import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Product } from "../types/Product";
import Stars from "./Stars";

interface ProductCardProps {
  product: Product;
}

const priceFormat = (value: number) => Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(value)


export default function ProductCard({ product }: ProductCardProps) {

  return(
    <Card sx={{ borderRadius: '16px', '&:hover .icon-container': { opacity: 1 } }} className="flex flex-col">
      <CardActionArea className="!pt-2 !px-3 !pb-0 !flex  flex-col justify-end">
        <Box className="flex justify-end gap-x-2 icon-container w-full"  sx={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }} >
          <AddShoppingCartIcon className="hover:text-[#F80032] fill-[red]"  />
          <FavoriteBorderIcon className="hover:text-[#F80032]" />
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
          <Stars rate={3.6} amount={120} />
          <Typography color="#42464D" className="!font-bold !mt-2">
            {priceFormat(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="w-full !px-3 !pt-0 !pb-3">
        <Button variant="contained" sx={{ background: '#F80032', borderRadius: '4px' }} className="grow !text-lg hover:!bg-[#F20544] hover:brightness-90 !capitalize !mt-2">comprar</Button>
      </CardActions>
    </Card>
  )
}