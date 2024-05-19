import { Box, Button, Container, Paper, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import ResponsiveAppBar from "../components/Header";
import ProductCart from "../components/ProductCart";

import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal, selectCartTotalItems } from "../features/cartSlice";
import priceFormat from "../util/priceFormat";

export default function CartPage() {
  const productsInCart = useSelector(selectCartItems);

  const cartTotalProducts = useSelector(selectCartTotalItems);
  const cartTotal = useSelector(selectCartTotal);

  const renderProducts = () => {
    return productsInCart.map(({ product, quantity }) => <ProductCart key={product.id} product={product} quantity={quantity} />)
  }

  const renderCart = () => {
    return (
      <>
        <Box className="flex flex-col grow" >
          <Box className="flex items-center gap-x-3 !mt-9 max-sm:!mt-3" >
            <ShoppingCartIcon sx={{ color: '#F80032', fontSize: '40px' }} />
            <Typography className="!font-bold !text-xl !text-[#42464D]">Meu Carrinho</Typography>
          </Box>
          <Box className="mt-6 max-sm:mt-3 !mb-8">
            <Box className="grid !font-bold text-lg border-b border-[#CCCCCC] pb-4" sx={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
              <p>produto</p>
              <p className="text-center">qtd.</p>
              <p className="text-center">preço</p>
            </Box>
            <Box className="!mt-6 max-sm:!mt-3 flex flex-col gap-y-3" >
              {renderProducts()}
            </Box>
          </Box>
        </Box>
        <Paper className="min-w-80 grow py-5 px-6 flex flex-col max-h-80 !my-9 max-sm:!my-3 !mr-10 max-[1050px]:!mr-0 ">
          <p className="text-xl font-bold ">resumo pedido</p>
          <Box className="mt-7 flex flex-col gap-y-2">
            <Box className="flex justify-between text-[#666666] font-bold !text-sm">
              <span>{cartTotalProducts} produto(s)</span>
              <span>{priceFormat(cartTotal)}</span>
            </Box>
            <Box className="flex justify-between text-[#666666] font-bold !text-sm">
              <span>frete</span>
              <span>R$ 19,90</span>
            </Box>
          </Box>
          <Box className="border-y-2 mt-5 py-3 flex justify-between font-bold text-[#666666]">
            <span className="text-black text-lg">Total</span>
            <div className="flex flex-col items-end">
              <span className="text-sm">{priceFormat(cartTotal + 19.9)}</span>
              <span className="text-xs">em até 4x sem juros</span>
            </div>
          </Box>
          <Button className="!bg-[#F80032] !text-white grow !text-lg hover:!bg-[#F20544] hover:brightness-90 !capitalize !mt-auto max-h-11 !rounded-none">continuar</Button>
        </Paper>
      </>
    )
  }

  const renderEmptyCart = () => {
    return (
      <>
        <Box className="flex items-center gap-y-5 !mt-9 max-sm:!mt-3 justify-center grow flex-col mb-9">
          <ShoppingCartIcon sx={{ color: '#868686', fontSize: '80px' }} />
          <Typography className="!font-bold !text-xl !text-[#42464D]">Seu Carrinho está vazio</Typography>
          <Typography className="!font-bold !text-base !text-[#42464D]">Que tal navegar pelas milhares de ofertas e achar uma especial para você?</Typography>
        </Box>
      </>
    )
  }


  return (
    <>
      <ResponsiveAppBar />
      <Container className="!flex bg-[#FAFAFB] max-sm:mt-4 mt-12 !rounded-2xl gap-x-10 max-[1050px]:flex-col" sx={{ maxWidth: { lg: 'calc(min(1024px, 90%))', xs: 'calc(min(1024px, 85%))' } }}>
        {cartTotalProducts ? renderCart() : renderEmptyCart()}
      </Container>
    </>
  )
}