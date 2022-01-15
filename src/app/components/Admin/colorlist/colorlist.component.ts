import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-colorlist',
  templateUrl: './colorlist.component.html',
  styleUrls: ['./colorlist.component.css']
})
export class ColorlistComponent implements OnInit {
colors:Color[]=[]
  constructor(private colorService:ColorService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
  }
getColors(){
  this.colorService.getColors().subscribe((response)=>{
    this.colors=response.data;
  })
}

deleteColor(color:Color){
  this.colorService.deleteColor(color).subscribe((response)=>{
    this.toastrService.success(response.message);
  })
}
}
