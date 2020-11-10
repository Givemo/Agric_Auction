import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';

@Component({
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css'],
})
export class ProductDescriptionComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product | undefined;
  allProducts: Product[] = [];
  name: String;
  price: Number;
  quantity: Number;
  productId: String;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.getProduct(id);
    }
  }
  getProduct(id): void {
    this.productService.displayProductsById(id).subscribe(
      (product: any) => {
        this.product = product.product;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  onBack(): void {
    this.router.navigate(['/home'], { fragment: 'products' });
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
}
