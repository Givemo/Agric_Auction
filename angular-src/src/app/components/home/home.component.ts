import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[];
  constructor(
    private productService: ProductService,
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {}

  ngOnInit() {
    return this.http.get('https://fakestoreapi.com/products?limit=5').subscribe(
      (data: any) => {
        this.products = data;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
