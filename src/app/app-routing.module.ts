import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandImageComponent } from './components/Admin/brand-image/brand-image.component';
import { AddcarimageComponent } from './components/Admin/addcarimage/addcarimage.component';
import { CarComponent } from './components/car/car.component';
import { AddCarComponent } from './components/Admin/add-car/add-car.component';
import { DeletecarComponent } from './components/Admin/carlist/deletecar.component';
import { UpdatecarComponent } from './components/Admin/updatecar/updatecar.component';
import { CardetailComponent } from './components/car/cardeatils/cardetails/cardetail.component';
import { DeltecarimageComponent } from './components/Admin/deltecarimage/deltecarimage.component';
import { AddBrandComponent } from './components/Admin/add-brand/add-brand.component';
import { BrandlistComponent } from './components/Admin/brandlist/brandlist.component';
import { UpdateBrandComponent } from './components/Admin/update-brand/update-brand.component';
import { HomeComponent } from './components/home/home.component';
import { ColorlistComponent } from './components/Admin/colorlist/colorlist.component';
import { AddColorComponent } from './components/Admin/add-color/add-color.component';
import { UpdatecolorComponent } from './components/Admin/updatecolor/updatecolor.component';
import { CustomerComponent } from './components/Admin/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Home',component:HomeComponent},
  {path:'customerlist',component:CustomerComponent},
  {path:'updatecolor',component:UpdatecolorComponent},
  {path:'colorlist',component:ColorlistComponent},
  {path:'brandlist',component:BrandlistComponent},
  {path:'update-brand/:brandId',component:UpdateBrandComponent},
  {path:'cars',component:CarComponent},
  {path:'cars/brand/:brandId',component:CarComponent},
  {path:'cars/color/:colorId',component:CarComponent},
  {path:'addcar',component:AddCarComponent,canActivate:[LoginGuard]},
  {path:'brand-image',component:BrandImageComponent},
  {path:'deletecar',component:DeletecarComponent},
  {path:'updatecar',component:UpdatecarComponent},
  {path:'cars/addcarimage',component:AddcarimageComponent},
   {path:'cardetails/car/:id',component:CardetailComponent},
   {path:'deleteCarImages',component:DeltecarimageComponent},
   {path:'add-brand',component:AddBrandComponent},
   {path:'add-color',component:AddColorComponent},
   {path:'login',component:LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
