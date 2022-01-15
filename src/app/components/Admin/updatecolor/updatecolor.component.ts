import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-updatecolor',
  templateUrl: './updatecolor.component.html',
  styleUrls: ['./updatecolor.component.css'],
})
export class UpdatecolorComponent implements OnInit {
  updateColorForm: FormGroup;
  colors: Color[];
  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.createUpdateColorForm();
  }
  getColors(){
    this.colorService.getColors().subscribe((resposnse)=>{
      this.colors=resposnse.data
    })
  }
  createUpdateColorForm() {
    this.updateColorForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      colorName: ['', Validators.required],
    });
  }
  updateColor() {
    if (this.updateColorForm.valid) {
      let colorModel = Object.assign({}, this.updateColorForm.value);
      this.colorService.updateColor(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
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
      this.toastrService.error('Formunuz eksik');
    }
  }
}
