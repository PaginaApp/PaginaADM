import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLivroComponent } from './delete-livro.component';

describe('DeleteLivroComponent', () => {
  let component: DeleteLivroComponent;
  let fixture: ComponentFixture<DeleteLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLivroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
