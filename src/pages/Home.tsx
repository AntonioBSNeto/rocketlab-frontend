import { useEffect, useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import DevicesIcon from '@mui/icons-material/Devices';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import ListIcon from "../util/svg/ListIcon";
import UserTieIcon from "../util/svg/UserTieIcon";
import DressIcon from "../util/svg/DressIcon";
import ResponsiveAppBar from "../components/Header";

import { Icon } from '../types/IconInterface';

import { getBestSoldProducts } from "../services/api/apiCalls";
import { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const departmentIcons = [
  { component: DiamondOutlinedIcon, key: 'jewelery', value: 'Joias', sx: { color: '#F80032', fontSize: '7ch' } },
  { component: DevicesIcon, key: 'electronics', value: 'Eletrônicos', sx: { color: '#F80032', fontSize: '7ch' } },
  { component: UserTieIcon, key: "men's clothing", value: 'Moda Masculina' },
  { component: DressIcon, key: "women's clothing", value: 'Moda Feminina' },
]

export default function HomePage() {
  const navigate = useNavigate()

  const [bestSoldProducts, setBestSoldProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getBestSoldProd () {
      try {
        const response = await getBestSoldProducts();
        setBestSoldProducts(response)
      } catch (error) {
        console.error(error)
      }
    }

    getBestSoldProd()
  }, [])

  const renderDepartamentPapers = ({ component: IconComponent, key, value, sx }: Icon) => {
    return (
      <Paper key={key} sx={{ borderRadius: '50%' }} onClick={() => navigate(`/departamento/${key}`)} className="flex flex-col justify-center items-center hover:cursor-pointer hover:scale-110 max-sm:w-32 max-sm:h-32 w-40 h-40">
        <IconComponent sx={sx} />
        <Typography 
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '12px', sm: '14px', md: '16px' },
            textAlign: 'center',
            wordWrap: 'break-word', 
            '@media (max-width: 600px)': {
              maxWidth: '90px',
            },
          }}
        >
          {value}
        </Typography>
      </Paper>
    );
  };

  const renderProducts = (products: Product[]) => {
    return products.map(p => <div className="max-w-48" key={p.id}><ProductCard product={p} /></div>)
  }

  return (
    <Box>
      <ResponsiveAppBar />
      <Container  className="flex flex-row max-w-screen-lg">
        <Box className="flex flex-col mt-4 grow mx-6" >
          <Box sx={{ columnGap: '10px' }} className="grow flex items-center" >
            <ListIcon />
            <Typography sx={{ fontSize: '20px' }} className="font-bold" >Departamentos</Typography>
          </Box>
          <Box className="mt-5 flex justify-around flex-wrap gap-x-4 gap-y-8" >
            {departmentIcons.map(renderDepartamentPapers)}
          </Box>
        </Box>

        <Box className="grow flex flex-col">
          <Box sx={{ columnGap: '10px' }} className="grow flex items-center mt-10" >
            <ShoppingBagIcon sx={{ color: '#F80032' }} className="text-base" />
            <Typography sx={{ fontSize: '16px' }} className="font-bold" >Mais Vendidos</Typography>
          </Box>
          <Box className="flex flex-wrap gap-3 mt-9 w-full justify-center" sx={{ minWidth: '190px' }}>
            {bestSoldProducts?.length > 0 && renderProducts(bestSoldProducts)}
          </Box>
        </Box>

      </Container>
    </Box>
  )
}