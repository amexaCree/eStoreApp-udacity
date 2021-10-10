import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product
  productId: number = 0
  quantity: number = 1
  qtyOptions: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  addedToCart: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cart: CartService
    ) { }

  updateQty(qty: unknown) {
    this.quantity = parseInt(qty as string)
  }

  addToCart() {
    this.cart.addToCart(this.product, this.quantity)
    this.addedToCart = true
    alert(`${this.quantity} ${this.product.name} item(s) has been added to your cart.`)
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
  }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.productId = Number(params.get('id'));
        return this.productService.getProducts();
      })
    ).subscribe(data => {
      this.product = data.find(p=> p.id === this.productId) as Product
      this.addedToCart = ( this.cart.getCartItems().find(i=> i.product.id === this.productId) !== undefined)
    });
  }

}
