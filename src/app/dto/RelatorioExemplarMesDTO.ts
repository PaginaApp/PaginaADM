class RelatorioExemplarMesDTO {
  data: {
    Ano: number;
    Janeiro: number;
    Fevereiro: number;
    Marco: number;
    Abril: number;
    Maio: number;
    Junho: number;
    Julho: number;
    Agosto: number;
    Setembro: number;
    Outubro: number;
    Novembro: number;
    Dezembro: number;
  };
  generatedAt: string;

  constructor(data: any) {
    this.data = data;
    this.generatedAt = new Date().toISOString();
  }
}

export { RelatorioExemplarMesDTO };
