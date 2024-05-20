import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import DevicesIcon from '@mui/icons-material/Devices';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';

import UserTieIcon from "../util/svg/UserTieIcon";
import DressIcon from "../util/svg/DressIcon";
import ResponsiveAppBar from "../components/Header";

import { getCategory } from "../services/api/apiCalls";
import { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

const departmentIcons = [
  { component: DiamondOutlinedIcon, key: 'jewelery', value: 'Joias', sx: { color: '#F80032', fontSize: '7ch' } },
  { component: DevicesIcon, key: 'electronics', value: 'Eletrônicos', sx: { color: '#F80032', fontSize: '7ch' } },
  { component: UserTieIcon, key: "men's clothing", value: 'Moda Masculina' },
  { component: DressIcon, key: "women's clothing", value: 'Moda Feminina' },
]


export default function DepartamentPage() {
  const { category } = useParams();

  const [products, setProduucts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = category ? await getCategory(category) : [];
        setProduucts(response)
      } catch (error) {
        console.error(error)
      }
    }

    getProducts()
  }, [category])
  
  const renderProducts = (products: Product[]) => {
    return products.map(p => <Box className="max-w-48" key={p.id}><ProductCard product={p} /></Box>)
  }

  const renderDepartament = () => {
    const { component: IconComponent, value } = departmentIcons.filter(d => d.key == category)[0]
    return (
      <>
        <IconComponent sx={{ color: '#F80032', fontSize: '28px' }} />
        <Typography sx={{ fontSize: '16px' }} className="!font-bold !text-2xl" >{value}</Typography>
      </>
    )
  }

  return (
    <Box>
      <ResponsiveAppBar />
      <Container className="flex flex-row max-w-screen-lg">
        <Box className="grow flex flex-col">
          <Box sx={{ columnGap: '10px' }} className="grow flex items-center mt-10" >
            {renderDepartament()}
          </Box>
          <Box className="flex flex-wrap gap-3 mt-9 w-full justify-center" sx={{ minWidth: '190px' }}>
            {products?.length > 0 && renderProducts(products)}
          </Box>
        </Box>

      </Container>
    </Box>
  )
}