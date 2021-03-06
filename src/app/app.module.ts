import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxBootstrapIconsModule,allIcons  } from 'ngx-bootstrap-icons';
import { ToastrModule } from 'ngx-toastr';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { NaviComponent } from './components/navi/navi.component';
import { CustomerComponent } from './components/Admin/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandImageComponent } from './components/Admin/brand-image/brand-image.component';
import { DeletecarComponent } from './components/Admin/carlist/deletecar.component';
import { AddCarComponent } from './components/Admin/add-car/add-car.component';
import { UpdatecarComponent } from './components/Admin/updatecar/updatecar.component';
import { VataddedPipe } from './pipes/vatadded.pipe';
import { FiltercolorpipePipe } from './pipes/filtercolorpipe.pipe';
import { FilterbrandpipePipe } from './pipes/filterbrandpipe.pipe';
import { AddcarimageComponent } from './components/Admin/addcarimage/addcarimage.component';
import { CardetailComponent } from './components/car/cardeatils/cardetails/cardetail.component';
import { DeltecarimageComponent } from './components/Admin/deltecarimage/deltecarimage.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { AddBrandComponent } from './components/Admin/add-brand/add-brand.component';
import { BrandlistComponent } from './components/Admin/brandlist/brandlist.component';
import { UpdateBrandComponent } from './components/Admin/update-brand/update-brand.component';
import { HomeComponent } from './components/home/home.component';
import { ColorlistComponent } from './components/Admin/colorlist/colorlist.component';
import { AddColorComponent } from './components/Admin/add-color/add-color.component';
import { UpdatecolorComponent } from './components/Admin/updatecolor/updatecolor.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { AddrentalComponent } from './components/addrental/addrental.component';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    NaviComponent,
    CustomerComponent,
    RentalComponent,
    BrandImageComponent,
    AddCarComponent,
    DeletecarComponent,
    UpdatecarComponent,
    VataddedPipe,
    FiltercolorpipePipe,
    FilterbrandpipePipe,
    AddcarimageComponent,
    CardetailComponent,
    DeltecarimageComponent,
    FilterPipePipe,
    AddBrandComponent,
    BrandlistComponent,
    UpdateBrandComponent,
    HomeComponent,
    ColorlistComponent,
    AddColorComponent,
    UpdatecolorComponent,
    LoginComponent,
   
    CreditCardComponent,
    AddrentalComponent,
    RegisterComponent,
    UserComponent,
    UpdateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    BrowserAnimationsModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons)
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
