import { Injectable } from '@angular/core';
import { Product } from '../models/product'
import { CartItem } from '../models/cartItem'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = []
  totalCost: number = 0

  orderPlaced: boolean = false
  orderUser: string = ''
  orderAddress: string = ''
  orderPymtMethod: string = ''
  orderItems: CartItem[] = []
  orderCost: number = 0

  constructor() {
  }

  checkOut(name: string, address: string, pymnt: string) {
    this.orderUser = name
    this.orderAddress = address
    this.orderPymtMethod = pymnt
    this.orderItems = this.cartItems
    this.orderCost = this.totalCost
    this.emptyCart()
    this.orderPlaced = true
  }

  emptyCart() {
    this.cartItems = []
    this.totalCost = 0
  }

  resetCart() {
    this.orderUser = ''
    this.orderAddress = ''
    this.orderPymtMethod = ''
    this.orderItems = []
    this.orderCost = 0
    this.orderPlaced = false
  }

  getTotalCost() {
    return this.totalCost
  }

  getCartItems() {
    return this.cartItems
  }

  calcTotalCost(itemPrice: number, quantity: number) {
    this.totalCost += itemPrice * quantity
  }

  addToCart(product: Product, quantity: number) {
    if (this.orderPlaced) {
      this.resetCart()
    }

    const cartItem = this.cartItems.find(i=> i.product.id == product.id)
    if (cartItem === undefined) {
      const item = new CartItem
      item.quantity = quantity
      item.product = product
      this.calcTotalCost(item.product.price, quantity)
      this.cartItems.unshift(item)
    } else {
      this.updateQty(cartItem, quantity)
    }
  }

  updateQty(cartItem: CartItem, quantity: number) {
    cartItem.quantity += quantity
    this.calcTotalCost(cartItem.product.price, quantity)
  }

  removeCartItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(c => c.product.id !== item.product.id)
    this.totalCost -= item.product.price * item.quantity
  }

}
