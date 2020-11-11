import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: any;
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  displayProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get('api/products', httpOptions).pipe(map((res) => res));
  }

  displayProductsById(id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get('api/products/' + id, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  addProduct(product) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('api/products', product, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  delProduct(id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .delete('api/products/' + id, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  updateProduct(id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put('api/products/' + id, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('users/authenticate', user, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }
}
