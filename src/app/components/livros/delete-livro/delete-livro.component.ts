import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LivroService } from '../../../_services/Livro/livro.service';
import { ErrorDTO } from '../../../dto/ErrorDTO';
import { LivroDTO } from '../../../dto/LivroDTO';

@Component({
  selector: 'app-delete-livro',
  standalone: true,
  imports: [],
  templateUrl: './delete-livro.component.html',
  styleUrl: './delete-livro.component.css',
})
export class DeleteLivroComponent {
  @Input() livro: LivroDTO | undefined;
  @Output() closeModalEvent = new EventEmitter<void>();

  public error: string | undefined;

  constructor(private livroService: LivroService) {}

  public async deleteLivro(): Promise<void> {
    if (this.livro) {
      const response = await this.livroService.deleteLivro(this.livro.liv_Id);

      if (response instanceof ErrorDTO) {
        this.error = response.message;
      } else {
        window.alert('Livro deletado com sucesso');
        this.closeModal();
      }
    } else {
      this.error = 'Erro ao deletar livro';
    }
  }

  public closeModal(): void {
    this.closeModalEvent.emit();
  }
}
