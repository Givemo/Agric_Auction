import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productsInCart: any;
  numberInCart: number = 0;

  constructor(
    private cartService: CartService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countCartItems();
    this.cartService.displayCartProducts().subscribe(
      (product: any) => {
        this.productsInCart = product.products;
        this.numberInCart = product.products.length;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  removeProduct(id) {
    this.cartService.delProduct(id).subscribe(
      (product: any) => {
        this.productsInCart = this.productsInCart.filter(
          (item) => item.id !== id
        );
        this.productsInCart = product.products;
        this.fetchData();
        this.ngOnInit();

        this.flashMessage.show('Product removed', {
          cssClass: 'bg-success text-light',
          timeout: 3000,
        });
      },
      (err) => {
        console.log(err);
        this.flashMessage.show('Something went wrong', {
          cssClass: 'bg-danger text-light',
          timeout: 2000,
        });
        return false;
      }
    );
  }

  fetchData() {
    this.cartService.displayCartProducts().subscribe(
      (product: any) => {
        this.productsInCart = product.products;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
  countCartItems() {
    this.cartService.displayCartProducts().subscribe(
      (product: any) => {
        this.productsInCart = product.products;
        return this.productsInCart.length;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
