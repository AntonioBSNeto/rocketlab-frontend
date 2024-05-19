import { Box, Button, Paper } from "@mui/material";
import { Product } from "../types/Product";
import { useDispatch } from "react-redux";
import { removeProduct, updateQuantity } from "../features/cartSlice";
import priceFormat from "../util/priceFormat";

interface ProductCartProps {
  product: Product;
  quantity: number;
}

export default function ProductCart({ product, quantity }: ProductCartProps) {
  const dispatch = useDispatch()

  return (
    <>
      <Paper className="!rounded-3xl grid py-5 pl-8 max-[1050px]:pl-4 max-[1050px]:!grid-cols-3" sx={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
        <Box className="items-center grid gap-x-4 max-[1050px]:!grid-cols-1 gap-y-1" sx={{ gridTemplateColumns: '80px 1fr 1fr' }}>
          <img src={product.image} alt={product.title} className="max-[1050px]:!max-w-[80px]" />
          <p className="text-[#42464D] font-bold text-sm max-[1050px]:text-xs">{product.title}</p>
        </Box>
        <div className="flex flex-col items-center justify-center">
          <Box className="flex border border-color-[#CCCCCC] rounded-xl gap-x-2 items-center">
            <Button className="!text-xl !text-[#F80032]  max-[1050px]:!min-w-3" onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: Math.max(0, quantity - 1) }))}>-</Button>
            {quantity}
            <Button className="!text-xl !text-[#F80032] max-[1050px]:!min-w-3" onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }))}>+</Button>
          </Box>
          <p className="text-[#666666] text-xs hover:cursor-pointer" onClick={() => dispatch(removeProduct(product.id))}>remover</p>
        </div>
        <div className="text-[#42464D] text-center my-auto font-bold text-base">
          {priceFormat(product.price * quantity)}
        </div>
      </Paper>
    </>
  )
}