import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TermoService } from '../../../_services/Termo/termo.service';
import { ErrorDTO } from '../../../dto/ErrorDTO';
import { HeaderComponent } from '../../header/header.component';
import { NewTermoComponent } from '../new-termo/new-termo.component';

@Component({
  selector: 'app-termo',
  standalone: true,
  imports: [HeaderComponent, FormsModule, NgIf, NewTermoComponent],
  templateUrl: './termo.component.html',
  styleUrl: './termo.component.css',
})
export class TermoComponent implements OnInit {
  constructor(public termoService: TermoService) {}

  public termo: string = '';

  async ngOnInit(): Promise<void> {
    const fulltermo = await this.termoService.getActualTermo();

    if (fulltermo instanceof ErrorDTO) {
      this.termo = fulltermo.message;
    } else {
      this.termo = fulltermo.tpr_Texto;
    }
  }

  public modal: boolean = false;

  public openModal(): void {
    this.modal = true;
  }

  public closeModal(): void {
    this.modal = false;
  }
}
