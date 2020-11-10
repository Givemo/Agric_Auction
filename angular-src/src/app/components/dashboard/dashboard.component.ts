import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pageTitle = 'Welcome to your dashboard';

  _listFilter = '';
  filteredProducts: Product[] = [];
  allProducts: Product[] = [];
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.allProducts;
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.allProducts.filter(
      (product: Product) =>
        product.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.productService.displayProducts().subscribe(
      (product: any) => {
        this.allProducts = product.products;
        this.filteredProducts = this.allProducts;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  /* this.productService.displayProducts().subscribe(
      (product: any) => {
        this.allProducts = product.products;
        this.filteredProducts = this.allProducts;
      },
      (err) => {
        console.log(err);
        return false;
      }
    ); */

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
