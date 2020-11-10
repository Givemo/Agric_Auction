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
    return this.http.get('api/cart', httpOptions).pipe(map((res) => res));
  }

  addToCartProducts(product) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('api/cart', product, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  delProduct(id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .delete('api/cart/' + id, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }
}
