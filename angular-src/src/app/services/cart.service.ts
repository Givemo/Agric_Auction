import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any;
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  displayCartProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .get('http://localhost:3000/api/cart', httpOptions)
      .pipe(map((res) => res));
  }

  addToCartProducts(product) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/api/cart', product, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  delProduct(id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .delete('http://localhost:3000/api/cart/' + id, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }
}
