import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carİmages } from 'src/app/models/carimage';
import { CarService } from 'src/app/services/car.service';
import { CarimagesService } from 'src/app/services/carimages.service';

@Component({
  selector: 'app-deltecarimage',
  templateUrl: './deltecarimage.component.html',
  styleUrls: ['./deltecarimage.component.css']
})
export class DeltecarimageComponent implements OnInit {
carImages:Carİmages[]=[]
  constructor(private carImagesService:CarimagesService,
     private toatsrServices:ToastrService,private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params['id']) {
        this.deleteCarImages(params['id']);
      }
    })
    this.getCarsImages()
  }
getCarsImages(){
  this.carImagesService.getCarImages().subscribe((response)=>{
    this.carImages=response.data;
  })
}

deleteCarImages(carImages:Carİmages){
  this.carImagesService.carImageDelete(carImages).subscribe((response)=>{
    this.toatsrServices.success(response.message)
  },(responseError)=>{
    this.toatsrServices.error(responseError.message)
  })

}

}
