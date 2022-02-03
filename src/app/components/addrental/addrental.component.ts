import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddForCreditCard } from 'src/app/models/addforcreditcard';
import { AddForRental } from 'src/app/models/addforrental';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CreditCard } from 'src/app/models/creditCard';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-addrental',
  templateUrl: './addrental.component.html',
  styleUrls: ['./addrental.component.css']
})
export class AddrentalComponent implements OnInit {
addForRental:AddForRental;
minStartDate: Date = new Date();
minEndDate: Date = new Date();
startDate: Date = new Date();
endDate: Date = new Date();
diff: number = 0;
carDetail:CarDetail
creditCard:CreditCard
addForCreditCard:AddForCreditCard
money: number = 0;
cardNumber: string;
paymentPage: boolean = false;
creditCardForm:FormGroup;
isCardExist:boolean = true;
checkBox:boolean=false;
creditCards:AddForCreditCard[];
  constructor( private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private modalService:NgbModal,

    private formBuilder:FormBuilder,
    private creditCardService:CreditCardService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (!params['carId']) {
        this.router.navigateByUrl('/carDetails');
        return;
      }
      this.checkIfCarExists(params['carId']);
    });
    this.createCreditCardForm();
  }
  getCards(){
    this.creditCardService.getCards().subscribe(response=>{
      this.creditCards = response.data;
      if (response.data.length == 0) {
        this.isCardExist=false
        console.log(this.isCardExist)
      }else{
        this.isCardExist=true
      }
    })
  }

  createCreditCardForm(){
    this.creditCardForm = this.formBuilder.group({
      nameOnTheCard:["",Validators.required],
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      cvv:["",Validators.required],
    })
  }

  checkBoxTicked(event:any){
    this.checkBox = event.target.checked;
    console.log(event)
  }

  checkIfCarExists(carId: number) {
    this.carService.getCarDetailById(carId).subscribe(
      (s) => {
        if (!s.success) this.router.navigateByUrl('');
        this.carDetail = s.data;
      },
      (e) => {
        this.router.navigateByUrl('');
        this.toastrService.error(e.message, 'HATA');
      }
    );
  }

  setMinEndDate() {
    this.minEndDate = this.startDate;
  }

  
  calculateDiff() {
    let startDate = new Date(this.startDate);
    let endDate = new Date(this.endDate);
    let diff = Math.abs(endDate.getTime() - startDate.getTime());
    this.diff = Math.ceil(diff / (1000 * 3600 * 24));
    this.money = this.diff * this.carDetail.dailyPrice;
  }

  rentCar() {
    let newRental: AddForRental = {
      carId: this.carDetail.carId,
      rentDays: this.diff,
      cardNumber: this.cardNumber,
      totalPrice: this.money,
    };
    this.rentalService.rentCar(newRental).subscribe(
      (s) => {
        this.toastrService.success(s.message, 'Başarılı');
        this.router.navigateByUrl('/cars/carDetail/' + this.carDetail.carId);
        this.payMessage();
      },
      (e) => {
        this.toastrService.error(e.error.message, 'HATA!');
      }
    );
    this.modalService.dismissAll();
  }

  saveCreditCard(){
    if (this.creditCardForm.valid) {
      let newModel = Object.assign({},this.creditCardForm.value);
      this.creditCardService.save(newModel).subscribe(response=>{
        console.log(response)
      })
    }
    this.rentCar();
  }

  goToPayment() {
    this.paymentPage = true;
    this.getCards();
    console.log(this.isCardExist)
  }

  goToBack() {
    this.paymentPage = false;
  }

  payMessage() {
    this.paymentService.pay(this.creditCardForm.value).subscribe((p) => {
      this.toastrService.success(p.message, 'Başarılı');
    });
  }
  saveModal(content:any) {
    this.modalService.open(content);

  }

  closeSaveModal(){
    this.modalService.dismissAll();
  }
 
}
