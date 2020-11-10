import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Product } from '../../interfaces/product';

@Component({
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css'],
})
export class ProductDescriptionComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product | undefined;
  allProducts: Product[] = [];

  constructor(
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
}
