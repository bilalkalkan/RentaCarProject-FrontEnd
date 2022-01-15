import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentCarForm: FormGroup;
  car: Car;
  customer: Customer;
  rentals: Rental[] = [];
  carId: number;
  customerId: number;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  createRentCar() {
    this.rentCarForm = this.formBuilder.group({
      rentaDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }
  rent() {
    if (this.rentCarForm.valid) {
      let rentModel = Object.assign(
        { carId: this.car.carId, customerId: this.customer.customerId },
        this.rentCarForm.value
      );
      this.rentalService.rentCar(rentModel).subscribe((response) => {
        this.toastrService.success(response.message,'Başarılı');
      });
    } else {
    }
  }
}
