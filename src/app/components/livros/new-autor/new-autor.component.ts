import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutorService } from '../../../_services/Autor/autor.service';
import { ErrorDTO } from '../../../dto/ErrorDTO';

@Component({
  selector: 'app-new-autor',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-autor.component.html',
  styleUrl: './new-autor.component.css',
})
export class NewAutorComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  public autorForm: FormGroup;
  public error: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private autorService: AutorService
  ) {
    this.autorForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
    });

    this.autorForm.valueChanges.subscribe(() => {
      this.error = undefined;
    });
  }

  public async saveAutor(): Promise<void> {
    if (!this.autorForm.valid) {
      this.error = 'Campos inválidos, verifique os dados e tente novamente.';
      return;
    }

    const nome = this.autorForm.get('nome')!.value;

    try {
      const resposta = await this.autorService.create(nome);

      if (resposta instanceof ErrorDTO) {
        this.error = resposta.message;
        return;
      } else {
        window.alert('Autor salvo com sucesso!');
        this.closeModal();
      }
    } catch (error) {
      this.error = 'Erro ao salvar autor, tente novamente.';
    }
  }

  public closeModal(): void {
    this.closeModalEvent.emit();
  }
}
