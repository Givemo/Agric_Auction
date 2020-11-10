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
    let id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `${id}`;
    this.productService.displayProductsById(id).subscribe(
      (product: any) => {
        this.allProducts = product.products;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
    /*this.product = {
      name: 'Amazing Product',
      description: 'Fresh High Quality Crops',
      category: 'Crops',
      quantity: 50,
      image:
        'https://www.cookforyourlife.org/wp-content/uploads/2018/08/Fresh-Grape-Juice.jpg',
      price: 16.99,
      id: id,
    };*/
  }
  onClick(id) {
    id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `${id}`;
    this.productService.displayProductsById(id).subscribe(
      (product: any) => {
        this.allProducts = product.products;
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
