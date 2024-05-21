import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditoraService } from '../../../_services/Editora/editora.service';
import { ErrorDTO } from '../../../dto/ErrorDTO';

@Component({
  selector: 'app-new-editora',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-editora.component.html',
  styleUrl: './new-editora.component.css',
})
export class NewEditoraComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  public editoraForm: FormGroup;
  public error: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private editoraService: EditoraService
  ) {
    this.editoraForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
    });

    this.editoraForm.valueChanges.subscribe(() => {
      this.error = undefined;
    });
  }

  public async saveEditora(): Promise<void> {
    if (!this.editoraForm.valid) {
      this.error = 'Campos inválidos, verifique os dados e tente novamente.';
      return;
    }

    const nome = this.editoraForm.get('nome')!.value;

    try {
      const resposta = await this.editoraService.create(nome);

      if (resposta instanceof ErrorDTO) {
        this.error = resposta.message;
        return;
      } else {
        window.alert('Editora salva com sucesso!');
        this.closeModal();
      }
    } catch (error) {
      this.error = 'Erro ao salvar editora, tente novamente.';
    }
  }

  public closeModal(): void {
    this.closeModalEvent.emit();
  }
}
