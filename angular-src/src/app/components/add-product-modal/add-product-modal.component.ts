import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
})
export class AddProductModalComponent implements OnInit {
  closeResult = '';
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
    private validateService: ValidateService
  ) {}

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {}

  onProductSubmit() {
    const product = {
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      category: this.category,
      image: this.image,
      description: this.description,
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
    this.productService.addProduct(product).subscribe((data: any) => {
      if (data) {
        this.flashMessage.show(`${product.name} has been added`, {
          cssClass: 'bg-success text-light',
          timeout: 3000,
        });
        this.dismissModal();
        this.router.navigate(['/dashbooard']);
      } else {
        this.flashMessage.show('Something went wrong', {
          cssClass: 'bg-danger text-light',
          timeout: 2000,
        });
        this.router.navigate(['/dashboard']);
      }
      this.ngOnInit();
    });
  }
  dismissModal() {
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 2000);
  }
}
