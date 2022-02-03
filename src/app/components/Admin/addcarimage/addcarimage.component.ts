import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarimagesService } from 'src/app/services/carimages.service';

@Component({
  selector: 'app-addcarimage',
  templateUrl: './addcarimage.component.html',
  styleUrls: ['./addcarimage.component.css']
})
export class AddcarimageComponent implements OnInit {
  imageAddForm: FormGroup;
  cars: Car[] = [];
  selectedFile: File;
  constructor(private formBuilder: FormBuilder,
    private imageService: CarimagesService,
    private toastrService: ToastrService,
    private carService: CarService) { }

  ngOnInit(): void {
    this.getcarlist();
    this.createImageAddForm();
  }
  createImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      CarId: ['', Validators.required],
      file: [null],
    });
  }
  getcarlist() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  uploadFile(event: any) {
    const carImage = Object(event.target as HTMLInputElement).files[0];
    this.imageAddForm.patchValue({
      file: carImage,
    });
    this.imageAddForm.get('file')?.updateValueAndValidity();
  }
  add() {
    if (this.imageAddForm.valid) {
      var formData: any = new FormData();
      formData.append('file', this.imageAddForm.get('file')?.value);
      formData.append('CarId', this.imageAddForm.get('CarId')?.value);
      this.imageService.carImageAdd(formData).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Form bilgileriniz eksik');
    }
  }
}
