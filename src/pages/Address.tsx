import { Box, Button, Container, Paper, TextField } from "@mui/material";
import PaymentHeader from "../components/PaymentHeader";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import priceFormat from "../util/priceFormat";
import { useSelector } from "react-redux";
import { selectCartTotal, selectCartTotalItems } from "../features/cartSlice";

import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ufValidator from "../util/ufValidator";
import { useCallback, useEffect } from "react";
import { cepSearch } from "../services/externalApi/cep";
import { normalizeCEP } from "../util/masks";
import { useNavigate } from "react-router-dom";


const validationSchema = object({
  CEP: string().required('CEP é um campo obrigatório'),
  city: string()
    .required('Cidade é um campo obrigatório')
    .trim(),
  uf: string()
    .required('Estado é um campo obrigatório')
    .matches(/^[A-z]+$/, 'Formato incorreto')
    .test('is-valid-uf', 'Estado não existente', value => ufValidator(value)),
  district: string()
    .required('Bairro é um campo obrigatório')
    .trim(),
  street: string()
    .required('Rua é um campo obrigatório')
    .trim(),
  streetNumber: string().required('Número é um campo obrigatório'),
  complement: string().trim()
})


export default function AddressPage() {
  const cartTotalProducts = useSelector(selectCartTotalItems);
  const cartTotal = useSelector(selectCartTotal);

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const cepValue = watch('CEP');
  const numberValue = watch('streetNumber');
  const ufValue = watch('uf');

  const loadCEPInfo = useCallback(() => {
    let cep = cepValue
    if (!cep) return

    cep = cep.replace(/[\D]/g, '')
    if (cep.length < 8) return

    cepSearch(cep)
      .then(data => {
        console.log(data)
        setValue('city', data.city)
        setValue('uf', data.state)
        setValue('district', data.neighborhood)
        setValue('street', data.street)
        clearErrors(['city', 'uf', 'district', 'street', 'CEP'])
      })
      .catch(err => {
        console.log('opa')
        setError('CEP', { type: 'custom', message: err.message })
      })
  }, [cepValue, clearErrors, setError, setValue])

  useEffect(() => {
    if (cepValue) setValue('CEP', normalizeCEP(cepValue))
    setValue('streetNumber', numberValue?.replace(/[\D]/g, ''))
    setValue('uf', ufValue?.replace(/[^A-z]/g, '')?.toUpperCase())
  }, [cepValue, numberValue, ufValue, setValue])

  useEffect(() => {
    loadCEPInfo()
  }, [loadCEPInfo])


  const renderInputs = () => (
    <>
      <TextField {...register('CEP')} label="CEP" defaultValue="" helperText={errors.CEP?.message} error={!!errors.CEP} sx={{ gridColumn: '1/2' }} />
      <TextField {...register('street')} label="endereço" defaultValue="" helperText={errors.street?.message} error={!!errors.street} className="col-span-full" />
      <TextField {...register('streetNumber')} label="número" helperText={errors.streetNumber?.message} error={!!errors.streetNumber} className="!rounded-lg" />
      <TextField {...register('complement')} label="complemento" helperText="" className="!rounded-lg" />
      <TextField {...register('district')} label="bairro" helperText={errors.district?.message} error={!!errors.district} className="!rounded-lg" />
      <TextField {...register('city')} label="cidade" helperText={errors.city?.message} error={!!errors.city} className="!rounded-lg" />
      <TextField {...register('uf')} label="estado" helperText={errors.uf?.message} error={!!errors.uf} sx={{ gridColumn: '1/2' }} className="!rounded-lg"
      />
    </>
  )

  const renderOrderDetails = () => (
    <Paper className="sm:min-w-80 grow py-5 px-6 flex flex-col max-h-80 !my-9 max-sm:!my-3">
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
      <Button type="submit" className="!bg-[#F80032] !text-white grow !text-base hover:!bg-[#F20544] hover:brightness-90 !mt-auto max-h-11 !lowercase !rounded-none">continuar para pagamento</Button>
    </Paper>
  )

  return (
    <>
      <PaymentHeader step="" />
      <Container className=" bg-[#FAFAFB] max-sm:mt-4 mt-12 !rounded-2xl gap-x-10  !p-0" sx={{ maxWidth: { lg: 'calc(min(1024px, 90%))', xs: 'calc(min(1024px, 85%))' } }}>
        <form onSubmit={handleSubmit(() => navigate('/pagamento'))}>
          <div className="!flex p-8 max-[1050px]:flex-col gap-4 justify-between">
            <div>
              <Box className="flex  text-xl font-bold items-center gap-x-3">
                <LocalShippingOutlinedIcon className="text-[#F80032] !text-4xl" />
                Entrega
              </Box>
              <Paper className="!rounded-[24px] !grid grid-cols-2 gap-x-9 gap-y-8 !p-8 mt-5">
                {renderInputs()}
              </Paper>
            </div>
            <div>
              <p className="font-bold text-xl">resumo do pedido</p>
              {renderOrderDetails()}
            </div>
          </div>
        </form>
      </Container>
    </>
  )
}