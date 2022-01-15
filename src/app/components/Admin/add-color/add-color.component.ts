import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css'],
})
export class AddColorComponent implements OnInit {
  addColorForm: FormGroup;
  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createAddColorForm()
  }
  createAddColorForm() {
    this.addColorForm = this.formBuilder.group({
     
      colorName: ['', Validators.required],
    });
  }
  addColor(){
    if (this.addColorForm.valid) {
      let colorModel=Object.assign({},this.addColorForm.value)
      this.colorService.addColor(colorModel).subscribe((response)=>{
        this.toastrService.success(response.message)
      },(responseError)=>{
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
      this.toastrService.error('Dikkat formunuz eksik');
    }
  }
}
