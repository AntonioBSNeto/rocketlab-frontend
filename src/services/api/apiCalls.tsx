import { Product } from "../../types/Product";
import API from "./api";

const getBestSoldProducts = (): Promise<Product[]> => 
  API.get('', {
    params: { limit: 5 }
  }).then(response => response.data);


  const getAllProducts = (): Promise<Product[]> => 
  API.get('').then(response => response.data);

const getProduct = (productId: string): Promise<Product> =>
  API.get(`/${productId}`).then(response => response.data)

const getCategory = (category: string): Promise<Product[]> =>
  API.get(`/category/${category}`).then(response => response.data)

export {
  getBestSoldProducts,
  getProduct,
  getCategory,
  getAllProducts
};

