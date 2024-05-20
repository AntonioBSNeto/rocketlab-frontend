import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import ResponsiveAppBar from "../components/Header";


import { getAllProducts } from "../services/api/apiCalls";
import { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";


export default function SearchPage() {
  const { searchValue } = useParams();

  const [searchResult, setSearchResult] = useState<Product[]>([]);

  useEffect(() => {
    async function getAll () {
      try {
        const response = await getAllProducts();
        setSearchResult(response.filter(p => p.title.includes(`${searchValue}`)))
      } catch (error) {
        console.error(error)
      }
    }

    getAll()
  }, [searchValue])

  const renderProducts = (products: Product[]) => {
    return products.map(p => <Box className="max-w-48" key={p.id}><ProductCard product={p} /></Box>)
  }

  const renderBadSearch = () => {
    return (
      <p>
        Nenhum item encontrado correspondente a sua busca!
      </p>
    )
  }

  return (
    <Box>
      <ResponsiveAppBar />
      <Container  className="flex flex-row max-w-screen-lg">
        <Box className="grow flex flex-col">
          <Box sx={{ columnGap: '10px' }} className="grow flex items-center mt-10" >
            <Typography sx={{ fontSize: '16px' }} className="!font-bold !text-xl" >Resultado da busca:</Typography>
          </Box>
          <Box className="flex flex-wrap gap-3 mt-9 w-full justify-center" sx={{ minWidth: '190px' }}>
            {searchResult?.length > 0 ? renderProducts(searchResult) : renderBadSearch()}
          </Box>
        </Box>

      </Container>
    </Box>
  )
}