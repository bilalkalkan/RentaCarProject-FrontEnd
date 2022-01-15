import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcarimageComponent } from './addcarimage.component';

describe('AddcarimageComponent', () => {
  let component: AddcarimageComponent;
  let fixture: ComponentFixture<AddcarimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcarimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcarimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
