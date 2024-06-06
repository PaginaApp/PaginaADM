import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditoraComponent } from './new-editora.component';

describe('NewEditoraComponent', () => {
  let component: NewEditoraComponent;
  let fixture: ComponentFixture<NewEditoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEditoraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEditoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
