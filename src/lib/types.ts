export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'cleanser' | 'serum' | 'moisturizer' | 'mask' | 'toner'
  image: string
  ingredients: string[]
  benefits: string[]
  usage: string
  inStock: boolean
  isNew?: boolean
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
}

export interface ShippingAddress {
  fullName: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  shippingAddress: ShippingAddress
  createdAt: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
}
