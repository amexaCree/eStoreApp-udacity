import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cartItem'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []
  totalCost: string = ''

  constructor(private cart: CartService,
    private router: Router) {
  }

  updateQty(qty: unknown, item: CartItem) {
    const quantity = parseInt(qty as string)
    this.cart.updateQty(item, quantity)
    this.updateCartInfo()
  }

  checkOut() {
    this.router.navigateByUrl('/check-out');
  }

  removeItem(item: CartItem) {
    this.cart.removeCartItem(item)
    this.updateCartInfo()
  }

  addQuantitybyOne(item: CartItem) {
    this.cart.addToCart(item.product, 1)
    this.updateCartInfo()
  }

  removeQuanitybyOne(item: CartItem) {
    this.cart.addToCart(item.product, -1)
    this.updateCartInfo()
  }

  updateCartInfo() {
    this.cartItems = this.cart.getCartItems()
    this.totalCost = this.cart.getTotalCost().toFixed(2)
  }

  ngOnInit(): void {
    this.updateCartInfo()
  }

}
