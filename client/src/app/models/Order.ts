import { unstable_DataStrategyFunctionArgs } from "react-router-dom"

export interface Order {
    id: number
    buyerId: string
    shippingAddress: ShippingAddress
    orderDate: string
    orderItems: OrderItem[]
    subTotal: number
    deliveryFee: number
    orderStatus: number
    total: number
  }
  
  export interface ShippingAddress {
    fullName: string
    address1: string
    address2: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  
  export interface OrderItem {
    productId: number
    name: string
    pictureUrl: string
    price: number
    quantity: number
  }
//   export enum orderStatus
//   {
//     Pending,
//     PaymentRecieved,
//     PaymentFailed
//   }
  