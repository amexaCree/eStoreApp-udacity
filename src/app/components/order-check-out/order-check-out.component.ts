import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-check-out',
  templateUrl: './order-check-out.component.html',
  styleUrls: ['./order-check-out.component.css']
})
export class OrderCheckOutComponent implements OnInit {
  name: string = ''
  address: string = ''
  cardNumber: string = ''

  constructor(private cart: CartService, private router: Router) { }

  placeOrder() {
    this.cart.checkOut(this.name, this.address, this.cardNumber)
    this.router.navigateByUrl("/order-success")
  }

  ngOnInit(): void {
  }

}
