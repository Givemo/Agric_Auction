import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allProducts: [];
  name: String;
  price: Number;
  quantity: Number;
  productId: String;
  constructor(
    private productService: ProductService,
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.productService.displayProducts().subscribe(
      (product: any) => {
        this.allProducts = product.products;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  addToCart(product) {
    const newProduct = {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      productId: product._id,
    };
    // Add Product
    this.cartService.addToCartProducts(newProduct).subscribe((data: any) => {
      if (data) {
        this.flashMessage.show(`${product.name} added to Cart`, {
          cssClass: 'bg-success text-light',
          timeout: 3000,
        });
      } else {
        this.flashMessage.show('Something went wrong', {
          cssClass: 'bg-danger text-light',
          timeout: 2000,
        });
      }
    });
  }
  fetchData() {
    this.productService.displayProducts().subscribe(
      (product: any) => {
        this.allProducts = product.products;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
