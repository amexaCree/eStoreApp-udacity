import { Product } from './product'

export class CartItem {
  product: Product;
  quantity: number;

  constructor() {
    this.product = new Product
    this.quantity = 1
  }
}
