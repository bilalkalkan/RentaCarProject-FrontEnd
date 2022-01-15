import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandImageService } from 'src/app/services/brand-image.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-image',
  templateUrl: './brand-image.component.html',
  styleUrls: ['./brand-image.component.css'],
})
export class BrandImageComponent implements OnInit {
  brandImageAddForm: FormGroup;
  selectedFile: File;
  brands: Brand[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private brandImageService: BrandImageService,
    private toastrService: ToastrService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.load();
  }
  load() {
    this.getBrandList();
    this.createImageAddForm();
  }

  createImageAddForm() {
    this.brandImageAddForm = this.formBuilder.group({
      BrandId: ['', Validators.required],
      file: [null],
    });
  }
  getBrandList() {
    this.brandService.getAllBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  uploadFile(event: any) {
    const brandImage = Object(event.target as HTMLInputElement).files[0];
    this.brandImageAddForm.patchValue({
      file: brandImage,
    });
    this.brandImageAddForm.get('file')?.updateValueAndValidity();
  }

  add() {
    if (this.brandImageAddForm.valid) {
      var formData: any = new FormData();
      formData.append('file', this.brandImageAddForm.get('file')?.value);
      formData.append('BrandId', this.brandImageAddForm.get('BrandId')?.value);
      this.brandImageService.imageAdd(formData).subscribe(
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
