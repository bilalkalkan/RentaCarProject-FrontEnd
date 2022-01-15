import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brandlist',
  templateUrl: './brandlist.component.html',
  styleUrls: ['./brandlist.component.css']
})
export class BrandlistComponent implements OnInit {
brands:Brand[]=[]
  constructor(private brandService:BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrandList();
  }
getBrandList(){
  this.brandService.getAllBrands().subscribe((response)=>{
    this.brands=response.data;
  })
}
deleteBrand(brand:Brand){
  this.brandService.deleteBrand(brand).subscribe((response)=>{
this.toastrService.success(response.message);
  })
}

}
