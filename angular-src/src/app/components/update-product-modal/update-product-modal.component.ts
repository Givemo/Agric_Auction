import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-update-product-modal',
  templateUrl: './update-product-modal.component.html',
  styleUrls: ['./update-product-modal.component.css'],
})
export class UpdateProductModalComponent implements OnInit {
  pageTitle = 'Update Product';
  closeResult = '';
  product: Product | undefined;
  allProducts: Product[] = [];
  name: String;
  price: Number;
  quantity: Number;
  category: String;
  image: String;
  description: String;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private validateService: ValidateService
  ) {}

  ngOnInit(): void {}

  onProductSubmit() {
    let id = this.route.snapshot.paramMap.get('id');
    let product = {
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      category: this.category,
      image: this.image,
      description: this.description,
      id: id,
    };
    //Required Fields
    if (!this.validateService.validateProduct(product)) {
      this.flashMessage.show('Please fill in all fields', {
        cssClass: 'bg-danger text-light',
        timeout: 3000,
      });
      return false;
    }
    // Add Product
    this.productService.updateProduct(id).subscribe((data: any) => {
      if (data) {
        data = {
          name: this.name,
          price: this.price,
          quantity: this.quantity,
          category: this.category,
          image: this.image,
          description: this.description,
          id: id,
        };
        this.flashMessage.show(`${product.name} has been Updated`, {
          cssClass: 'bg-success text-light',
          timeout: 3000,
        });
        this.router.navigate(['/dashboard']);
        this.dismissModal();
      } else {
        this.flashMessage.show('Something went wrong', {
          cssClass: 'bg-danger text-light',
          timeout: 2000,
        });
        this.router.navigate(['/dashboard']);
      }
    });
  }

  dismissModal() {
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 2000);
  }
}
