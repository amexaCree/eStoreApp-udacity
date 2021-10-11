import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem'

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item: CartItem = new CartItem
  @Output() itemRemoval: EventEmitter<CartItem> = new EventEmitter
  @Output() itemQtyChange: EventEmitter<{item: CartItem, diff: number}> = new EventEmitter
  oldQty: number = 0

  constructor() { }

  removeItem() {
    this.itemRemoval.emit(this.item)
  }

  updateQty() {
    const diff = this.item.quantity - this.oldQty
    this.itemQtyChange.emit({item: this.item, diff: diff})
    this.oldQty = this.item.quantity
  }

  changeQty(diff: number) {
    console.log("qty change: diff:", diff, "item.quantity", this.item.quantity)
    this.itemQtyChange.emit({item: this.item, diff: diff})
    this.oldQty = this.item.quantity + diff
  }

  addQuantitybyOne() {
    const diff = 1
    this.changeQty(diff)
  }

  removeQuanitybyOne() {
    const diff = -1
    this.changeQty(diff)
  }

  ngOnInit(): void {
    this.oldQty = this.item.quantity
  }

}
