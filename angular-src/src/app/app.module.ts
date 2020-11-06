import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';

import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ProductService } from './services/product.service';
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'product-description', component: ProductDescriptionComponent },
  {
    path: 'add-product-modal',
    component: AddProductModalComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    CartComponent,
    ProductListComponent,
    ProductDescriptionComponent,
    AddProductModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    CommonModule,
    NgbModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
  ],
  providers: [
    ValidateService,
    AuthGuard,
    ProductService,
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
