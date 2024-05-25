import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RelatorioService } from '../../../_services/Relatorio/relatorio.service';
import { ErrorDTO } from '../../../dto/ErrorDTO';
import { RelatorioCatMesDTO } from '../../../dto/RelatorioCatMesDTO';
import { RelatorioExemplarMesDTO } from '../../../dto/RelatorioExemplarMesDTO';
import { RelatorioIdadeDTO } from '../../../dto/RelatorioIdadeDTO';
import { RelatorioTransacaoMesDTO } from '../../../dto/RelatorioTransacaoMesDTO';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [HeaderComponent, NgIf, BaseChartDirective],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css',
})
export class RelatorioComponent implements OnInit {
  constructor(private relatorioService: RelatorioService) {
    Chart.register(...registerables);
  }

  // variáveis para armazenar os relatórios
  public relatorioIdade: RelatorioIdadeDTO | undefined;
  public relatorioExemplarMes: RelatorioExemplarMesDTO | undefined;
  public relatorioTransacoesMes: RelatorioTransacaoMesDTO | undefined;
  public relatorioCatMes: RelatorioCatMesDTO | undefined;

  // Variáveis para armazenar os dados dos gráficos
  public idadeChartData: ChartData<'bar'> | ChartData<'pie'> | undefined;
  public exemplarChartData: ChartData<'line'> | undefined;
  public transacoesChartData: ChartData<'bar'> | undefined;
  public catChartData: ChartData<'bar'> | undefined;

  // variável para armazenar ano
  public ano: number = new Date().getFullYear();

  // variável para armazenar erro
  public error: string | undefined;

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: `Dados do ano ${new Date().getFullYear()}`,
      },
    },
  };

  ngOnInit(): void {
    this.getData();
  }

  private async getData() {
    try {
      await Promise.all([
        this.getRelatorioIdade(),
        this.getRelatorioExemplarMes(),
        this.getRelatorioTransacoesMes(),
        this.getRelatorioCatMes(),
      ]);
    } catch (error: any) {
      this.error = error.message;
    }
  }

  private async getRelatorioIdade() {
    try {
      const response = await this.relatorioService.relatorioIdade();

      if (response instanceof ErrorDTO) {
        this.error = response.message;
      } else {
        this.relatorioIdade = response;
        this.idadeChartData = this.buildIdadeChartData(response);
      }
    } catch (error: any) {
      this.error = error.message;
    }
  }

  async getRelatorioExemplarMes() {
    try {
      const response = await this.relatorioService.relatorioExemplarMes(
        this.ano
      );

      if (response instanceof ErrorDTO) {
        this.error = response.message;
      } else {
        this.relatorioExemplarMes = response;
        this.exemplarChartData = this.buildExemplarChartData(response);
      }
    } catch (error: any) {
      this.error = error.message;
    }
  }

  async getRelatorioTransacoesMes() {
    try {
      const response = await this.relatorioService.relatorioTransacoesMes(
        this.ano
      );

      if (response instanceof ErrorDTO) {
        this.error = response.message;
      } else {
        this.relatorioTransacoesMes = response;
        this.transacoesChartData = this.buildTransacoesChartData(response);
      }
    } catch (error: any) {
      this.error = error.message;
    }
  }

  async getRelatorioCatMes() {
    try {
      const response = await this.relatorioService.relatorioCatMes(this.ano);

      if (response instanceof ErrorDTO) {
        this.error = response.message;
      } else {
        this.relatorioCatMes = response;
        this.catChartData = this.buildCatChartData(response);
      }
    } catch (error: any) {
      this.error = error.message;
    }
  }

  // funções para criar os gráficos
  private buildIdadeChartData(response: RelatorioIdadeDTO): ChartData<'pie'> {
    return {
      labels: ['Até 30', 'Entre 30 e 50', 'Mais de 50'],
      datasets: [
        {
          label: 'Número de Pessoas',
          data: [
            response.data.till_30,
            response.data.btwn_30_50,
            response.data.over_50,
          ],
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
        },
      ],
    };
  }

  private buildExemplarChartData(
    response: RelatorioExemplarMesDTO
  ): ChartData<'line'> {
    return {
      labels: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      datasets: [
        {
          label: 'Número de Exemplares',
          data: [
            response.data.Janeiro,
            response.data.Fevereiro,
            response.data.Marco,
            response.data.Abril,
            response.data.Maio,
            response.data.Junho,
            response.data.Julho,
            response.data.Agosto,
            response.data.Setembro,
            response.data.Outubro,
            response.data.Novembro,
            response.data.Dezembro,
          ],
          borderColor: '#3e95cd',
          fill: false,
        },
      ],
    };
  }

  private buildTransacoesChartData(
    response: RelatorioTransacaoMesDTO
  ): ChartData<'bar'> {
    return {
      labels: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      datasets: [
        {
          label: 'Doação',
          data: [
            response.data.Janeiro.doacao,
            response.data.Fevereiro.doacao,
            response.data.Marco.doacao,
            response.data.Abril.doacao,
            response.data.Maio.doacao,
            response.data.Junho.doacao,
            response.data.Julho.doacao,
            response.data.Agosto.doacao,
            response.data.Setembro.doacao,
            response.data.Outubro.doacao,
            response.data.Novembro.doacao,
            response.data.Dezembro.doacao,
          ],
          backgroundColor: '#3e95cd',
        },
        {
          label: 'Empréstimo',
          data: [
            response.data.Janeiro.emprestimo,
            response.data.Fevereiro.emprestimo,
            response.data.Marco.emprestimo,
            response.data.Abril.emprestimo,
            response.data.Maio.emprestimo,
            response.data.Junho.emprestimo,
            response.data.Julho.emprestimo,
            response.data.Agosto.emprestimo,
            response.data.Setembro.emprestimo,
            response.data.Outubro.emprestimo,
            response.data.Novembro.emprestimo,
            response.data.Dezembro.emprestimo,
          ],
          backgroundColor: '#8e5ea2',
        },
        {
          label: 'Troca',
          data: [
            response.data.Janeiro.troca,
            response.data.Fevereiro.troca,
            response.data.Marco.troca,
            response.data.Abril.troca,
            response.data.Maio.troca,
            response.data.Junho.troca,
            response.data.Julho.troca,
            response.data.Agosto.troca,
            response.data.Setembro.troca,
            response.data.Outubro.troca,
            response.data.Novembro.troca,
            response.data.Dezembro.troca,
          ],
          backgroundColor: '#3cba9f',
        },
        {
          label: 'Venda',
          data: [
            response.data.Janeiro.venda,
            response.data.Fevereiro.venda,
            response.data.Marco.venda,
            response.data.Abril.venda,
            response.data.Maio.venda,
            response.data.Junho.venda,
            response.data.Julho.venda,
            response.data.Agosto.venda,
            response.data.Setembro.venda,
            response.data.Outubro.venda,
            response.data.Novembro.venda,
            response.data.Dezembro.venda,
          ],
          backgroundColor: '#e8c3b9',
        },
      ],
    };
  }

  private buildCatChartData(response: RelatorioCatMesDTO): ChartData<'bar'> {
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    const categorias: { [key: string]: number[] } = {};

    Object.keys(response.data).forEach((mes) => {
      const data = response.data[mes as keyof typeof response.data];
      if (typeof data === 'object' && 'categorias' in data) {
        data.categorias.forEach((cat) => {
          if (!categorias[cat.name]) {
            categorias[cat.name] = [];
          }
          categorias[cat.name].push(cat.number);
        });
      }
    });

    return {
      labels: meses,
      datasets: Object.keys(categorias).map((catName) => ({
        label: catName,
        data: categorias[catName],
        backgroundColor:
          '#' + Math.floor(Math.random() * 16777215).toString(16),
      })),
    };
  }
}
