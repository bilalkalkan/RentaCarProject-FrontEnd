import { Component, OnInit } from '@angular/core';

import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  brands: Brand[] ;
  colors: Color[];;
  currentCar: Car;
  selectedCar: Car;
  filterText = '';
  brandId: number = 0;
  colorId: number = 0;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toatsrService: ToastrService,
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCarDetails();
      }
    });
    this.getCarDetails();
    this.getBrands();
    this.getColors();
    this.filter();
  }
  setCurrentCar(car: Car) {
    this.currentCar = car;
  }
  getCurrentCarClass(car: Car) {
    if (car == this.currentCar) return 'list-group-item active';
    else {
      return 'list-group-item';
    }
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe(
      (response) => {
        this.cars = response.data;
      },
      (responseError) => {
        console.log(responseError.error.error);
      }
    );
  }
  getCarDetailsById(id: number) {
    this.carService.getCarDetailById(id).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarByBrandId(brandId).subscribe(
      (response) => {
        this.cars = response.data;
      },
      (responseError) => {
        if (responseError.error.data == null) {
          console.log(responseError.error);
          this.toatsrService.error(responseError.error.message);
        }
      }
    );
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  filter() {
    this.getCarByBrandIdAndByColorId(this.brandId, this.colorId);
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  onSelectProduct(car: Car) {
    this.selectedCar = car;
  }

  getCarByBrandIdAndByColorId(brandId: number, colorId: number) {
    if (brandId == 0 && colorId == 0) {
      this.getCarDetails();
      return;
    }
    if (brandId == 0) {
      this.getCarsByColor(colorId);
      return;
    }
    if (colorId == 0) {
      this.getCarsByBrand(brandId);
      return;
    }

    this.carService.getCarByBrandAndByColor(brandId, colorId).subscribe(
      (response) => {
        this.cars = response.data;
        this.toatsrService.success(response.message);
      },
      (responseError) => {
        if (responseError.error.data == null) {
          console.log(responseError.error);
          this.toatsrService.error(responseError.error.message);
          this.getCarDetails();
        }
      }
    );
  }
}
