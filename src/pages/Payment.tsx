import { Box, Button, Container, Paper } from "@mui/material";
import PaymentHeader from "../components/PaymentHeader";
import priceFormat from "../util/priceFormat";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCartTotal, selectCartTotalItems } from "../features/cartSlice";
import VerticalTabs from "../components/PaymentVerticalTab";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const cartTotalProducts = useSelector(selectCartTotalItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const renderOrderDetails = () => (
    <Paper className="sm:min-w-80 grow py-5 px-6 flex flex-col max-h-80 !mt-4 max-sm:!my-3">
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
      <Button className="!bg-[#F80032] !text-white grow !text-base hover:!bg-[#F20544] hover:brightness-90 !mt-auto max-h-11 !lowercase !rounded-none" 
        onClick={() => {
          dispatch(clearCart())
          window.alert('Compra realizada com sucesso!')
          navigate('')
         }}
       >
        finalizar compra
      </Button>
    </Paper>
  )

  return (
    <>
      <PaymentHeader step="payment" />
      <Container className=" bg-[#FAFAFB] max-sm:mt-4 mt-8 !rounded-2xl gap-x-10  !p-0" sx={{ maxWidth: { lg: 'calc(min(1024px, 90%))', xs: 'calc(min(1024px, 85%))' } }}>
        <div>
          <div className="!flex p-8 !pb-6 max-[1050px]:flex-col gap-4 justify-between">
            <div>
              <Box className="flex  text-xl font-bold items-center gap-x-3">
                formas de pagamento
              </Box>
              <Paper className="!rounded-[24px] !flex gap-x-9 gap-y-8 !p-8 mt-5 max-sm:!p-2">
                <VerticalTabs />
              </Paper>
            </div>
            <div>
              <p className="font-bold text-xl">resumo do pedido</p>
              {renderOrderDetails()}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}