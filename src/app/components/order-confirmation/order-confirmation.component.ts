import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderUser: string = ''
  orderCost: number = 0

  constructor(private cart: CartService, private router: Router ) { }

  checkOrderPlaced() {
    if (!this.cart.orderPlaced) {
      this.router.navigateByUrl("/cart")
      return
    }
    this.getOrderDetails()
  }

  getOrderDetails() {
    this.orderUser = this.cart.orderUser
    this.orderCost = this.cart.orderCost
  }

  ngOnInit(): void {
    this.checkOrderPlaced()
  }

}
