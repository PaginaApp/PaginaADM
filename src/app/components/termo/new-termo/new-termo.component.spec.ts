import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTermoComponent } from './new-termo.component';

describe('NewTermoComponent', () => {
  let component: NewTermoComponent;
  let fixture: ComponentFixture<NewTermoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTermoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTermoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
