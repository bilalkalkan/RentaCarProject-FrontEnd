import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltecarimageComponent } from './deltecarimage.component';

describe('DeltecarimageComponent', () => {
  let component: DeltecarimageComponent;
  let fixture: ComponentFixture<DeltecarimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeltecarimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeltecarimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
