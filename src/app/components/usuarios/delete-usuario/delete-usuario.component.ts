import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../_services/user/user.service';
import { ErrorDTO } from '../../../dto/ErrorDTO';
import { UserDTO } from '../../../dto/UserDTO';

@Component({
  selector: 'app-delete-usuario',
  standalone: true,
  imports: [],
  templateUrl: './delete-usuario.component.html',
  styleUrl: './delete-usuario.component.css',
})
export class DeleteUsuarioComponent {
  @Input() usuario: UserDTO | undefined;
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor(private userService: UserService) {
    console.log(this.usuario);
  }

  public error: string | undefined;

  public async deleteUser() {
    try {
      const response = await this.userService.deleteUser(this.usuario!.usu_Id);

      if (response instanceof ErrorDTO) {
        this.error = response.message;
      } else {
        window.alert('Usuário deletado com sucesso');
        this.close();
      }
    } catch (error: any) {
      this.error = error.mensagem.message;
    }
  }

  public close() {
    this.closeModalEvent.emit();
  }
}
