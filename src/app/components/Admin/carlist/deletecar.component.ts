import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-deletecar',
  templateUrl: './deletecar.component.html',
  styleUrls: ['./deletecar.component.css'],
})
export class DeletecarComponent implements OnInit {
  cars: Car[] = [];
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toatsrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.deleteCar(params['id']);
      }
    });
    this.getCars();
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  deleteCar(car: Car) {
    this.carService.delete(car).subscribe((Response) => {
      this.toatsrService.success(Response.message);
    });
  }
}
