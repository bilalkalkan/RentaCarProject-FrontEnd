import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
addCreditCardForm:FormGroup
rental:Rental
totalPrice: number;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }
createCreditCardAddForm(){
  this.addCreditCardForm=this.formBuilder.group({
    cardOwnerName:['',Validators.required],
    cardNumber:['',Validators.required],
    expirationDate:['',Validators.required],
    securityCode:['',Validators.required],
    
  })
}


checkBalancedAndFinish(){
  let creditCardModel=Object.assign({
    customerId:this.rental.customerId,
    cardLimit:1000,
  },
  this.addCreditCardForm.value);
  if (creditCardModel.cardLimit>this.totalPrice) {
    
  } else {
    
  }
}
}
