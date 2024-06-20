import { NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TermoService } from '../../../_services/Termo/termo.service';
import { ErrorDTO } from '../../../dto/ErrorDTO';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-termo',
  standalone: true,
  imports: [HeaderComponent, FormsModule, NgIf],
  templateUrl: './termo.component.html',
  styleUrl: './termo.component.css',
})
export class TermoComponent implements OnInit {
  constructor(public termoService: TermoService) {}

  public termo: string = '';
  public actualTermo: string = '';
  @ViewChild('textareaElement') textareaElement!: ElementRef;

  async ngOnInit(): Promise<void> {
    const fulltermo = await this.termoService.getActualTermo();

    if (fulltermo instanceof ErrorDTO) {
      this.termo = fulltermo.message;
    } else {
      this.termo = fulltermo.tpr_Texto;
    }
  }

  public showSaveButton: boolean = false;

  public OpenSaveButton(): void {
    setTimeout(() => this.textareaElement.nativeElement.focus(), 0);
    this.actualTermo = this.termo;
    this.showSaveButton = true;
  }

  public CloseSaveButton(): void {
    this.showSaveButton = false;
  }

  public async SaveTermo(): Promise<void> {
    const usu_Id = JSON.parse(sessionStorage.getItem('user')!).usu_Id;
    if (usu_Id == null) throw new Error('Usuário não logado');

    const result = await this.termoService.createTermo(this.termo, usu_Id);

    if (result instanceof ErrorDTO) {
      alert(result.message);
    } else {
      alert('Termo salvo com sucesso!');
    }

    this.CloseSaveButton();
  }

  public cancelSaveTermo(): void {
    this.termo = this.actualTermo;
    this.CloseSaveButton();
  }
}
