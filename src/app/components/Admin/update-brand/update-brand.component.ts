import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css'],
})
export class UpdateBrandComponent implements OnInit {
  brandUpdateForm: FormGroup;
 
  brands: Brand[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
   
    
   
  ) {}

  ngOnInit(): void {
    this.getBrandList();
    this.createUpdateForm();
    
  }
  
  getBrandList() {
    this.brandService.getAllBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  createUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandId:['',Validators.required],
      brandName:['',Validators.required]
    })
  }
  update() {
    if (this.brandUpdateForm.valid) {
      let brandModel=Object.assign({},this.brandUpdateForm.value)
      this.brandService.updateBrand(brandModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        
        
      },(responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Doğrulama hatası'
            );
          }
        }
      }
    );
  } else {
    this.toastrService.error('Formunuz eksik', 'Dikkat');
  }
}

}