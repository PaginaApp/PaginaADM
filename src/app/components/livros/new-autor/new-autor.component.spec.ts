import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAutorComponent } from './new-autor.component';

describe('NewAutorComponent', () => {
  let component: NewAutorComponent;
  let fixture: ComponentFixture<NewAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
