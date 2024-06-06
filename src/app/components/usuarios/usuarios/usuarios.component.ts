import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user/user.service';
import { ErrorDTO } from '../../../dto/ErrorDTO';
import { IPaginatedResponse } from '../../../dto/IPaginatedResponse';
import { UserDTO } from '../../../dto/UserDTO';
import { HeaderComponent } from '../../header/header.component';
import { DeleteUsuarioComponent } from '../delete-usuario/delete-usuario.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [HeaderComponent, NgFor, NgIf, DeleteUsuarioComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  constructor(private userService: UserService) {}

  public usuarios: IPaginatedResponse<UserDTO> = {
    page: 1,
    limit: 7,
    results: [],
    total: 0,
  };

  public error: string | undefined;

  //modal
  public isDeleteModalOpen: boolean = false;
  public selectedUsuario: UserDTO | undefined;

  async ngOnInit(): Promise<void> {
    await this.listUser();
  }

  private async listUser() {
    try {
      const response = await this.userService.listUsers({
        page: this.usuarios.page,
        limit: this.usuarios.limit,
      });

      if (response instanceof ErrorDTO) {
        this.error = response.message;
      } else {
        this.usuarios = response;
        console.log(this.usuarios.results);
      }
    } catch (e) {
      window.alert(e);
    }
  }

  // controle de paginação
  public totalPages(): number {
    return Math.ceil(this.usuarios.total / this.usuarios.limit);
  }

  public nextPage(): void {
    if (this.usuarios.page < this.totalPages()) {
      this.usuarios.page++;
      this.listUser();
    }
  }

  public prevPage(): void {
    if (this.usuarios.page > 1) {
      this.usuarios.page--;
      this.listUser();
    }
  }

  public openDeleteModal(usuario: UserDTO) {
    this.selectedUsuario = usuario;
    this.isDeleteModalOpen = true;
  }

  public closeModal() {
    this.isDeleteModalOpen = false;
    this.listUser();
  }
}
