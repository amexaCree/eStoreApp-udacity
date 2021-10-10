import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component'
import { ProductDetailComponent } from './components/product-detail/product-detail.component'
import { CartComponent } from './components/cart/cart.component'
import { OrderCheckOutComponent } from './components/order-check-out/order-check-out.component'
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component'

const routes: Routes = [
  { path: "", component: ProductListComponent },
  { path: "products/:id", component: ProductDetailComponent },
  { path: "cart", component: CartComponent },
  { path: "check-out", component: OrderCheckOutComponent },
  { path: "order-success", component: OrderConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
