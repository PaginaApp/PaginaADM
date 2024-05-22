import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutorService } from '../../../_services/Autor/autor.service';
import { CategoriaService } from '../../../_services/Categoria/categoria.service';
import { EditoraService } from '../../../_services/Editora/editora.service';
import { LivroService } from '../../../_services/Livro/livro.service';
import { AutorDTO } from '../../../dto/AutorDTO';
import { CategoriaDTO } from '../../../dto/CategoriaDTO';
import { CreateLivroDTO } from '../../../dto/CreateLivroDTO';
import { EditoraDTO } from '../../../dto/EditoraDTO';
import { ErrorDTO } from '../../../dto/ErrorDTO';
@Component({
  selector: 'app-new-livro',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgSelectModule],
  templateUrl: './new-livro.component.html',
  styleUrl: './new-livro.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class NewLivroComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<void>();

  public livroForm: FormGroup;
  public error: string | undefined;

  // listas
  public autores: AutorDTO[] = [];
  public categorias: CategoriaDTO[] = [];
  public editoras: EditoraDTO[] = [];
  public selectedCategorias: CategoriaDTO[] = [];

  // filtros
  private page = 1;
  private limit = 100;

  constructor(
    private formBuilder: FormBuilder,
    private livroService: LivroService,
    private autorService: AutorService,
    private editoraService: EditoraService,
    private categoriaService: CategoriaService
  ) {
    this.livroForm = this.formBuilder.group({
      Titulo: ['', [Validators.required]],
      Ano: ['', [Validators.required]],
      Sinopse: ['', [Validators.required]],
      autor: [[], [Validators.required]],
      editora: [[], [Validators.required]],
      ISBN: ['', [Validators.required]],
      categoria: [[], [Validators.required]],
    });

    this.livroForm.valueChanges.subscribe(() => {
      this.error = undefined;
    });
  }

  public async ngOnInit(): Promise<void> {
    this.listAutores(null);
    this.listEditoras(null);
    this.createCategorias();
  }

  public async saveLivro(): Promise<void> {
    if (!this.livroForm.valid) {
      this.error = 'Campos inválidos, verifique os dados e tente novamente.';
      return;
    }

    try {
      const livro = this.buildlivro();

      console.log(livro);

      const resposta = await this.livroService.criarLivro(livro);

      if (resposta instanceof ErrorDTO) {
        this.error = resposta.message;
        return;
      } else {
        window.alert('Livro salvo com sucesso!');
        this.closeModal();
      }
    } catch (error) {
      this.error = 'Erro ao salvar livro, tente novamente.';
    }
  }

  public closeModal(): void {
    this.closeModalEvent.emit();
  }

  public submitForm(): void {
    this.saveLivro();
  }

  private buildlivro(): CreateLivroDTO {
    const Titulo = this.livroForm.get('Titulo')!.value;
    const autor: AutorDTO[] = this.livroForm.get('autor')!.value;
    const editora: EditoraDTO[] = this.livroForm.get('editora')!.value;
    const ISBN = this.livroForm.get('ISBN')!.value;
    const Ano = this.livroForm.get('Ano')!.value;
    const Sinopse = this.livroForm.get('Sinopse')!.value;
    const categoria: CategoriaDTO[] = this.livroForm.get('categoria')!.value;

    const categoriaIds: string[] = categoria.map((cat) => cat.cat_Id);
    if (autor.length === 0 || editora.length === 0) {
      this.error = 'Selecione um autor e uma editora para o livro.';
      return {} as CreateLivroDTO;
    }

    console.log('Autor:', this.livroForm.get('autor')?.value);
    console.log('Editora:', this.livroForm.get('editora')?.value);
    console.log('Categoria:', this.livroForm.get('categoria')?.value);
    console.log('Autor:', autor[0].aut_Id);
    console.log('Editora:', editora[0]);

    return {
      liv_Ano: Ano.toString(),
      liv_ISBN: ISBN,
      liv_Sinopse: Sinopse,
      liv_Titulo: Titulo,
      liv_aut_id: autor[0].aut_Id,
      liv_cat_id: categoriaIds,
      liv_edi_id: editora[0].edi_Id,
    };
  }

  // autores

  public async listAutores(term: string | null): Promise<void> {
    if (term === '' || term === null) {
      await this.listAllAutores();
    } else {
      await this.listAutoresByName(term);
    }
  }

  private async listAllAutores(): Promise<void> {
    try {
      const response = await this.autorService.list(this.page, this.limit);

      if (response instanceof ErrorDTO) {
        this.error = response.message;
        return;
      } else {
        this.autores = response.results;
      }
    } catch (error) {
      this.error = 'Erro ao listar autores';
    }
  }

  private async listAutoresByName(term: string): Promise<void> {
    const autor = term;
    try {
      const response = await this.autorService.listByName(
        autor,
        this.page,
        this.limit
      );

      if (response instanceof ErrorDTO) {
        this.error = response.message;
        return;
      } else {
        this.autores = response.results;
      }
    } catch (error) {
      this.error = 'Erro ao listar autores';
    }
  }

  // editoras
  public async listEditoras(term: string | null): Promise<void> {
    if (term === '' || term === null) {
      await this.listAllEditoras();
    } else {
      await this.listEditorasByName(term);
    }
  }

  private async listAllEditoras(): Promise<void> {
    try {
      const response = await this.editoraService.list(this.page, this.limit);

      if (response instanceof ErrorDTO) {
        this.error = response.message;
        return;
      } else {
        this.editoras = response.results;
      }
    } catch (error) {
      this.error = 'Erro ao listar editoras';
    }
  }

  private async listEditorasByName(term: string): Promise<void> {
    const editora = term;
    try {
      const response = await this.editoraService.listByName(
        editora,
        this.page,
        this.limit
      );

      if (response instanceof ErrorDTO) {
        this.error = response.message;
        return;
      } else {
        this.editoras = response.results;
      }
    } catch (error) {
      this.error = 'Erro ao listar editoras';
    }
  }

  // categorias
  private async createCategorias(): Promise<void> {
    try {
      const response = await this.categoriaService.list();

      if (response instanceof ErrorDTO) {
        this.error = response.message;
        return;
      } else {
        this.categorias = response;
      }
    } catch (error) {
      this.error = 'Erro ao listar categorias';
    }
  }
}
