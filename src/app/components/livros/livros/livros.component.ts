import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LivroService } from '../../../_services/Livro/livro.service';
import { ErrorDTO } from '../../../dto/ErrorDTO';
import { IPaginatedResponse } from '../../../dto/IPaginatedResponse';
import { LivroDTO } from '../../../dto/LivroDTO';
import { HeaderComponent } from '../../header/header.component';
import { DeleteLivroComponent } from '../delete-livro/delete-livro.component';
import { EditLivroComponent } from '../edit-livro/edit-livro.component';
import { NewAutorComponent } from '../new-autor/new-autor.component';
import { NewEditoraComponent } from '../new-editora/new-editora.component';
import { NewLivroComponent } from '../new-livro/new-livro.component';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [
    HeaderComponent,
    NgFor,
    NgIf,
    NewEditoraComponent,
    NewAutorComponent,
    NewLivroComponent,
    EditLivroComponent,
    DeleteLivroComponent,
  ],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css',
})
export class LivrosComponent implements OnInit {
  constructor(private livroService: LivroService) {}

  public livros: IPaginatedResponse<LivroDTO> = {
    limit: 7,
    page: 1,
    total: 0,
    results: [],
  };

  public isEditoraModalOpen: boolean = false;
  public isAutorModalOpen: boolean = false;
  public isLivroModalOpen: boolean = false;
  public isLivroEditModalOpen: boolean = false;
  public isDeleteModalOpen: boolean = false;

  // livro selecionado para edição
  public selectedLivro: LivroDTO | undefined;

  public totalPages(): number {
    return Math.ceil(this.livros.total / this.livros.limit);
  }

  public nextPage(): void {
    if (this.livros.page < this.totalPages()) {
      this.livros.page++;
      this.updateList();
    }
  }

  public prevPage(): void {
    if (this.livros.page > 1) {
      this.livros.page--;
      this.updateList();
    }
  }

  public error: ErrorDTO | undefined;

  async ngOnInit(): Promise<void> {
    await this.updateList();
  }

  private async updateList(): Promise<void> {
    try {
      const data = await this.livroService.listarLivros(
        this.livros.page,
        this.livros.limit
      );

      if (data instanceof ErrorDTO) {
        this.error = data;
      } else {
        this.livros = data;
      }
    } catch (error) {
      this.error = new ErrorDTO('Erro ao listar livros', 500);
    }
  }

  public closeModals(): void {
    this.isEditoraModalOpen = false;
    this.isAutorModalOpen = false;
    this.isLivroModalOpen = false;
    this.isLivroEditModalOpen = false;
    this.isDeleteModalOpen = false;

    // atualiza a lista de livros
    this.updateList();
  }

  public openEditoraModal(): void {
    this.isEditoraModalOpen = true;
  }

  public openAutorModal(): void {
    this.isAutorModalOpen = true;
  }

  public openLivroModal(): void {
    this.isLivroModalOpen = true;
  }

  public openLivroEditModal(liv_Id: string): void {
    this.selectedLivro = this.livros.results.find(
      (livro) => livro.liv_Id === liv_Id
    );
    this.isLivroEditModalOpen = true;
  }

  public openDeleteModal(liv_Id: string): void {
    this.selectedLivro = this.livros.results.find(
      (livro) => livro.liv_Id === liv_Id
    );
    this.isDeleteModalOpen = true;
  }
}
