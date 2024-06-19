import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  async ngOnInit(): Promise<void> {
    const fulltermo = await this.termoService.getActualTermo();

    if (fulltermo instanceof ErrorDTO) {
      this.termo = fulltermo.message;
    } else {
      this.termo = fulltermo.tpr_Texto;
    }
  }
}
