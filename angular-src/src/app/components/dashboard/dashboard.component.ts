import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pageTitle = 'Welcome to your dashboard';
  allProducts: any;
  constructor(
    private productService: ProductService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

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

  removeProduct(id) {
    this.productService.delProduct(id).subscribe(
      (product: any) => {
        console.log(this.allProducts);
        this.allProducts = this.allProducts.filter((item) => item.id !== id);
        this.allProducts = product.products;

        this.fetchData();
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
