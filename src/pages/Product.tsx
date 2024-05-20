import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ResponsiveAppBar from "../components/Header";
import Stars from "../components/Stars";

import { getProduct } from "../services/api/apiCalls";
import { Product } from "../types/Product";
import categoryMap from "../util/categoryMap";
import priceFormat from "../util/priceFormat";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addProduct, isProductInCartSelector, removeProduct } from "../features/cartSlice";
import CheckedCartIcon from "../util/svg/CheckedCart";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const isInCart = useSelector((state: RootState) => productId ? isProductInCartSelector(state, parseInt(productId)) : false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [product, setProduct] = useState<Product>();
  

  useEffect(() => {
    async function getPrdct () {
      try {
        if (!productId) {
          throw new Error("Product ID is undefined");
        }
        const response = await getProduct(productId);
        setProduct(response)
      } catch (error) {
        console.error(error)
      }
    }

    getPrdct()
  }, [productId]);
  
  const toggleCartItem = () => {
    if (product) {
      if (isInCart) {
        dispatch(removeProduct(product?.id))
      } else {
        dispatch(addProduct({product, quantity: 1}))
      }
    }
  }

  const renderProduct = () => {
    if (!product) {
      return
    }
    return (
      <Container className="flex flex-row max-w-screen-lg">
        <Box>
          <p className="text-xs mt-4">
            <span className="hover:cursor-pointer" onClick={() => navigate('/')}>home</span> &gt; 
            <span className="hover:cursor-pointer" onClick={() => navigate(`/departamento/${product.category}`)}> {categoryMap[product?.category]}</span> &gt; 
            <span className="text-[#F80032] font-bold"> código: {product?.id}</span>
          </p>
        </Box>
        <Box className="max-md:mt-3 mt-12 flex gap-4 max-[700px]:flex-col max-[700px]:items-center px-5">
          <img src={product.image} alt="Product Image" className="w-[30%] rounded-2xl"/>
          <Box className="flex flex-col">
            <Typography className="!text-2xl max-[550px]:!text-lg !font-bold">{product?.title ? product.title : ''}</Typography>
            <Box sx={{ "& svg": { fontSize: { sm: '24px !important', xl: '12px !imortant'} }, "& p": { fontSize: { sm: '14px !important', xg: '10px !important' } } }}>
              <Stars amount={product.rating.count} rate={product.rating.rate} />
            </Box>
            <Box className="max-[700px]:max-w-full max-w-[400px] mt-2 flex flex-col">
              <p className="font-bold max-[550px]:text-sm">{product.description}</p>
              <Paper className="mt-3 flex flex-col py-4 px-6 rounded-2xl mb-5 max-[550px]:!mb-3">
                {/* simulando um preço maior */}
                <p className="line-through font-bold text-[#666666]">{priceFormat((product.price + 100))}</p>
                <p className="font-bold text-4xl text-[#42464D]">{priceFormat((product.price))}</p>
                <span className="leading-none text-lg text-[#42464D]">à vista</span>
              </Paper>
              <Button onClick={() => {
                dispatch(addProduct({product, quantity: 1}))
                navigate('/carrinho')
              }} className="!font-bold !text-[#FFFFFF] rounded !bg-[#F80032] grow !text-lg hover:!bg-[#F20544] hover:brightness-90 !capitalize !mt-2 !mb-5 max-[550px]:!mb-3">
                Comprar
                <ShoppingBasketIcon/>
              </Button>
              <Box className="flex gap-x-4 pb-3" >
                <Button variant="outlined" className="!rounded-2xl !border-[#F80032] h-12 w-12 !p-0  !min-w-12" sx={{ background: 'transparent'}}>
                  <FavoriteBorderOutlinedIcon className="!text-[#F80032]"/>
                </Button>
                <Button variant="outlined" className="!rounded-2xl !border-[#F80032] h-12 w-12 !p-0  !min-w-12" sx={{ background: 'transparent'}} onClick={toggleCartItem}>
                  { isInCart ?
                    <CheckedCartIcon /> :
                    <ShoppingCartOutlinedIcon className="!text-[#F80032]"/> 
                  }
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    )
  }

  return (
    <>
      <ResponsiveAppBar />
      {renderProduct()}
    </>
  )
}