import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { RootState } from '../store';
import { CartItem } from '../types/CartItem';

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<{ product: Product, quantity: number }>) => {
      const { product, quantity } = action.payload
      const existingItem = state.items.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ product, quantity })
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number, quantity: number }>) => {
      const { productId, quantity } = action.payload
      const existingItem = state.items.find(item => item.product.id === productId)
      if (existingItem) {
        existingItem.quantity = quantity
      }
    },
    clearCart: state => {
      state.items = []
    }
  }
})

export const { addProduct, removeProduct, updateQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer

// // Definir seletores
export const selectCartItems = (state: RootState): CartItem[] => state.reducer.cart.items
export const selectCartTotal = (state: RootState): number => state.reducer.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
export const selectCartTotalItems = (state: RootState): number => state.reducer.cart.items.reduce((total, item) => total + item.quantity, 0)
export const isProductInCartSelector = (state: RootState, productId: number): boolean => state.reducer.cart.items.some(item => item.product.id === productId)