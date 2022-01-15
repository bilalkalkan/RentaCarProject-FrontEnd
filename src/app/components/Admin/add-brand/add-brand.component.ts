import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
brandAddForm:FormGroup
  constructor(private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
createBrandAddForm(){
  this.brandAddForm=this.formBuilder.group({
    brandName:['',Validators.required]
  })
}
add(){
  if (this.brandAddForm.valid) {
    let brandModel=Object.assign({},this.brandAddForm.value)
    this.brandService.addBrand(brandModel).subscribe((response)=>{
      this.toastrService.success(response.message,'Başarılı')
    },(responseError) => {
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(
            responseError.error.Errors[i].ErrorMessage,
            'Doğrulama hatası'
          );
        }
      }
    })
  } else {
    this.toastrService.error('Formunuz eksik','Dikkat');
  }
}

}
