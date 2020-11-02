import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  allProducts: [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
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
